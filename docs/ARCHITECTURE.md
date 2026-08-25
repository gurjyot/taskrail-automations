# TaskRail Automations Architecture

## Purpose

`taskrail-automations` is a public library of thin, generic workflow templates built on TaskRail components and governed capabilities. It is not a production runtime, not an integration SDK, and not a client configuration store.

## Layering

```text
TaskRail core components
        ↓
TaskRail governed capabilities
        ↓
Generic automation workflow
        ↓
Environment-specific adaptation
        ↓
Private production repository/runtime
```

## Repository responsibilities

This repository owns:
- generic workflow decisions;
- automation manifests/catalog metadata;
- automation-local tests and health contracts;
- documentation describing required configuration and safe behavior;
- compatibility declarations against TaskRail/capabilities.

This repository does not own:
- reusable API/service clients that belong in `taskrail-capabilities`;
- organization-specific secrets or account mappings;
- production deployment state;
- client-specific thresholds, schedules, destinations, or mutation approvals;
- TaskRail core infrastructure.

## Automation contract

Every automation should remain understandable in isolation and include:
- `automation.json`;
- `catalog.json`;
- local README;
- tests;
- health contract;
- explicit capability/component requirements;
- TaskRail compatibility metadata.

Sibling automations must not be used as hidden libraries. If two workflows need the same reusable integration/technical behavior, evaluate promotion into a capability instead.

## Safe adaptation flow

```text
read local README + manifests
→ taskrail doctor/components/capability-find
→ resolve existing capabilities
→ collect real environment values externally
→ adapt business thresholds/config
→ keep mutation off unless authorized
→ run repository tests + TaskRail validation
→ deploy in target production repository
→ health/smoke verification
```

## Mutation boundary

Read-only behavior is the default. An automation that can cause external mutation must declare that requirement clearly and must not imply authorization merely because configuration exists. Callers/environments must explicitly authorize mutation according to the capability/TaskRail contract.

## Documentation invariant

The local automation README is part of the automation contract. If implementation changes but its configuration, outputs, failure behavior, health behavior, or capability expectations are not documented, the change is incomplete.
