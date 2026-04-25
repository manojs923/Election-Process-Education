import * as dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const apiKey = process.env.VITE_GEMINI_API_KEY;
console.log('API Key:', apiKey ? 'exists' : 'missing');

const ai = new GoogleGenAI({ apiKey });

async function test() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: 'Hello' }] }],
      config: {
        systemInstruction: "You are a helpful assistant.",
        temperature: 0.2,
      }
    });
    console.log(response.text);
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
