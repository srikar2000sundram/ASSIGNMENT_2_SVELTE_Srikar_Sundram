/**
 * The single definition of "vegetarian" this app uses for TheMealDB content:
 * discovery, and any API-sourced recipe still reachable outside discovery
 * (a direct link to a recipe id discovery would never have surfaced).
 *
 * This only applies to `source: 'api'` recipes. Recipes you create yourself
 * are never checked against this — you can add whatever you want. TheMealDB
 * has no per-recipe boolean for "is this vegetarian," so the closest
 * reliable signal is its own `strCategory` field, which includes exactly two
 * diet categories: "Vegetarian" and "Vegan". Rather than guess from
 * ingredient names (unreliable — "coconut milk" isn't dairy, "fish sauce"
 * isn't always named "fish"), the app treats category membership as the
 * definition.
 */
const VEGETARIAN_CATEGORIES = ['vegetarian', 'vegan'];

/** True if `category` is "Vegetarian" or "Vegan" (case- and whitespace-insensitive). */
export function isVegetarianCategory(category: string | null | undefined): boolean {
	if (!category) return false;
	return VEGETARIAN_CATEGORIES.includes(category.trim().toLowerCase());
}
