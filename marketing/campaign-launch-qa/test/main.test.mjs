import test from'node:test';import assert from'node:assert/strict';import{evaluate}from'../src/main.mjs';test('blocks incomplete launch',()=>assert.equal(evaluate({budget:100}).verdict,'BLOCKED'));
