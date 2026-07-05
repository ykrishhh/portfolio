# Smith Identity

- ID: smith-root
- Parent: none
- Level: 0

## Task

Fix and optimize GitHub and LinkedIn profiles via MCP tools. Two parallel subtasks:
1. GitHub profile: update bio, name, location, blog, twitter handle
2. LinkedIn profile: update headline, about section, profile info

## Protocol

- Read task from ./inbox/task-root.md
- Create two child agents (smith-001 for GitHub, smith-002 for LinkedIn)
- Wait for child results in children/*/outbox/result.md
- Aggregate results into ./outbox/result.md
- Copy final to .agent-smith/results/final.md
