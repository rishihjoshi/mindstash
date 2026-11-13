# MindStash

A personal, offline-first microlearning PWA — a stripped-down, AI-powered take on [deepstash.com](https://deepstash.com) for your own use.

Paste an article, your notes, or just a topic → Claude distills it into bite-sized **ideas** → stash them, filter by **topic**, flip cards for detail, and get a **daily review**. No accounts, no backend, no social feed. Your ideas live in your browser's localStorage; your API key never leaves the device.

## Run it

```bash
npx serve mindstash/docs -l 3000
```

Open http://localhost:3000, go to **Settings**, paste an [Anthropic API key](https://console.anthropic.com), and start stashing. "Add to Home Screen" to install as an app (iOS/Android/desktop).

## Host it (optional, free)

Push to GitHub → Settings → Pages → Source: `main` branch, `/docs` folder.

## Test

```bash
node test/extract.test.mjs
```

## What it borrows from deepstash (reverse-engineered)

Ideas/"stashes" · topics · collections-as-filters · flip cards · daily microlearning review. Dropped (don't need for personal use): the curated 200k-idea catalog, accounts, social/following, subscriptions.

Default model: Haiku 4.5 (cheap/fast). Switch to Sonnet 5.5 in Settings for sharper distillation.
