// Replaces Next.js's built-in polyfill module (see next.config.mjs).
// Our browserslist targets (Chrome/Edge/Firefox 111+, Safari 16.4+) already support
// Array.prototype.at/flat/flatMap, Object.fromEntries/hasOwn and String trimStart/trimEnd,
// so shipping polyfills for them is wasted JavaScript (Lighthouse "Legacy JavaScript").
export {};
