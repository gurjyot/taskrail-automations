import fs from 'node:fs';
import path from 'node:path';

const [, , category, name] = process.argv;
const allowed = new Set(['communications', 'monitoring', 'marketing', 'crm', 'reporting', 'commerce', 'operations', 'seo']);
if (!allowed.has(category) || !name || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
  console.error('usage: npm run scaffold -- <category> <kebab-name>');
  process.exit(2);
}

const dir = path.join(category, name);
if (fs.existsSync(dir)) throw new Error('automation already exists');
fs.mkdirSync(path.join(dir, 'src'), { recursive: true });
fs.mkdirSync(path.join(dir, 'test'), { recursive: true });

const manifest = {
  name,
  taskrailCompatibility: '3.0.x',
  profile: 'portable-node@1',
  runtime: 'node',
  managed: true,
  sourceDir: '.',
  deployDir: `../.taskrail/${name}/live`,
  validationCommand: 'node --check src/main.mjs',
  testCommand: 'node --test test/*.test.mjs',
  requiredChecks: ['validation', 'test', 'health'],
  runtimeHealthCommand: 'node src/main.mjs --health',
  capabilities: [],
  components: [],
  isolation: { level: 'strict', privateTmp: true, protectHome: true, noNewPrivileges: true }
};
const catalog = {
  schema: 1,
  name,
  category,
  taskrailCompatibility: '3.0.x',
  capabilities: [],
  components: [],
  certification: { status: 'uncertified', testedAt: null },
  health: { contract: 'runtimeHealthCommand' }
};

fs.writeFileSync(path.join(dir, 'automation.json'), `${JSON.stringify(manifest, null, 2)}\n`);
fs.writeFileSync(path.join(dir, 'catalog.json'), `${JSON.stringify(catalog, null, 2)}\n`);
fs.writeFileSync(path.join(dir, 'README.md'), `# ${name}\n\nThin TaskRail 3 automation. Add workflow intent, inputs, outputs and operations here.\n`);
fs.writeFileSync(path.join(dir, 'AGENTS.md'), `# ${name}\n\nBefore implementation: search TaskRail components and TaskRail Capabilities first; record REUSE, EXTEND, CREATE, or LOCAL. Keep business workflow decisions here and reusable infrastructure outside the automation. Use doctor -> check -> test -> plan -> ship -> health.\n`);
fs.writeFileSync(path.join(dir, 'src/main.mjs'), `if (process.argv.includes('--health')) { console.log('ok'); process.exit(0); }\nexport async function run() { return { ok: true }; }\nif (import.meta.url === new URL(process.argv[1], 'file:').href) await run();\n`);
fs.writeFileSync(path.join(dir, 'test/basic.test.mjs'), `import test from 'node:test';\nimport assert from 'node:assert/strict';\nimport { run } from '../src/main.mjs';\ntest('runs', async () => assert.equal((await run()).ok, true));\n`);
console.log(dir);
