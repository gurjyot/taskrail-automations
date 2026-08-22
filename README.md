# TaskRail Automations

Reference automation library for thin, isolated business workflows built from TaskRail components and governed capabilities.

## What this repository is

`taskrail-automations` contains reusable, configurable workflow templates. They are intentionally generic: no client secrets, private account mappings or organization-specific thresholds belong here. Adapt a chosen automation for the target environment and validate/deploy it through TaskRail.

## Rules

- An automation owns workflow decisions, not reusable integration infrastructure.
- Reusable service/domain logic belongs in `taskrail-capabilities`.
- Every automation has `automation.json`, `catalog.json`, tests, a health contract and a concise local README.
- Every publication declares TaskRail compatibility and capability/component requirements.
- Automations are isolated and must not import sibling automations.
- Mutating workflows remain deny-by-default unless the caller explicitly authorizes a mutation-capable capability.
- Setup values must come from the user/environment; an AI agent must not invent credentials, account IDs, business rules or mutation approval.

## Available automations

There are currently **75 prepared automations**.

### Communications

1. `communications/email-inquiry-triage` — triage enquiries and prepare safe follow-up actions.
2. `communications/support-message-priority-detector` — classify support messages by urgency signals.
3. `communications/repeated-client-issue-detector` — detect recurring client issue patterns.

### CRM

4. `crm/followup-reminder` — find records due for follow-up.
5. `crm/lead-quality-feedback-loop` — connect downstream lead outcomes back to acquisition quality.
6. `crm/lead-response-time-monitor` — flag new leads that miss the first-contact SLA.
7. `crm/lost-lead-recovery-queue` — surface older eligible leads for recovery.
8. `crm/quote-follow-up-monitor` — flag unanswered proposals/quotes after a configured window.
9. `crm/whatsapp-follow-up-queue` — prepare overdue WhatsApp follow-ups; sending stays separately authorized.

### Marketing / paid media

10. `marketing/meta-ads-anomaly-alert` — detect abnormal Meta Ads performance.
11. `marketing/ads-budget-pacing` — compare spend against budget and expected pacing.
12. `marketing/creative-fatigue-detector` — identify creative fatigue signals.
13. `marketing/campaign-launch-qa` — return PASS/BLOCKED findings before campaign launch.
14. `marketing/google-ads-agent` — read-first Google Ads diagnostics and recommendations.

### Monitoring / reliability

15. `monitoring/website-uptime` — check website availability.
16. `monitoring/ads-tracking-failure-detector` — detect conversion/tracking disappearance.
17. `monitoring/client-review-monitor` — flag unseen reviews across configured review sources.
18. `monitoring/website-form-failure-detector` — detect broken enquiry/contact form flows.
19. `monitoring/broken-link-monitor` — flag crawled links returning failures.
20. `monitoring/website-speed-regression-alert` — detect material page-speed regressions.
21. `monitoring/ssl-domain-expiry-monitor` — warn before SSL/domain expiry.
22. `monitoring/website-backup-verification` — verify website backups are recent and successful.
23. `monitoring/credential-expiry-monitor` — warn before OAuth/certificate/grant expiry without storing secrets.
24. `monitoring/automation-failure-digest` — aggregate failed/degraded automation runs.
25. `monitoring/system-resource-watch` — watch CPU, memory, disk and load thresholds.
26. `monitoring/database-backup-verification` — verify database backup freshness/success/checksum state.
27. `monitoring/document-drift-detector` — compare documented and observed configuration fingerprints.
28. `monitoring/client-report-delivery-checker` — catch reports generated but not delivered.
29. `monitoring/missed-task-detector` — catch scheduled work that passed its due time.
30. `monitoring/duplicate-work-detector` — identify duplicate tasks/work by normalized fingerprint.

### Reporting

31. `reporting/cross-channel-ads-brief` — summarize paid-media health across channels.
32. `reporting/monthly-seo-client-report` — produce a structured monthly SEO/local visibility report.
33. `reporting/monthly-client-report-generator` — combine ads, SEO, website, CRM, social and delivery sections.

### SEO / local visibility

34. `seo/seo-ai-visibility-monitor` — monitor Search Console, GBP, technical availability and AI-reference signals.
35. `seo/seo-opportunity-finder` — find high-impression queries/pages with realistic upside.
36. `seo/seo-decline-detector` — detect meaningful search visibility deterioration.
37. `seo/technical-indexing-watch` — watch HTTP/indexing/canonical/sitemap/robots signals.
38. `seo/content-refresh-queue` — prioritize declining or aging pages for refresh.
39. `seo/keyword-cannibalization-detector` — identify pages competing for the same query/topic.
40. `seo/internal-linking-recommender` — suggest useful internal links and anchors.
41. `seo/local-seo-monitor` — monitor Google Business Profile/local visibility metrics.
42. `seo/gbp-anomaly-detector` — detect unusual GBP metric changes.
43. `seo/review-monitor-reply-draft` — monitor reviews and prepare reply drafts; publishing remains separately authorized.
44. `seo/seo-brief-generator` — generate an SEO/content brief from observed opportunities.
45. `seo/google-review-velocity-monitor` — detect a slowdown in Google review acquisition.
46. `seo/competitor-content-monitor` — detect newly observed competitor content.
47. `seo/content-gap-finder` — find competitor-covered topics missing from the target site.

### WordPress

48. `wordpress/plugin-vulnerability-watch` — match installed versions against vulnerability advisories.
49. `wordpress/update-risk-checker` — score update risk before any mutation is authorized.

### Commerce

50. `commerce/competitor-pricing-monitor` — detect material competitor price changes.
51. `commerce/product-stock-monitor` — flag important products that become unavailable/low stock.
52. `commerce/ecommerce-order-anomaly-detector` — detect order/revenue deviations from baseline.
53. `commerce/checkout-failure-detector` — evaluate synthetic cart/checkout stages safely.
54. `commerce/abandoned-checkout-escalation` — detect unusually high checkout abandonment.
55. `commerce/revenue-drop-alert` — flag revenue materially below baseline.

### Agency operations

56. `operations/daily-agency-action-queue` — combine actionable findings into one prioritized queue.
57. `operations/client-health-score` — compute a weighted client health score.
58. `operations/client-churn-risk-detector` — score configured churn-risk signals.
59. `operations/pending-client-approval-monitor` — flag approvals waiting beyond SLA.
60. `operations/overdue-deliverable-monitor` — flag incomplete deliverables past due.
61. `operations/client-onboarding-checklist` — evaluate required onboarding checks.
62. `operations/client-offboarding-automation` — build a safe offboarding action plan; mutations remain disabled by default.
63. `operations/invoice-payment-reminder` — identify overdue invoices and prepare reminder candidates.
64. `operations/renewal-reminder` — warn before retainers, hosting, domains, tools or licenses renew.
65. `operations/meeting-preparation-brief` — assemble performance/issues/approvals/decisions before a meeting.
66. `operations/meeting-follow-up-extractor` — normalize meeting actions into owners and deadlines.
67. `operations/team-workload-balancer` — compare weighted active workload by owner.
68. `operations/agency-knowledge-capture` — turn resolved recurring issues into reviewable knowledge candidates.

### Social / content

69. `social/social-content-approval-queue` — queue posts awaiting approval and flag overdue approvals.
70. `social/social-media-posting` — prepare validated publication jobs; publishing requires explicit authorization.
71. `social/social-performance-anomaly-detector` — detect material social-metric deviations.
72. `social/best-performing-post-detector` — rank posts using configurable weighted performance metrics.
73. `social/content-repurposing-queue` — prioritize strong content for repurposing.
74. `social/trend-opportunity-monitor` — score supplied trends by relevance, momentum and recency.
75. `social/monthly-content-planner` — build a deterministic draft content-slot plan.

## Setup method

1. Choose an automation and read its local `README.md`, `automation.json` and `catalog.json`.
2. Run `taskrail doctor`, `taskrail components` and `taskrail capability-find` before modifying the workflow.
3. Resolve/install required canonical capabilities instead of embedding duplicate API clients.
4. Collect environment-specific credentials, resource IDs, schedules and destinations outside this public repository.
5. Adapt thresholds and business rules for the target environment.
6. Keep mutations disabled unless explicit authorization is provided.
7. Run the automation tests plus TaskRail `check`, `test`, `plan` and health gates.
8. Deploy through the declared TaskRail profile.

## AI-agent execution pattern

```text
inspect automation.json and local README
→ taskrail doctor
→ taskrail components
→ taskrail capability-find "<needed behavior>"
→ resolve runtime config/secrets that already exist
→ ask only for missing IDs, credentials, thresholds, schedule and authorization
→ adapt the generic automation
→ run tests
→ taskrail check
→ taskrail test
→ taskrail plan
→ deploy/ship through the declared profile
→ taskrail health
```

For organization-specific production use, copy/adapt the generic workflow into the private production repository rather than adding private values here.

## Development

Use `npm run scaffold -- <category> <name>` to generate a minimal automation. Use `npm test` to run repository and automation tests and `npm run check` to validate the catalog and manifests.

## TaskRail 3 compatibility

New library entries target `taskrailCompatibility: "3.0.x"`. Scaffolds use TaskRail 3's component-first/capability-first workflow and require validation, test and health gates. The library may consume TaskRail's 2.0.x compatibility bridge when reading legacy manifests, but it does not generate new 2.x manifests.
