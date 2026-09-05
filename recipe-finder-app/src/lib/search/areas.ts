/**
 * Curated cuisine (area) filter options.
 *
 * TheMealDB's `list.php?a=list` returns ~195 country/nationality names, but
 * discovery only ever shows vegetarian/vegan recipes (see
 * docs/assumptions.md#recipe-data), and the overwhelming majority of those
 * 195 areas have zero recipes in that intersection — clicking the chip would
 * always land on the empty state. Rather than show ~170 dead chips, this
 * list keeps only the areas independently verified to return at least one
 * vegetarian or vegan result from `filter.php?a=` today.
 *
 * Verified by cross-referencing every area's `filter.php?a=` id set against
 * the combined `filter.php?c=Vegetarian` + `filter.php?c=Vegan` id set — the
 * same two calls discovery itself makes for the always-on diet axis. 24 of
 * 195 areas had a non-empty intersection at verification time.
 *
 * TheMealDB is a community-editable database, so this list can drift as
 * recipes are added or re-tagged — it isn't literally guaranteed forever,
 * just checked rather than guessed. Values must match TheMealDB's area
 * spelling exactly, since they're passed straight to `filter.php?a=`.
 */
import type { FilterOption } from '@srikar_sundram/recipe-ui-kit';

export const VEG_FRIENDLY_AREAS: FilterOption[] = [
	{ value: 'Algerian', label: 'Algerian' },
	{ value: 'Australian', label: 'Australian' },
	{ value: 'British', label: 'British' },
	{ value: 'Canadian', label: 'Canadian' },
	{ value: 'Chinese', label: 'Chinese' },
	{ value: 'Egyptian', label: 'Egyptian' },
	{ value: 'Filipino', label: 'Filipino' },
	{ value: 'Greek', label: 'Greek' },
	{ value: 'Italian', label: 'Italian' },
	{ value: 'Jamaican', label: 'Jamaican' },
	{ value: 'Japanese', label: 'Japanese' },
	{ value: 'Kenyan', label: 'Kenyan' },
	{ value: 'Mexican', label: 'Mexican' },
	{ value: 'Moroccan', label: 'Moroccan' },
	{ value: 'Polish', label: 'Polish' },
	{ value: 'Russian', label: 'Russian' },
	{ value: 'Saudi Arabian', label: 'Saudi Arabian' },
	{ value: 'Spanish', label: 'Spanish' },
	{ value: 'Syrian', label: 'Syrian' },
	{ value: 'Thai', label: 'Thai' },
	{ value: 'Tunisian', label: 'Tunisian' },
	{ value: 'Turkish', label: 'Turkish' },
	{ value: 'Ukrainian', label: 'Ukrainian' },
	{ value: 'Vietnamese', label: 'Vietnamese' }
];
