# Documentation Maintenance Policy

Documentation is a required part of every automation change.

## Definition of done

Any change affecting an automation's purpose, inputs, configuration, outputs, capability/component requirements, mutation behavior, health contract, tests, TaskRail compatibility, failure behavior, or operator expectations must update the automation-local README/manifests and any affected repository-level documentation in the same iteration.

## Repository-level updates

Update the root `README.md` when the catalog/inventory, setup flow, compatibility posture, or global rules change. Update `docs/README.md`, `docs/ARCHITECTURE.md`, or `AGENTS.md` when repository-wide conventions or boundaries change.

## Rules

- Do not document secrets or real production credentials/IDs.
- Distinguish prepared/template behavior from production-deployed behavior.
- Do not claim runtime verification that did not happen.
- Remove stale instructions when replacing contracts.
- A new automation is incomplete without local documentation, manifests, tests, and a health contract.
- Important design intent should live in repository docs, not only in chat/issue history.

Future repositories created for this ecosystem should start with `README.md`, `AGENTS.md`, `docs/README.md`, `docs/DOCUMENTATION_POLICY.md`, and appropriate architecture/development/operations documentation.
