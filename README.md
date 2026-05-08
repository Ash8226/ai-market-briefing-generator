# AI Market Briefing Generator

A simple Next.js app that turns an asset, currency pair, sector, company, or market theme into a short plain-English briefing.

## Features

- Home page with a market-topic input, multi-select dropdown, and comma-separated manual entry
- AI-generated briefing with market summary, key drivers, risks, business impact, and action points
- Results page for each saved briefing
- Saved briefings archive
- Supabase persistence
- OpenAI-powered generation
- Tailwind CSS responsive UI
- Vercel-ready project structure

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase
- OpenAI API

## Environment Variables

Create a `.env.local` file from `.env.example`:

```bash
OPENAI_API_KEY=sk-your-openai-key
OPENAI_MODEL=gpt-4.1-mini

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

`SUPABASE_SERVICE_ROLE_KEY` must stay server-side only. Do not expose it with a `NEXT_PUBLIC_` prefix.

## Supabase Setup

1. Create a new Supabase project.
2. Open the SQL editor.
3. Run the SQL in `supabase/schema.sql`.
4. Copy your project URL into `SUPABASE_URL`.
5. Copy your service role key into `SUPABASE_SERVICE_ROLE_KEY`.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

## Deploy To Vercel

1. Push this project to GitHub.
2. Create a new Vercel project.
3. Add these environment variables in Vercel: `OPENAI_API_KEY`, `OPENAI_MODEL`, `SUPABASE_URL`, and `SUPABASE_SERVICE_ROLE_KEY`.
4. Deploy.

## Important Disclaimer

Briefings are generated for informational and planning support. They should not be treated as financial advice or a recommendation to buy, sell, or hold any asset.
