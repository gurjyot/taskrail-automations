# Production runtime validation

The automation library contains templates, not running services. Runtime permissions therefore belong to the target deployment environment rather than to individual library entries.

For Linux/systemd deployments, TaskRail 3 separates application health from production runtime health. After adapting an automation, deployment is not considered complete until the actual systemd service user can enter the configured `WorkingDirectory`, read every production-applicable `requiredSharedFiles` path, and every declared timer is enabled and active.

Use:

```bash
taskrail-systemd-sync <automation> --verify-runtime
```

or for a fleet:

```bash
taskrail-systemd-sync --all --verify-runtime
```

`taskrail ship` also performs the service runtime-context gate for managed production systemd automations. A code-level health check alone is not sufficient proof of production readiness. If the post-activation runtime-context gate fails, the ship fails and TaskRail attempts rollback plus restored-runtime verification.

This rule applies automatically to all current and future templates when they are imported into a systemd environment; the 75 library templates do not need duplicated per-automation permission logic.
