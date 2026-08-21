import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

test('published reference manifest targets TaskRail 3', () => {
  const a = JSON.parse(fs.readFileSync('monitoring/website-uptime/automation.json','utf8'));
  assert.equal(a.taskrailCompatibility, '3.0.x');
  assert.equal(a.sourceDir, '.');
  assert.deepEqual(a.requiredChecks, ['validation','test','health']);
  assert.equal(a.isolation.level, 'strict');
  assert.equal(a.isolation.noNewPrivileges, true);
});

test('scaffolder emits TaskRail 3 manifests', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'taskrail-auto-'));
  const script = path.resolve('scripts/scaffold.mjs');
  const r = spawnSync(process.execPath, [script, 'monitoring', 'v3-smoke'], { cwd: tmp, encoding:'utf8' });
  assert.equal(r.status, 0, r.stderr);
  const a = JSON.parse(fs.readFileSync(path.join(tmp,'monitoring/v3-smoke/automation.json'),'utf8'));
  assert.equal(a.taskrailCompatibility, '3.0.x');
  assert.equal(a.sourceDir, '.');
  assert.ok(a.requiredChecks.includes('health'));
});
