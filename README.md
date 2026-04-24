# Voter Education AI

## 📌 Project Overview
The **Voter Education AI** is a multilingual, interactive web application built for Indian citizens. It acts as an AI-powered guide that simplifies the electoral process, making it accessible to first-time voters, experienced voters, senior citizens, and those needing accessibility support.

### Chosen Vertical
**Voter Education / Civic Engagement** 
(Empowering citizens through accessible, non-partisan electoral information).

## 🚀 Approach & Logic
The core logic revolves around **Contextual AI Personalization**. Instead of a one-size-fits-all chatbot, the system utilizes a global `ProfileContext` to dynamically inject tailored system instructions into the Gemini 2.0 Flash API:
- **First-Time Voters**: Receives step-by-step, simple explanations from scratch.
- **Experienced Voters**: Skips basics, highlighting only recent changes (e.g., M3 EVMs, 7-second VVPAT).
- **Senior Citizens**: Automatically prioritizes Form 12D (home voting) and priority queue privileges.
- **Accessibility Needs**: Instantly highlights wheelchair ramps, Braille EVMs, and companion voting rules.

### Key Features
1. **AI Voter Expert (Gemini 2.0 Flash)**: A non-partisan chatbot that answers election queries in 6 regional languages.
2. **Interactive Election Timeline**: A dynamic timeline detailing phases from election announcement to result declaration.
3. **Polling Booth Locator**: Integrates with Google Maps to find nearby polling stations and estimate wait times.
4. **Multilingual Support**: Real-time language switching (Hindi, English, Tamil, Telugu, Bengali, Kannada) for inclusive access.

## 🛠️ How It Works
1. **Entry Screen**: The user selects their voter profile (First-time, Senior, etc.) and preferred language.
2. **Context Injection**: The application state maps this profile to a highly specific Gemini `systemInstruction`.
3. **Chat & Explore**: 
   - The user asks a question (e.g., "Can I vote from home?").
   - The prompt is sanitized and sent to the Gemini API, strictly bound by a non-partisan mandate.
   - The AI returns a localized, context-aware response based on the exact needs of the user.

## 🧠 Assumptions Made
- Users have access to a device with a modern web browser.
- The Gemini API key (`VITE_GEMINI_API_KEY`) and Google Maps API key (`VITE_GOOGLE_MAPS_KEY`) are provided in the `.env` file for API integration.
- The application assumes users want strictly non-partisan, official ECI (Election Commission of India) information, as the AI is explicitly instructed to refuse political opinions.

## 💻 Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS
- **AI Integration**: Google GenAI SDK (Gemini 2.0 Flash)
- **Maps**: Google Maps JS API

---
*Developed for the Google Hackathon Challenge.*
