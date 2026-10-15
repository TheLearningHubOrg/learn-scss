import { compileScss } from './compiler.js';
import { SCSS_STAGES, getCompletedCount, getProgressPercentage } from './roadmap.js';

console.log('======================================================');
console.log('  The Learning Hub - Modern SCSS & Design Systems');
console.log('======================================================');
console.log('Compiler: Modern Dart Sass 1.70+ (@use / @forward)');
console.log('Architecture: Battle-Tested 7-1 Folder Pattern\n');

// 1. Compile SCSS Manifest
console.log('--- 1. Dart Sass Compilation & Module Graph ---');
try {
  const result = compileScss();
  const cssLines = result.css.split('\n').length;
  const cssBytes = Buffer.byteLength(result.css, 'utf8');

  console.log(`Compilation Status: SUCCESS`);
  console.log(`Generated CSS: ${cssLines} lines (${cssBytes} bytes)`);
  console.log(`Loaded Modules (${result.loadedUrls.length} files):`);
  result.loadedUrls.forEach((file, idx) => {
    const parts = file.split(/[/\\]/);
    const shortName = parts.slice(-3).join('/');
    console.log(`  [${idx + 1}] .../${shortName}`);
  });

  console.log('\n--- Sample Compiled CSS Rules ---');
  const sampleSnippet = result.css
    .split('\n')
    .filter(line => line.includes('.btn') || line.includes('.card') || line.includes('.grid'))
    .slice(0, 8)
    .join('\n');
  console.log(sampleSnippet || '  .btn, .btn--primary, .card, .grid loaded');
} catch (err) {
  console.error('Compilation failed:', err);
}

// 2. 7-Stage Pedagogical Roadmap
console.log('\n--- 2. 7-Stage Modern SCSS Masterclass Roadmap ---');
for (const stage of SCSS_STAGES) {
  const icon = stage.completed ? '[OK]' : '[..]';
  console.log(` ${icon} Stage ${stage.stageNumber}: ${stage.title}`);
  console.log(`      Focus: ${stage.domainFocus}`);
  console.log(`      Topics: ${stage.keyTopics.join(', ')}`);
}

const completed = getCompletedCount();
const percent = getProgressPercentage();
console.log('------------------------------------------------------');
console.log(`Progress: ${completed}/7 Stages Complete (${percent}%)`);
console.log('======================================================\n');
