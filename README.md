# Gunj AI

Gunj AI is now a personal AI workspace with the **Hub** dashboard at `apps/web`.

## Run the web app

```bash
pnpm install
cp .env.example .env.local
pnpm --filter @gunj-ai/web dev
```

Open http://localhost:3000.

Set `OPENAI_API_KEY` in `.env.local` for live AI responses. Without a key, the interface runs safely in demo mode. Never commit secrets.

The dashboard currently includes chat, English/Urdu response selection, browser voice input, local task management, quick notes, responsive navigation, and a graceful AI fallback. Integrations, authentication, persistent storage, and web search can be layered onto the existing service boundaries next.
