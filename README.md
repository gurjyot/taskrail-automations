# TaskRail Automations

Reference automation library for thin, isolated business workflows built from TaskRail components and governed capabilities.

## Rules

- An automation owns workflow decisions, not reusable integration infrastructure.
- Reusable logic belongs in `taskrail-capabilities`.
- Every automation has `automation.json`, `catalog.json`, tests, health contract and concise README.
- Every publication declares TaskRail compatibility and capability/component requirements.
- Automations are isolated and must not import sibling automations.

## Categories

`communications/`, `monitoring/`, `marketing/`, `crm/`, `reporting/`, `commerce/`, `operations/`, `seo/`.

Use `npm run scaffold -- <category> <name>` to generate a minimal automation. Use `npm run check` to validate the catalog and manifests.

## TaskRail 3 compatibility

New library entries target `taskrailCompatibility: "3.0.x"`. Scaffolds follow TaskRail 3's component-first/capability-first workflow and require validation, test and health gates. The library may consume TaskRail's 2.0.x compatibility bridge when reading legacy manifests, but it does not generate new 2.x manifests.
