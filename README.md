# Gunj AI

Gunj AI is a multi-agent personal AI and project assistant designed for both software work and daily personal productivity.

## Vision

Gunj AI helps you with:
- project planning and code understanding
- GitHub repository analysis
- issue triage and PR summaries
- task management and reminders
- notes, emails, calendar assistance
- voice and chat interaction
- secure approvals before destructive or high-risk actions

## Architecture

- Web app: Next.js + TypeScript + Tailwind CSS
- Mobile app: Expo + React Native
- API: FastAPI + Python
- AI orchestration: LangGraph-ready workflow structure
- Data: PostgreSQL + pgvector
- Background jobs: Redis + Celery/Temporal-compatible structure
- Infra: Docker + Docker Compose

## Folder structure

```text
.
├── apps/
│   ├── web/
│   └── mobile/
├── services/
│   ├── api/
│   ├── agent/
│   └── integrations/
├── packages/
│   └── shared/
├── docker-compose.yml
├── .env.example
├── .gitignore
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── README.md
```

## Quick start

### 1) Install dependencies

```bash
npm install -g pnpm
pnpm install
```

### 2) Start infrastructure

```bash
pnpm docker:up
```

### 3) Start all apps

```bash
pnpm dev
```

### 4) Run API separately

```bash
cd services/api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Default ports

- Web app: http://localhost:3000
- Mobile app: Expo dev client / simulator
- API: http://localhost:8000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

## Environment

Copy `.env.example` to a local `.env` file and fill in your secrets.

## Security

This starter includes a safe default model:
- approval required before destructive actions
- secrets stored in environment variables
- audit logs recommended for all sensitive actions
- sandboxed execution for code tasks

## Next milestones

- GitHub OAuth integration
- Issue/PR summaries
- semantic search over project files
- reminder and calendar agent
- email and notes assistant
- multi-agent orchestration
- mobile UX polish

## License

MIT
