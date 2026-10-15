/**
 * The Learning Hub - Modern SCSS & Enterprise Design Systems Roadmap
 */

export const SCSS_STAGES = [
  {
    stageNumber: 1,
    title: "Dart Sass Foundations & Compilation Architecture",
    domainFocus: "Modern compiler toolchain, AST compilation, source maps, eliminating legacy node-sass/libsass",
    completed: true,
    keyTopics: ["Dart Sass CLI", "Source Maps Generation", "Embedded Host Protocol", "Live Watch Mode"]
  },
  {
    stageNumber: 2,
    title: "Module System Encapsulation (@use and @forward)",
    domainFocus: "Namespaced imports, private members (_private), eliminating global pollution of legacy @import",
    completed: true,
    keyTopics: ["@use with Namespace", "@forward Config/Overrides", "Private Members with Leading Underscore", "Module Boundary Isolation"]
  },
  {
    stageNumber: 3,
    title: "Design Tokens, Deep Maps & Mathematical Engines",
    domainFocus: "Multi-dimensional maps, sass:map, sass:math, rem/em conversion functions, token validation",
    completed: true,
    keyTopics: ["Multi-dimensional Token Maps", "math.div & Unit Safety", "Custom Function Error Guards", "CSS Custom Properties Generation"]
  },
  {
    stageNumber: 4,
    title: "Parametric Mixins, Directives & Content Blocks",
    domainFocus: "Responsive breakpoint managers (@content), BEM modifiers, control flow (@if, @else, @each)",
    completed: true,
    keyTopics: ["Parametric Media Query Mixins", "@content Injections", "Dynamic Class Generation with @each", "BEM Mixin Architecture"]
  },
  {
    stageNumber: 5,
    title: "Advanced Layout Engines: Fluid Grids & Typography",
    domainFocus: "12-column responsive grid generator, clamp() fluid typography, CSS Grid and Subgrid automation",
    completed: true,
    keyTopics: ["Algorithmic Grid Column Loops", "clamp() Viewport Typography", "Auto-fit & Auto-fill Grid Tracks", "Container Query Helpers"]
  },
  {
    stageNumber: 6,
    title: "The 7-1 Architectural Directory Pattern",
    domainFocus: "Scalable directory structure: abstracts/, base/, components/, layout/, pages/, themes/, vendors/",
    completed: true,
    keyTopics: ["7-1 Pattern Layering", "Global Manifest main.scss", "Theme Layer Separation", "Third-party Vendor Scoping"]
  },
  {
    stageNumber: 7,
    title: "Staff Design Systems Architect Interview Handbook",
    domainFocus: "40+ staff scenario Q&As, CSS specificity wars, bundle bloat mitigation, post-processing pipelines",
    completed: true,
    keyTopics: ["Stylelint AST Rules", "PostCSS & Autoprefixer", "Critical CSS Extraction", "CSSNano Dead Code Elision"]
  }
];

export function getCompletedCount() {
  return SCSS_STAGES.filter(s => s.completed).length;
}

export function getProgressPercentage() {
  return Math.round((getCompletedCount() / SCSS_STAGES.length) * 100);
}
