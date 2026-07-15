# AstraLink Agent Skill

Use this skill whenever an agent controls AstraLink, the shared agent-first browser.

## Core Goal

AstraLink is optimized for fast, token-efficient browser work:

1. Read compact state first.
2. Prefer stable element ids over coordinates.
3. Use background input only after acquiring the write lock.
4. Keep secrets human-only.
5. Release the lock when done changing browser state.

## First Move

1. Call `browser.desktop_status`.
2. Call `browser.desktop_snapshot`.
3. If you need to change browser state, call `browser.desktop_acquire_agent_lock`.

Default lock request:

```json
{
  "profile": "operator",
  "ttlSeconds": 600
}
```

Use `research` for read/navigation planning, `assist` for normal click/fill work, `operator` for full guarded browser operation, and `secure` for sensitive read-only sessions.

## Tool Order

For page understanding:

1. `browser.desktop_snapshot`
2. `browser.desktop_get_visible_text` only when more text is needed
3. `browser.desktop_diagnostics` only when the page appears blank or broken

For actions:

1. `browser.desktop_acquire_agent_lock`
2. `browser.desktop_snapshot`
3. `browser.desktop_click` or `browser.desktop_fill` using element ids
4. `browser.desktop_coordinate_click` only as fallback
5. `browser.desktop_press_key` only when necessary
6. `browser.desktop_release_agent_lock`

## Safety Contract

Never ask the user to paste passwords, OTPs, recovery codes, API keys, private keys, card numbers, CVV/CVC, or PINs into chat.

If the snapshot marks an element as `human_only_secret`, stop and ask the human to type it directly in AstraLink.

If a tool returns `APPROVAL_REQUIRED`, stop and wait for the human to approve or reject in AstraLink.

If a tool returns `AGENT_LOCK_REQUIRED`, acquire the lock before retrying.

If a tool returns `AGENT_LOCK_HELD`, do not fight the other agent. Read-only tools are still allowed.

## Token Efficiency Rules

Use the `desktop_snapshot` element list instead of asking for full visible text whenever possible.

Do not quote full page text back to the user unless requested. Summarize what matters and keep element ids only while acting.

Refresh the snapshot after navigation, tab switches, modal changes, form submits, or any click that likely changes the DOM.

## Coordinates

Coordinates are fallback only. Before a coordinate click:

1. Read a fresh snapshot.
2. Prefer an element id.
3. Use coordinates only when the target is canvas-based, custom-rendered, or unreachable by DOM click.

## Login Flow

For login pages:

1. Fill public identifiers such as email only when the user explicitly allows it.
2. For passwords, OTPs, CAPTCHA, recovery codes, and payment secrets, ask the human to type directly in AstraLink.
3. If Google sign-in says AstraLink is not secure, do not bypass or spoof it. Ask the human to open the page in Chrome/Edge with AstraLink's external-browser button, finish login there, and then continue only after the human approves the next step.
4. After the human finishes, call `browser.desktop_snapshot` to continue.

## Blank Page Flow

If URL/title changes but the browser pane looks blank:

1. Call `browser.desktop_diagnostics`.
2. Try reload once if safe.
3. If still blank, tell the user it may be a site/WebView compatibility issue and suggest opening externally.

## Multi-Tab Flow

Use tabs to separate work areas:

1. `browser.desktop_list_tabs`
2. `browser.desktop_new_tab` for a new task
3. `browser.desktop_switch_tab` before acting
4. `browser.desktop_close_tab` for tabs the user no longer needs, only after confirmation for important sessions

## Done Criteria

Before finishing:

1. Release the agent lock if held.
2. Report what changed.
3. Mention any approval, human-secret, or site-compatibility blockers.
