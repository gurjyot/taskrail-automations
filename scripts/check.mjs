import fs from 'node:fs';
import path from 'node:path';

const roots = ['communications', 'monitoring', 'marketing', 'crm', 'reporting', 'commerce', 'operations', 'seo'];
const errors = [];
for (const root of roots) {
  if (!fs.existsSync(root)) continue;
  for (const name of fs.readdirSync(root)) {
    const dir = path.join(root, name);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const f of ['automation.json', 'catalog.json', 'README.md']) {
      if (!fs.existsSync(path.join(dir, f))) errors.push(`${dir}: missing ${f}`);
    }
    const ap = path.join(dir, 'automation.json');
    const cp = path.join(dir, 'catalog.json');
    if (!fs.existsSync(ap) || !fs.existsSync(cp)) continue;
    const a = JSON.parse(fs.readFileSync(ap, 'utf8'));
    const c = JSON.parse(fs.readFileSync(cp, 'utf8'));
    for (const k of ['name','taskrailCompatibility','runtime','managed','sourceDir','deployDir','validationCommand','testCommand']) {
      if (a[k] === undefined || a[k] === '') errors.push(`${dir}: missing automation ${k}`);
    }
    if (a.taskrailCompatibility !== '3.0.x') errors.push(`${dir}: new publications must target TaskRail 3.0.x`);
    if (a.managed !== true) errors.push(`${dir}: published reference automation must be managed`);
    if (!a.healthCheck && !a.healthChecks?.length && !a.healthCommand && !a.runtimeHealthCommand) errors.push(`${dir}: health contract required`);
    if (!Array.isArray(a.requiredChecks) || !['validation','test','health'].every(x => a.requiredChecks.includes(x))) errors.push(`${dir}: TaskRail 3 requiredChecks must include validation/test/health`);
    if (a.isolation?.level !== 'strict' || a.isolation?.noNewPrivileges !== true) errors.push(`${dir}: strict isolation/noNewPrivileges required`);
    for (const k of ['name','category','taskrailCompatibility','capabilities','components','certification','health']) {
      if (c[k] === undefined) errors.push(`${dir}: missing catalog ${k}`);
    }
    if (c.category !== root) errors.push(`${dir}: category mismatch`);
    if (c.taskrailCompatibility !== a.taskrailCompatibility) errors.push(`${dir}: compatibility mismatch between catalog and manifest`);
    if (!Array.isArray(c.capabilities) || !Array.isArray(c.components)) errors.push(`${dir}: capabilities/components must be arrays`);
    if (JSON.stringify(c.capabilities) !== JSON.stringify(a.capabilities ?? [])) errors.push(`${dir}: capability catalog drift`);
    if (JSON.stringify(c.components) !== JSON.stringify(a.components ?? [])) errors.push(`${dir}: component catalog drift`);
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('TaskRail 3 automation catalog check PASS');
