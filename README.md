# TaskRail Automations

Reference automation library for thin, isolated business workflows built from TaskRail components and governed capabilities.

## What this repository is

`taskrail-automations` contains reusable, configurable workflow templates. They are intentionally generic: no client secrets, private account mappings or organization-specific thresholds belong here. A user or AI agent should adapt a chosen automation for the target environment and then validate/deploy it through TaskRail.

## Rules

- An automation owns workflow decisions, not reusable integration infrastructure.
- Reusable service/domain logic belongs in `taskrail-capabilities`.
- Every automation has `automation.json`, `catalog.json`, tests, a health contract and a concise local README.
- Every publication declares TaskRail compatibility and capability/component requirements.
- Automations are isolated and must not import sibling automations.
- Mutating workflows remain deny-by-default unless the caller explicitly authorizes a mutation-capable capability.
- Setup values must come from the user/environment; an AI agent must not invent credentials, account IDs, business rules or mutation approval.

## Available automations

There are currently **23 prepared automations**.

### Communications

1. `communications/email-inquiry-triage` — classify incoming enquiries, surface useful context and prepare safe follow-up actions.

### CRM

2. `crm/followup-reminder` — find records due for follow-up and produce reminders.
3. `crm/lead-quality-feedback-loop` — connect downstream lead outcomes back to marketing/lead-quality analysis.

### Marketing / paid media

4. `marketing/meta-ads-anomaly-alert` — detect abnormal Meta Ads performance using baselines and deterministic anomaly rules.
5. `marketing/ads-budget-pacing` — compare spend against budget and expected pacing.
6. `marketing/creative-fatigue-detector` — identify ads/creatives showing fatigue signals.
7. `marketing/campaign-launch-qa` — run pre-launch campaign checks and return PASS/BLOCKED findings.
8. `marketing/google-ads-agent` — read-first Google Ads diagnostics and recommendations.

### Monitoring

9. `monitoring/website-uptime` — check website availability and report failures.
10. `monitoring/ads-tracking-failure-detector` — detect sudden conversion/tracking disappearance or deterioration.

### Reporting

11. `reporting/cross-channel-ads-brief` — summarize paid-media health across channels.
12. `reporting/monthly-seo-client-report` — produce a structured monthly SEO/local visibility report.

### SEO / local visibility

13. `seo/seo-ai-visibility-monitor` — monitor Search Console, GBP, technical availability and observable AI-reference signals.
14. `seo/seo-opportunity-finder` — surface high-impression queries/pages with realistic ranking or CTR upside.
15. `seo/seo-decline-detector` — detect meaningful search visibility deterioration across comparison windows.
16. `seo/technical-indexing-watch` — watch important URLs, HTTP/indexing/canonical/sitemap/robots signals.
17. `seo/content-refresh-queue` — prioritize declining or aging pages for refresh.
18. `seo/keyword-cannibalization-detector` — identify pages competing for the same query/topic.
19. `seo/internal-linking-recommender` — suggest useful internal links, destinations and anchors.
20. `seo/local-seo-monitor` — monitor Google Business Profile/local visibility metrics.
21. `seo/gbp-anomaly-detector` — detect unusual changes in GBP performance metrics.
22. `seo/review-monitor-reply-draft` — monitor reviews and prepare reply drafts; publishing remains separately authorized.
23. `seo/seo-brief-generator` — generate an SEO/content brief from observed search opportunities and weaknesses.

Empty category directories such as `commerce/` and `operations/` are reserved for future reusable workflows.

## Setup method

The recommended flow is:

1. **Choose an automation.** Read its local `README.md`, `automation.json` and `catalog.json`.
2. **Run TaskRail discovery first.** Use `taskrail doctor`, `taskrail components` and `taskrail capability-find` before modifying the workflow.
3. **Install/resolve required capabilities.** Reuse the canonical capability listed by the automation instead of embedding a new API client in the automation.
4. **Collect environment-specific setup values.** Credentials and private IDs belong in runtime secrets/config, never in this repository.
5. **Adapt business rules.** Set schedules, thresholds, destinations, account mappings and policy decisions for the target organization.
6. **Keep mutations disabled by default.** Any action that changes ads, CRM records, GBP data, email state or other external systems requires explicit authorization.
7. **Validate before deployment.** Run the automation tests plus TaskRail `check`, `test`, `plan` and health gates.
8. **Deploy through the appropriate TaskRail profile.** Do not bypass the manifest/profile contract with a custom ad-hoc deployment path.

## What an AI agent should ask during setup

An AI agent configuring one of these automations should inspect the automation manifest first and ask only for information that cannot safely be derived. Depending on the workflow, that normally includes:

- **Target environment:** where it will run, TaskRail profile, timezone and desired schedule/cadence.
- **Accounts/resources:** website URLs, Meta ad account IDs, Google Ads customer IDs, Search Console properties, GBP locations, CRM workspace/object identifiers, mail account identifiers or other resources required by the declared capabilities.
- **Credentials:** runtime tokens/OAuth/service credentials required by those capabilities. The agent should tell the user where to store them and must never commit them to Git.
- **Destinations:** Telegram/chat/report destinations, recipients or output locations when the automation produces notifications/reports.
- **Business thresholds:** budgets, pacing tolerance, anomaly thresholds, fatigue rules, follow-up age, SEO comparison windows, important URLs, review handling rules or similar decisions.
- **Scope:** which clients/sites/accounts/campaigns/locations should be included or excluded.
- **Mutation approval:** whether external writes are allowed. If not explicitly approved, the automation must stay read-only/draft-only.

The agent should **not** ask for values already present in the target repository/runtime configuration, and it should never guess secrets, IDs or permissions. It should prefer discovering valid capability contracts and existing configuration before asking the user.

### Typical setup questions by automation family

| Family | AI agent will normally need |
| --- | --- |
| Website monitoring | URLs, expected status/timeout policy, schedule, alert destination |
| Meta/Google Ads | account/customer IDs, runtime API credentials, attribution/conversion assumptions, budgets/thresholds, schedule, alert/report destination |
| CRM | CRM endpoint/workspace/object mapping, runtime credential, due/quality rules, destination, mutation permission if applicable |
| Email triage | mailbox/account, OAuth/runtime credential, inquiry rules, notification destination, draft/send permission |
| Search Console SEO | property/site URL, OAuth runtime credential, date windows, important queries/pages, thresholds |
| GBP/local SEO | account/location identifiers, OAuth runtime credential, metrics/review scope, thresholds; explicit consent before automated external actions |
| Reports | source account/property mappings, reporting period, destination and any organization-specific labels/benchmarks |

## AI-agent execution pattern

A capable coding agent should generally follow this sequence rather than asking the user to manually wire every file:

```text
inspect automation.json and local README
→ taskrail doctor
→ taskrail components
→ taskrail capability-find "<needed behavior>"
→ resolve runtime config/secrets that already exist
→ ask only for missing account IDs, credentials, thresholds, schedule and authorization
→ adapt the generic automation
→ run tests
→ taskrail check
→ taskrail test
→ taskrail plan
→ deploy/ship through the declared profile
→ taskrail health
```

For organization-specific production use, copy/adapt the generic workflow into the private production repository rather than adding private values to this public library.

## Development

Use `npm run scaffold -- <category> <name>` to generate a minimal automation. Use `npm test` to run repository and automation tests and `npm run check` to validate the catalog and manifests.

## TaskRail 3 compatibility

New library entries target `taskrailCompatibility: "3.0.x"`. Scaffolds follow TaskRail 3's component-first/capability-first workflow and require validation, test and health gates. The library may consume TaskRail's 2.0.x compatibility bridge when reading legacy manifests, but it does not generate new 2.x manifests.
