# Voter Education AI

## Project Overview
Voter Education AI is a multilingual web application that helps Indian citizens understand the election process in a simple, non-partisan, and accessible way. It is designed for first-time voters, experienced voters, senior citizens, and voters who need accessibility support.

## Chosen Vertical
The chosen vertical for this project is **Civic Tech / Voter Education**, specifically focusing on providing an inclusive, multilingual, and personalized election guide for all demographics of citizens.

## Problem Statement Alignment
The project focuses on civic access and election literacy. It helps users:
- understand voter ID and document requirements
- learn booth procedures before election day
- review a clear election timeline
- find a nearby polling booth
- access guidance in multiple Indian languages
- receive tailored help based on their voter profile

## Key Features
1. AI voter assistant powered by Gemini for election-process Q&A
2. Profile-aware guidance for first-time, experienced, senior, and accessibility-focused voters
3. Real-time language switching across 6 languages
4. Interactive election timeline
5. Polling booth walkthrough and booth finder
6. Firebase-backed analytics, auth, and chat persistence support

## Google Services Used
- Gemini via the Google GenAI SDK
- Firebase Authentication
- Firebase Firestore
- Firebase Storage
- Firebase Analytics
- Google Cloud Run
- Google Cloud Build

## How It Works
1. The user selects a voter profile and preferred language.
2. The app loads a voter-specific guidance mode.
3. The assistant uses profile-aware instructions for safer, more relevant replies.
4. The UI and quick prompts adapt to the selected language.
5. Firebase can persist chat history and analytics when configured.

## Accessibility Notes
The app is built with:
- keyboard-focusable controls
- semantic form labels
- live regions for chat updates
- visible focus states
- profile-specific accessibility guidance for polling support

## Assumptions Made
1. **User Environment**: Users have basic internet connectivity. For offline edge cases, users can rely on previously cached fallback responses.
2. **Localization**: The chosen six languages (English, Hindi, Tamil, Telugu, Bengali, Kannada) cover a significant portion of the target demographic.
3. **Hardware Accessibility**: Screen readers and assistive technologies are properly supported by the operating system of the user.
4. **Google Services Integration**: The cloud environment (Cloud Run, Firebase) has sufficient quota and network access to connect with the Gemini AI model.

## Security Notes
- Secrets are expected through environment variables and should not be committed to source control.
- User prompts are sanitized before being sent to the AI layer.
- The assistant is explicitly instructed not to provide partisan political advice.

## Tech Stack
- Frontend: React, Vite, Tailwind CSS
- AI: Gemini 2.5 Flash
- Maps: Leaflet with OpenStreetMap tiles, plus Google Maps directions links
- Backend services: Firebase
- Deployment: Docker, Cloud Build, Cloud Run

## Live Links
- GitHub: https://github.com/manojs923/Election-Process-Education
- Cloud Run: https://election-process-education-342812532739.asia-south1.run.app

## Local Setup
1. Clone the repository.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Fill in the required Gemini, Firebase, and optional Maps values.
5. Run `npm run dev`.
6. Run `npm run test`.

## Deployment Notes
The included `cloudbuild.yaml` and `Dockerfile` support Cloud Run deployment. For production builds, provide these substitutions in Cloud Build:
- `_GEMINI_KEY`
- `_GOOGLE_MAPS_KEY`
- `_FIREBASE_API_KEY`
- `_FIREBASE_AUTH_DOMAIN`
- `_FIREBASE_PROJECT_ID`
- `_FIREBASE_STORAGE_BUCKET`
- `_FIREBASE_MESSAGING_SENDER_ID`
- `_FIREBASE_APP_ID`
- `_FIREBASE_MEASUREMENT_ID`
