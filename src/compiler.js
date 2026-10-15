import * as sass from 'sass';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function compileScss(sourcePath = path.resolve(__dirname, 'scss/main.scss')) {
  const result = sass.compile(sourcePath, {
    style: 'expanded',
    sourceMap: true
  });

  return {
    css: result.css,
    sourceMap: result.sourceMap,
    loadedUrls: result.loadedUrls.map(u => u.pathname)
  };
}
