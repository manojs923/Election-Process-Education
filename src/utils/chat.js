import { GoogleGenAI } from '@google/genai';
import { getTranslation } from './translations';
import { profileConfig } from '../contexts/ProfileContext';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export function sanitizeInput(input) {
  if (!input) return '';
  return input.replace(/[<>]/g, '');
}

const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
    })
  : null;

function buildWelcomeMessage(userProfile) {
  if (!userProfile) {
    return getTranslation('English', 'welcomeDefault');
  }

  const key = userProfile.voterType === 'first-time' ? 'welcomeFirstTime' : 'welcomeReturning';
  return getTranslation(userProfile.language, key);
}

function buildLocalReply(message, userProfile, intent) {
  const normalizedMessage = message.toLowerCase();
  const language = userProfile?.language || 'English';

  if (intent) {
    const intentKey = intent.charAt(0).toUpperCase() + intent.slice(1);
    return getTranslation(language, `reply${intentKey}`);
  }

  if (/(id|document|aadhaar|voter id|proof)/.test(normalizedMessage)) {
    return getTranslation(language, 'replyId');
  }

  if (/(evm|machine|vote|button)/.test(normalizedMessage)) {
    return getTranslation(language, 'replyEvm');
  }

  if (/(vvpat|slip|verify)/.test(normalizedMessage)) {
    return getTranslation(language, 'replyVvpat');
  }

  if (/(list|roll|check|name)/.test(normalizedMessage)) {
    return getTranslation(language, 'replyList');
  }

  if (/(step|booth|process|walk me)/.test(normalizedMessage)) {
    return getTranslation(language, 'replyBooth');
  }

  if (/(timeline|date|schedule)/.test(normalizedMessage)) {
    return getTranslation(language, 'replyTimeline');
  }

  if (/(party|candidate|who should i vote for|vote for)/.test(normalizedMessage)) {
    return getTranslation(language, 'replyPolitical');
  }

  return getTranslation(language, 'replyDefault');
}

export async function getAssistantReply(message, userProfile, intent) {
  const safeMessage = sanitizeInput(message);
  const isKeyValid = typeof apiKey === 'string' && apiKey.length > 10;
  const fallbackReply = buildLocalReply(safeMessage, userProfile, intent);

  try {
    const voterType = userProfile?.voterType || 'first-time';
    
    // USE profileConfig from ProfileContext - NOT hardcoded prompts
    const profileInstruction = profileConfig[voterType]?.geminiContext 
      || profileConfig['first-time'].geminiContext;

    const extraContext = userProfile ? `
User Profile:
- Voter Type: ${userProfile.voterType}
- Preferred Language: ${userProfile.language}
If the preferred language is not English, 
reply in ${userProfile.language}.` : '';

    const systemInstruction = `CRITICAL RULE: NEVER discuss 
political parties or candidates. If asked who to vote for, 
say you are non-partisan.

${profileInstruction}

${extraContext}`;

    if (!ai || !isKeyValid) {
      return fallbackReply;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: safeMessage,
      config: {
        systemInstruction: { parts: [{ text: systemInstruction }] },
        temperature: 0.2,
      }
    });

    return response.text?.trim() || fallbackReply;

  } catch (err) {
    console.error("Gemini Error:", err);
    return fallbackReply;
  }
}

export { buildWelcomeMessage };
