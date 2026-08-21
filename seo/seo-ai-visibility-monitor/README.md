# SEO & AI Visibility Monitor

Generic TaskRail workflow for monitoring organic search, local/Google Business Profile visibility, technical availability and observable AI references.

## Inputs

- normalized Google Search Console current/previous metrics
- normalized Google Business Profile current/previous metrics
- technical site checks
- optional AI-reference observations from whatever approved provider/probe the consuming automation uses

## Outputs

- search visibility changes
- local visibility changes
- AI mention/citation rate
- prioritized issues
- recommended next actions

This automation does not claim it can guarantee rankings or force AI systems to recommend a brand. AI-reference observations are treated as measurable external signals, while optimization actions focus on crawlability, entity clarity, authoritative content, structured data and source-worthiness.

Decision: REUSE `google-search-console`, `google-business-profile`, and `http-health-check`. Provider-specific AI probing remains LOCAL until a reusable provider contract is proven.
