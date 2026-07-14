# AstraLink

Agent-first desktop browser for Codex and AI automation.

## Phase 1 Commands

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm dev
pnpm dev:mcp
pnpm loop:engineering
pnpm --filter @fong-agent-browser/mcp-server smoke:local
pnpm package:windows
```

## Codex Command Name

Use the project name **AstraLink** when asking Codex to use the custom agent browser built in this repository.

## User And Agent Docs

- Agent quick start: [ASTRALINK_AGENT_START_HERE.md](ASTRALINK_AGENT_START_HERE.md)
- Full agent skill: [ASTRALINK_AGENT_SKILL.md](ASTRALINK_AGENT_SKILL.md)
- Thai user guide: [docs/user-guide-th.md](docs/user-guide-th.md)
- Thai agent connection guide: [docs/agent-connection-th.md](docs/agent-connection-th.md)
- Thai release guide: [docs/release-th.md](docs/release-th.md)
- Thai agent download guide: [docs/agent-skill-download-th.md](docs/agent-skill-download-th.md)
- Safe connection template: [docs/agent-connection.template.json](docs/agent-connection.template.json)

## Security Rule

AstraLink creates a local token on each machine when the app starts. Do not share `.runtime`, `control-token.txt`, or a real `agent-connection.json` from your machine. Share the installer and docs only.

## Public Agent Downloads

The website publishes safe files for other people and agents to download:

- `https://astralink-5oh.pages.dev/downloads/ASTRALINK_AGENT_START_HERE.md`
- `https://astralink-5oh.pages.dev/downloads/ASTRALINK_AGENT_SKILL.md`
- `https://astralink-5oh.pages.dev/downloads/agent-skill-download-th.md`
- `https://astralink-5oh.pages.dev/downloads/mcp-tools.md`
- `https://astralink-5oh.pages.dev/downloads/security.md`
