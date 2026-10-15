import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { compileScss } from '../src/compiler.js';
import { SCSS_STAGES, getCompletedCount, getProgressPercentage } from '../src/roadmap.js';

describe('Dart Sass 7-1 Compilation Pipeline', () => {
  it('compiles main.scss without syntax or module errors', () => {
    const result = compileScss();
    assert.ok(result.css);
    assert.ok(result.css.length > 100);
    assert.ok(result.loadedUrls.length >= 6);
  });

  it('contains compiled BEM component classes', () => {
    const { css } = compileScss();
    assert.ok(css.includes('.btn'));
    assert.ok(css.includes('.btn--primary'));
    assert.ok(css.includes('.card'));
    assert.ok(css.includes('.card__header'));
    assert.ok(css.includes('.container'));
    assert.ok(css.includes('.grid'));
  });

  it('compiles media queries accurately from breakpoint tokens', () => {
    const { css } = compileScss();
    assert.ok(css.includes('@media screen and (min-width: 640px)'));
    assert.ok(css.includes('@media screen and (min-width: 768px)'));
  });
});

describe('SCSS 7-Stage Pedagogical Roadmap Integrity', () => {
  it('defines all 7 stages with 100% completion metrics', () => {
    assert.equal(SCSS_STAGES.length, 7);
    assert.equal(getCompletedCount(), 7);
    assert.equal(getProgressPercentage(), 100);
  });
});
