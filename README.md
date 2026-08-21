# TaskRail Automations

Reference automation library for thin, isolated business workflows built from TaskRail components and governed capabilities.

## Rules

- An automation owns workflow decisions, not reusable integration infrastructure.
- Reusable logic belongs in `taskrail-capabilities`.
- Every automation has `automation.json`, `catalog.json`, tests, health contract and concise README.
- Every publication declares TaskRail compatibility and capability/component requirements.
- Automations are isolated and must not import sibling automations.
- Mutating workflows remain deny-by-default unless the caller explicitly authorizes a mutation-capable capability.

## Categories

`communications/`, `monitoring/`, `marketing/`, `crm/`, `reporting/`, `commerce/`, `operations/`, `seo/`.

## Current reference suites

Paid media includes Meta anomaly detection, budget pacing, creative fatigue, tracking-failure detection, launch QA, lead-quality feedback, a read-first Google Ads agent and a cross-channel portfolio brief.

SEO/local visibility includes Search Console opportunity and decline detection, indexing/technical watch, content refresh prioritization, cannibalization detection, internal-link recommendations, Google Business Profile monitoring/anomaly detection, review reply drafts, SEO briefs, AI visibility monitoring and monthly SEO reporting.

Use `npm run scaffold -- <category> <name>` to generate a minimal automation. Use `npm test` to run repository and automation tests and `npm run check` to validate the catalog and manifests.

## TaskRail 3 compatibility

New library entries target `taskrailCompatibility: "3.0.x"`. Scaffolds follow TaskRail 3's component-first/capability-first workflow and require validation, test and health gates. The library may consume TaskRail's 2.0.x compatibility bridge when reading legacy manifests, but it does not generate new 2.x manifests.
