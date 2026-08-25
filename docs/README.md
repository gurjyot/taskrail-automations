# TaskRail Automations Documentation

## Read first

- `../README.md` — library purpose, catalog, setup method, and TaskRail compatibility.
- `../AGENTS.md` — mandatory contributor/agent rules.
- `ARCHITECTURE.md` — repository boundaries and workflow ownership.
- `DOCUMENTATION_POLICY.md` — documentation maintenance requirements.

Each automation also has its own local README and manifests. Those local documents are authoritative for that automation's purpose, configuration, capability requirements, tests, health behavior, and safe usage.

## Working model

This repository is a generic workflow library. It should remain reusable and free of client-specific secrets, IDs, thresholds, and production policy. Production adaptation belongs in the target private environment/repository.

When behavior changes, update both the relevant local automation documentation and any root-level inventory/catalog statements affected by the change.
