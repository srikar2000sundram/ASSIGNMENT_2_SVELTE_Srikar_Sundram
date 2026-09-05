/**
 * Not prerendered — see the root `+layout.ts` comment for the full
 * mechanism. This page passes an object (`recipe: MealSlotRecipe | null`)
 * to `<recipe-ui-meal-slot>`, which is the same class of prop that broke
 * `<recipe-ui-filter-chip-group>` on `/` when rendered from a prerendered,
 * SSR-stringified custom-element attribute.
 */
export const prerender = false;
