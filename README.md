# Splaash Rita — Retell Voice Agent React Demo

A React + Node demo for **Rita**, the AI voice receptionist for Splaash Art Studio. Parents can talk to Rita, ask about Saturday Zoom classes, pricing, registration, cancellation, visit Splaash.net, and leave lead details.

## Features

- Splaash landing page for Saturday-only kids art classes with a button that opens Splaash.net
- Rita voice assistant panel using Retell Web SDK
- Backend endpoint that creates a Retell web call without exposing your API key
- Parent registration/lead form saved locally for demo
- Admin dashboard showing inquiries, payment status, and follow-up notes
- Rita prompt included in `server/rita-agent-prompt.md`

## Setup

```bash
npm install
cp .env.example .env
```

Open `.env` and add:

```bash
RETELL_API_KEY=your_retell_api_key
RETELL_AGENT_ID=your_retell_voice_agent_id
```

Run locally:

```bash
npm run dev
```

Open:

```bash
http://localhost:5173
```

## Retell setup notes

1. Create a voice agent in Retell.
2. Paste the prompt from `server/rita-agent-prompt.md`.
3. Copy the agent ID into `.env` as `RETELL_AGENT_ID`.
4. Keep `RETELL_API_KEY` only in `.env`, never in React code.

## Demo flow

1. Parent clicks **Start Talking to Rita**.
2. Frontend asks backend `/api/retell/create-web-call` for an access token.
3. Backend calls Retell `createWebCall` using your server-side API key.
4. Frontend starts the web call with `RetellWebClient.startCall({ accessToken })`.

## Deploy

For demo deployment, use Render/Railway for the Express server and Netlify/Vercel for the React frontend. Set `VITE_API_BASE_URL` to your deployed server URL.
