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
- **Backend/Storage**: Firebase (Auth, Firestore, Storage)
- **Deployment**: Google Cloud Run & Cloud Build

## 🤖 AI Tool Usage Documentation (Submission Essentials)

### 1. Which tools were used & Why they were selected
- **Anti-Gravity (Agentic IDE)**: Used as the primary pair-programming agent to orchestrate complex architectural changes, write tests, and resolve tricky styling and accessibility bugs automatically.
- **Gemini (2.0 Flash)**: Integrated directly into the app for the core conversational AI logic, chosen for its fast inference and deep understanding of complex system instructions.
- **Firebase**: Selected for robust persistent user data, conversation history tracking, and asset storage (Firestore, Auth, Storage).
- **Cloud Run / Google Cloud**: Selected as the primary hosting and containerization platform to ensure a scalable and reliable production deployment.

### 2. How prompts evolved
Initially, prompts for the Gemini API integration were generic (e.g., "Answer voter questions"). However, this led to overly verbose or non-specific answers. The prompts evolved into a **Contextual AI Personalization** system. A dynamic global state (`ProfileContext`) was built to inject highly constrained `systemInstruction`s based on user demographics. Prompts were refined to include strict negative constraints (e.g., "Never skip any step", "Do NOT explain what EVM is from scratch") and mandatory inclusion facts (e.g., "ALWAYS say YES, all booths are mandated to have ramps") to guarantee deterministic, safe, and accurate responses.

### 3. What GenAI handled vs what humans designed
- **GenAI Handled**: 
  - Real-time generation of conversational, non-partisan responses to user queries via the Gemini API.
  - Rapid scaffolding of unit tests (Vitest, React Testing Library) to maximize test coverage.
  - Automated refinement of accessibility contrast ratios and semantic ARIA HTML attributes.
- **Humans Designed**:
  - The application architecture, responsive UI/UX design, and component hierarchy.
  - The rigid context framework, personas, and safety rules that securely guide the Gemini API.
  - The deep integration logic tying together React Contexts, Firebase persistent storage, and the Google Maps component.

---
*Developed for the Google Hackathon Challenge.*

## 🔗 Live Demo
[Add your Cloud Run URL here after deployment]

## 📦 Setup Instructions
1. Clone the repo
2. Run `npm install`
3. Add `.env` file with:
   ```env
   VITE_GEMINI_API_KEY=your_key
   VITE_GOOGLE_MAPS_KEY=your_key
   VITE_FIREBASE_API_KEY=your_key
   # Add other Firebase config keys as needed
   ```
4. Run `npm run dev`
5. Run `npm run test` for tests
