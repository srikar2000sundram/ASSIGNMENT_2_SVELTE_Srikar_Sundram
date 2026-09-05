import { browser } from '$app/environment';

/**
 * Prerender every route that can be enumerated at build time. The app has no
 * server-side data loading, so the prerendered output is the final HTML shell
 * plus the client bundle.
 *
 * `/recipes/[id]` opts out (its own +page.ts): recipe ids come from TheMealDB
 * at runtime and cannot be enumerated, so those are served by the static
 * adapter's `fallback` page and rendered on the client.
 */
export const prerender = true;

/**
 * Registers every recipe-ui-kit custom element once, globally, from the
 * *published* package's `dist-custom-elements` build (one self-registering
 * module per component) — NOT the lazy loader: the loader fetches a shared
 * component bundle via a runtime-computed path that Vite's production
 * bundler cannot statically analyze, so that file never gets copied into the
 * build output and every custom element silently fails to render. Each
 * import below is a literal string, which Vite can bundle correctly, and
 * importing it is enough — Stencil's `auto-define-custom-elements` behavior
 * calls `customElements.define()` as a side effect.
 *
 * This lives in a `load()`, not `onMount()`, and is gated on `browser` for
 * two reasons at once:
 *  - `customElements` doesn't exist during SSR/prerendering, so the import
 *    must never run there — `onMount` also satisfies this, but...
 *  - ...`onMount` runs *after* the component tree (including every route
 *    that renders a `<recipe-ui-*>` tag) has already mounted and set its
 *    props. If a tag isn't `customElements.define()`-registered yet at that
 *    point, an array/object prop (`options`, `selected`, `initialValue`)
 *    gets written as a stringified HTML *attribute* instead of a JS
 *    property, because the element is still a plain, un-upgraded
 *    `HTMLElement`. Each such prop-setting effect runs exactly once, so
 *    whichever element loses this race is left permanently broken — e.g.
 *    `recipe-ui-filter-chip-group` throwing `this.options.map is not a
 *    function` and rendering zero chips. A root layout `load()` is awaited
 *    by SvelteKit before it hydrates anything under it, so registration is
 *    guaranteed to finish before any route's props are ever set.
 */
export async function load() {
	if (browser) {
		await Promise.all([
			import('@srikar_sundram/recipe-ui-kit/recipe-ui-card'),
			import('@srikar_sundram/recipe-ui-kit/recipe-ui-search-bar'),
			import('@srikar_sundram/recipe-ui-kit/recipe-ui-filter-chip-group'),
			import('@srikar_sundram/recipe-ui-kit/recipe-ui-rating-badge'),
			import('@srikar_sundram/recipe-ui-kit/recipe-ui-form'),
			import('@srikar_sundram/recipe-ui-kit/recipe-ui-meal-slot'),
			import('@srikar_sundram/recipe-ui-kit/recipe-ui-modal-dialog')
		]);
	}
}
