# Smith Identity

- ID: smith-001
- Parent: smith-root
- Level: 1

## Task

Fix GitHub profile via Composio MCP tools.

## Protocol

1. Read task from ./inbox/task-smith-001.md
2. Use GITHUB_GET_THE_AUTHENTICATED_USER to fetch current profile
3. Update profile via COMPOSIO_REMOTE_WORKBENCH (PATCH /user)
4. Write result to ./outbox/result.md
