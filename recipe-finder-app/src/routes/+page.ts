/**
 * Not prerendered, unlike most of the app — see the long comment in the
 * root `+layout.ts` for the full mechanism, but in short: this page renders
 * `<recipe-ui-filter-chip-group>` with array-typed `options`/`selected`
 * props. A prerendered build has no `customElements` at all, so Svelte's
 * SSR output for those props is a stringified HTML attribute
 * (`"[object Object],[object Object],..."`). When the real custom element
 * later registers in the browser, its native "upgrade" reaction reads that
 * stringified attribute as the prop's initial value and throws inside
 * `render()` (`this.options.map is not a function`) before Svelte's own
 * hydration effect ever gets a chance to correct it with the real array —
 * and Stencil does not retry rendering after that throw, so the chips stay
 * permanently empty. Rendering this page purely client-side avoids ever
 * creating the element from stringified SSR markup in the first place.
 */
export const prerender = false;
