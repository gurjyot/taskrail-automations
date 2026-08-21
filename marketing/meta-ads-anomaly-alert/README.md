# Meta Ads Anomaly Alert

Generic read-only TaskRail workflow that evaluates normalized Meta Ads metrics against historical baselines and emits alerts only when configured thresholds are crossed.

Decision: REUSE `meta-ads`, `ads-baselines`, `ads-anomaly-detection`, and `telegram-bot`. Business thresholds stay in the consuming automation/configuration.
