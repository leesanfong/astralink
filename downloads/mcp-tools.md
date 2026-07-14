# MCP Tools

Agent operators should read `ASTRALINK_AGENT_SKILL.md` first. It defines the fastest safe tool order for AstraLink.

## browser.status

Returns structured browser health state:

- running state
- active profile
- open page count
- database health
- application version

## Implemented MVP Tools

- `browser.start`
- `browser.stop`
- `browser.status`
- `browser.open`
- `browser.list_tabs`
- `browser.new_tab`
- `browser.switch_tab`
- `browser.get_visible_text`
- `browser.get_interactive_elements`
- `browser.click`
- `browser.fill`
- `browser.desktop_status`
- `browser.desktop_permission_profiles`
- `browser.desktop_agent_lock`
- `browser.desktop_acquire_agent_lock`
- `browser.desktop_release_agent_lock`
- `browser.desktop_open`
- `browser.desktop_get_visible_text`
- `browser.desktop_get_interactive_elements`
- `browser.desktop_list_tabs`
- `browser.desktop_new_tab`
- `browser.desktop_switch_tab`
- `browser.desktop_close_tab`
- `browser.desktop_click`
- `browser.desktop_fill`
- `browser.desktop_diagnostics`
- `browser.desktop_snapshot`
- `browser.desktop_coordinate_click`
- `browser.desktop_type_text`
- `browser.desktop_press_key`

Reading is DOM-first. `browser.get_interactive_elements` returns stable `elementId` values for the current page snapshot. If the page changes, call it again before using `browser.click` or `browser.fill`.

The desktop bridge tools read AstraLink's generated connection profile when available. Open AstraLink before starting an agent that needs to connect to the shared desktop browser.

Use `browser.desktop_diagnostics` when a site title or URL loads but the page looks blank. It returns safe render details such as `readyState`, text length, body HTML length, user agent, script count, and resource metadata without exposing cookies or tokens.

For token-efficient agent work, prefer `browser.desktop_snapshot` first. It returns a short page preview plus element roles and exact center points. Use DOM tools (`browser.desktop_click`, `browser.desktop_fill`) first; use coordinate and keyboard tools only when a site needs real input events.

## Agent Safety Contract

- Fast lane: read page text, read compact snapshots, navigate, switch tabs, and fill normal non-secret fields.
- Guarded lane: risky clicks, risky coordinate clicks, and `Enter` on submit-like controls pause in the approval queue.
- Human-only lane: password, OTP, recovery code, API token, private key, card, CVV/CVC, and PIN fields are blocked for agent typing/fill.
- Agents should send `x-astralink-agent` with a short stable name, for example `Codex MCP`, so AstraLink can show who is controlling the browser.
- Browser-changing actions require the AstraLink write lock. Read tools remain available without a lock.
- Prefer stable `elementId` actions over coordinates. Use coordinates only after reading a fresh snapshot and only when element actions cannot reach the target.
