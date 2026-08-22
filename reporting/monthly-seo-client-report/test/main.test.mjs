import test from'node:test';import assert from'node:assert/strict';import{evaluate}from'../src/main.mjs';test('creates report',()=>assert.match(evaluate({client:'Acme'}).text,/Acme/));
