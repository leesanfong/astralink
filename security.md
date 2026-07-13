# Security

Security defaults:

- Electron renderer uses `contextIsolation: true`.
- Renderer has `nodeIntegration: false`.
- Renderer uses a sandbox.
- IPC channels are allowlisted in preload.
- Audit logs and app logs are separate.
- Secrets must be redacted before logs or MCP responses.
- The desktop control bridge binds to `127.0.0.1` only.
- The desktop control bridge requires a per-machine token.
- The generated `agent-connection.json` points to the token path but does not include the token value.
- Do not commit or share `.runtime`, `control-token.txt`, installed app profile data, cookies, session data, screenshots containing secrets, or real connection profiles from a user's machine.
- Humans enter passwords, OTPs, CAPTCHA, and recovery codes directly in the browser. Agents must not request or store those values.
- Risky clicks are routed to the approval queue before execution.
- Coordinate clicks on submit-like or risky targets are routed to the approval queue before execution.
- Pressing `Enter` on submit-like or risky focused controls is routed to the approval queue before execution.
- Agent typing and fill commands are blocked for fields that look like passwords, OTPs, tokens, recovery codes, or payment/card fields.
- Agents should identify themselves with `x-astralink-agent` so the UI can show which agent is currently controlling the browser.
- Agents should choose a permission profile with `x-astralink-profile` or by acquiring the write lock with a profile.
- Browser-changing actions require the AstraLink write lock. Read tools remain available without a lock.
- The default agent path is DOM/snapshot-first for speed and token efficiency; coordinate input is a fallback.
- Agent behavior is documented in `ASTRALINK_AGENT_SKILL.md`.
