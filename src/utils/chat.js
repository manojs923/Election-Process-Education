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
  const voterType = userProfile?.voterType;

  if (voterType === 'experienced') {
    if (intent === 'changes' || /(change|changed|new|since last election|since last time)/.test(normalizedMessage)) {
      return getTranslation(language, 'replyChanges');
    }

    if (intent === 'evm' || /(evm|machine|button|rules)/.test(normalizedMessage)) {
      return getTranslation(language, 'replyEvmExperienced');
    }

    if (intent === 'vvpat' || /(vvpat|slip|verify)/.test(normalizedMessage)) {
      return getTranslation(language, 'replyVvpatExperienced');
    }
  }

  if (voterType === 'senior') {
    if (intent === 'seniorPriority' || /(priority|queue|wait)/.test(normalizedMessage)) {
      return getTranslation(language, 'replySeniorPriority');
    }

    if (intent === 'seniorHomeVoting' || /(home vote|vote from home|form 12d|12d)/.test(normalizedMessage)) {
      return getTranslation(language, 'replySeniorHomeVoting');
    }

    if (intent === 'seniorHelp' || /(help|assistance|wheelchair|seating|water|support)/.test(normalizedMessage)) {
      return getTranslation(language, 'replySeniorHelp');
    }
  }

  if (voterType === 'accessible') {
    if (intent === 'accessibleBooth' || /(wheelchair|accessible|ramp)/.test(normalizedMessage)) {
      return getTranslation(language, 'replyAccessibleBooth');
    }

    if (intent === 'accessibleCompanion' || /(someone help|companion|family member|assist me|help me vote)/.test(normalizedMessage)) {
      return getTranslation(language, 'replyAccessibleCompanion');
    }

    if (intent === 'accessibleBrailleEvm' || /(braille evm|braille|visually impaired)/.test(normalizedMessage)) {
      return getTranslation(language, 'replyAccessibleBrailleEvm');
    }
  }

  if (intent === 'voterId') {
    return getTranslation(language, 'replyVoterId');
  }

  if (intent === 'bring') {
    return getTranslation(language, 'replyBring');
  }

  if (intent) {
    const intentKey = intent.charAt(0).toUpperCase() + intent.slice(1);
    return getTranslation(language, `reply${intentKey}`);
  }

  if (/(what is a voter id|what's a voter id|voter id card|epic card|epic)/.test(normalizedMessage)) {
    return getTranslation(language, 'replyVoterId');
  }

  if (/(what do i bring|what should i bring|documents|document|carry|bring to vote|photo id|proof)/.test(normalizedMessage)) {
    return getTranslation(language, 'replyBring');
  }

  if (/(id|document|documents|aadhaar|voter id|proof|bring|carry)/.test(normalizedMessage)) {
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
  const language = userProfile?.language || 'English';
  const fallbackReply = buildLocalReply(safeMessage, userProfile, intent);
  const defaultReply = getTranslation(language, 'replyDefault');

  // Quick prompt buttons carry an explicit intent, so keep those replies stable
  // instead of letting the model reinterpret a known canned question.
  if (intent) {
    return fallbackReply;
  }

  // If we already matched a known election-help pattern locally, prefer that
  // deterministic answer and reserve Gemini for broader freeform questions.
  if (fallbackReply !== defaultReply) {
    return fallbackReply;
  }

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
      model: 'gemini-2.5-flash',
      contents: [{ 
        role: 'user', 
        parts: [{ text: safeMessage }] 
      }],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2,
      }
    });

    // Handle different Gemini response formats
    let replyText = '';
    
    if (response?.text) {
      replyText = response.text.trim();
    } else if (response?.candidates?.[0]?.content?.parts?.[0]?.text) {
      replyText = response.candidates[0].content.parts[0].text.trim();
    } else if (typeof response === 'string') {
      replyText = response.trim();
    }
    
    return replyText || fallbackReply;

  } catch (err) {
    console.error("Gemini Error:", err);
    return fallbackReply;
  }
}

export { buildWelcomeMessage };
