export function evaluate({ current, baseline, thresholds = {} }) {
  if (!current || !baseline) throw new Error('current and baseline are required');
  const anomalies = [];
  for (const [metric, raw] of Object.entries(current)) {
    const value = Number(raw); const base = Number(baseline[metric]); const threshold = Number(thresholds[metric] ?? 0.25);
    if (!Number.isFinite(value) || !Number.isFinite(base) || base === 0 || !Number.isFinite(threshold) || threshold < 0) continue;
    const relativeChange = (value - base) / Math.abs(base);
    if (Math.abs(relativeChange) >= threshold) anomalies.push({ metric, current:value, baseline:base, relativeChange, direction:relativeChange>0?'up':'down' });
  }
  return { ok:true, alert:anomalies.length>0, anomalies };
}
export async function run(input={}) { return evaluate(input); }
if (process.argv.includes('--health')) { console.log('ok'); process.exit(0); }
