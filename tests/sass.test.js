// Minimal runner: the tests themselves are written in SCSS with sass-true, in
// tests/*.test.scss and the exercise solutions in exercises/**/*.test.scss.
// This file hands each one to Node's built-in test runner and adds one
// end-to-end check that the real entry point compiles cleanly.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';
import sassTrue from 'sass-true';

const here = path.dirname(fileURLToPath(import.meta.url));
const suiteDirs = [here, path.join(here, '../exercises'), path.join(here, '../examples')];

for (const dir of suiteDirs) {
  const files = readdirSync(dir, { recursive: true }).filter((name) => name.endsWith('.test.scss'));
  for (const file of files.sort()) {
    sassTrue.runSass({ describe, it, sass }, path.join(dir, file));
  }
}

describe('src/scss/main.scss', () => {
  it('compiles with no warnings and emits the BEM classes', () => {
    const warnings = [];
    const { css } = sass.compile(path.join(here, '../src/scss/main.scss'), {
      logger: { warn: (message) => warnings.push(message) },
    });

    assert.deepEqual(warnings, []);
    for (const selector of ['.btn--primary', '.btn--warning', '.card__title', '.grid', ':root']) {
      assert.ok(css.includes(selector), `missing ${selector}`);
    }
    assert.match(css, /--color-primary: #4f46e5;/);
    assert.match(css, /@media \(min-width: 768px\)/);
  });
});

describe('exercise solutions', () => {
  it('stage 1: the badge component compiles to the expected rules', () => {
    const { css } = sass.compileString('@use "badges";', {
      loadPaths: [path.join(here, '../exercises/stage-1')],
    });
    assert.match(css, /\.badge--warning \{\n {2}color: #0f172a;\n {2}background-color: #facc15;/);
  });

  it('stage 2: a reconfigured palette re-themes the buttons', () => {
    const { css } = sass.compile(path.join(here, '../exercises/stage-2/brand.scss'));
    assert.match(css, /\.brand-b \.btn--primary \{\n {2}color: #fff;\n {2}background-color: #be185d;/);
  });
});
