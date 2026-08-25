# TaskRail Automations — Agent Instructions

Applies to ChatGPT, Codex, Hermes, Claude, Copilot, other agents, and humans.

## Before changing an automation

1. Read `README.md`.
2. Read `docs/README.md`, `docs/ARCHITECTURE.md`, and `docs/DOCUMENTATION_POLICY.md`.
3. Read the target automation's local `README.md`, `automation.json`, `catalog.json`, tests, and health contract.
4. Run TaskRail discovery before implementation: `taskrail doctor`, `taskrail components`, and `taskrail capability-find "<needed behavior>"`.
5. Reuse canonical capabilities instead of embedding duplicate integration clients.

## Documentation is mandatory

A change is not complete until documentation is updated in the same iteration. Update the root catalog/README when repository inventory changes and update the automation-local README whenever inputs, outputs, configuration, capability requirements, mutation behavior, health, tests, or operational assumptions change.

Never claim a TaskRail gate, deployment, or integration test passed unless it actually ran.

## Architecture rules

- This repository contains generic reusable workflows, not SMG/client-specific production configuration.
- Automations own workflow/business decisions.
- Reusable service/domain integration belongs in `taskrail-capabilities`.
- Automations must remain isolated from sibling automations.
- Secrets, account mappings, production thresholds, and private IDs do not belong in this public repository.
- Mutation remains deny-by-default unless explicitly declared and authorized.
- Do not invent credentials, account IDs, schedules, thresholds, or mutation approval.

## Definition of done

Source + tests + TaskRail validation + accurate documentation. If the automation is only source-reviewed and not runtime-deployed, say so explicitly.
