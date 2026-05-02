import { useEffect, useRef, useState } from 'react';
import { buildWelcomeMessage, getAssistantReply } from '../utils/chat';
import { getChatHistory, saveChatHistory } from '../utils/firebase';
import { useLanguage } from '../contexts/LanguageContext';
import { useProfile, profileConfig } from '../contexts/ProfileContext';

export default function ChatAssistant({ isFullScreen = true }) {
  const { language, t } = useLanguage();
  const { voterProfile } = useProfile();
  const config = profileConfig[voterProfile?.voterType] || profileConfig['first-time'];
  
  const messageListRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const loadHistory = async () => {
      const history = await getChatHistory();
      if (history && history.length > 0 && history[0]?.language === language) {
        setMessages(history);
      } else {
        setMessages([
          {
            role: 'assistant',
            text: buildWelcomeMessage({ voterType: voterProfile?.voterType, language }),
            language,
          },
        ]);
      }
    };
    loadHistory();
  }, [voterProfile?.voterType, language]);

  useEffect(() => {
    const container = messageListRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [messages, isTyping]);

  const submitMessage = async (prompt) => {
    const value = prompt?.text ?? input;
    if (!value.trim() || isTyping) return;

    const newMessages = [...messages, { role: 'user', text: value, language }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);
    
    // Save partial state (user message only) to Firestore while loading
    saveChatHistory(newMessages);

    const reply = await getAssistantReply(value, { voterType: voterProfile?.voterType, language }, prompt?.intent);
    
    const finalMessages = [...newMessages, { role: 'assistant', text: reply, language }];
    setMessages(finalMessages);
    setIsTyping(false);
    
    // Save final state with reply to Firestore
    saveChatHistory(finalMessages);
  };

  return (
    <section
      className={`glass-card ${
        isFullScreen
          ? 'rounded-[2rem] border-navy/10 bg-white p-6 md:p-8 min-h-[75vh] flex flex-col shadow-xl'
          : 'rounded-[1.75rem] border-navy/10 bg-white p-5 shadow-sm'
      }`}
    >
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-navy/10 pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-saffron">
            {t('aiHeroCore')}
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold leading-none text-navy">
            {t('expertTitle')}
          </h2>
          <p className="mt-2 text-sm font-medium text-navy/60">
            {t('expertSubtitle')}
          </p>
        </div>
        <div className="rounded-full bg-indiaGreen/10 border border-indiaGreen/20 px-4 py-2 text-sm font-bold uppercase tracking-widest text-indiaGreen shadow-sm">
          Gemini 2.5 Flash
        </div>
      </div>

      <div className={`grid gap-6 flex-1 ${isFullScreen ? 'lg:grid-cols-[1fr_2fr]' : ''}`}>
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-navy/10 bg-offwhite p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-navy mb-4">{t('quickPrompts')}</p>
            <div className="flex flex-col gap-2">
              {config.quickPrompts.map((prompt) => {
                const promptText = prompt.text || prompt;
                const translatedText = t(promptText);
                const promptIntent = prompt.intent || null;
                return (
                <button
                  key={promptText}
                  type="button"
                  onClick={() => submitMessage({ intent: promptIntent, text: translatedText })}
                  className="rounded-xl border border-navy/10 bg-white px-4 py-3 text-left text-sm font-medium text-navy transition hover:-translate-y-0.5 hover:shadow-md hover:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron"
                >
                  {translatedText}
                </button>
                );
              })}
            </div>
          </div>
          <div className="mt-auto rounded-2xl border border-indiaGreen/20 bg-indiaGreen/5 p-5">
            <p className="text-[10px] font-bold uppercase text-indiaGreen tracking-widest">{t('personalizationActive')}</p>
            <p className="mt-2 text-sm leading-6 text-navy/80 font-medium">
              {voterProfile?.voterType
                ? t('replyingIn', { language, voterType: config.banner })
                : t('defaultConfiguration')}
            </p>
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border border-navy/10 bg-white overflow-hidden shadow-inner">
          <div
            ref={messageListRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
            aria-busy={isTyping}
            aria-label={t('messageHistory')}
            className={`flex flex-col gap-4 overflow-y-auto px-4 py-6 ${isFullScreen ? 'flex-1 max-h-[55vh]' : 'max-h-[21rem]'} bg-[#f8f9fc]`}
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[85%] rounded-[1.5rem] px-5 py-4 text-sm md:text-base leading-relaxed shadow-sm ${
                  message.role === 'assistant'
                    ? 'bg-white text-navy border border-navy/10 rounded-tl-sm'
                    : 'ml-auto bg-navy text-white rounded-tr-sm shadow-md'
                }`}
              >
                {message.text}
              </div>
            ))}
            {isTyping ? (
              <div
                role="status"
                aria-live="polite"
                className="max-w-[85%] rounded-[1.5rem] rounded-tl-sm bg-white border border-navy/10 px-5 py-4 text-sm text-navy/60 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{t('thinking')}</span>
                  <span className="thinking-dots">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-auto border-t border-navy/10 p-4 bg-white">
            <div className="flex gap-3">
              <label htmlFor="chat-question-input" className="sr-only">
                {t('questionInput')}
              </label>
              <input
                id="chat-question-input"
                aria-label={t('questionInput')}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    submitMessage();
                  }
                }}
                placeholder={t('askPlaceholder')}
                className="w-full rounded-xl border border-navy/20 bg-offwhite px-5 py-4 text-base font-medium text-navy outline-none transition placeholder:text-navy/40 focus:bg-white focus:border-saffron focus:shadow-md"
              />
              <button
                type="button"
                onClick={() => submitMessage()}
                className="rounded-xl bg-saffron px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:-translate-y-0.5 shadow-md focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2"
              >
                {t('send')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

