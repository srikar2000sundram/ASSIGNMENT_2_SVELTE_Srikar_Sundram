# Assumptions

The brief doesn't spell out everything, so here's what I assumed while
building this and why. Some of these I'd happily do differently if someone
told me otherwise — they're just the calls I made to keep moving.

## Recipe data

I used [TheMealDB](https://www.themealdb.com/api.php)'s free test key
instead of a paid API. The brief just says "a public recipe API," it
doesn't name one, and TheMealDB needed no signup and no API key management,
which meant anyone pulling this repo could run it immediately. I looked at
Spoonacular too but its free tier has a daily quota low enough that I
didn't want to risk someone reviewing this burning through it.

"Browse recipes" (the case where nothing's been searched or filtered) I
took to mean "show something reasonable by default," not any specific set.

Every recipe pulled from TheMealDB — browsed, searched, or filtered — is
one it categorizes as Vegetarian or Vegan. That wasn't in the original
brief; it came up as a follow-on request partway through, and I applied it
only to TheMealDB content, not to the app as a whole. TheMealDB has no
per-recipe "is this vegetarian" flag, so its own category field is the
closest reliable signal, and I used that rather than guessing from
ingredient names (too easy to get wrong — "coconut milk" isn't dairy).
Recipes you add yourself are never checked against this; you can create
whatever you want, and it'll show up in Your Recipes, favorites, and the
meal plan the same as anything else.

The main-ingredient filter doesn't use TheMealDB's full ingredient list —
it's got like 600 entries, which would be a wall of chips nobody wants to
scroll through. I picked a shortlist of common ones instead (all
vegetarian, to match the restriction above) and checked each one actually
returns recipes before putting it in.

## No backend

Favorites, your own recipes, and the meal plan all live in the browser's
`localStorage`. There's no database, no server, no accounts. I read the
brief as being about component architecture and state management, not
about building a real multi-user product, so I didn't see the point of
standing up a backend just to say I had one. The real cost of this: it's
per-browser data. Clear your site storage, or open the app somewhere else,
and it's gone. Didn't want to hide that.

Following from that — recipe management (add/edit/delete) only applies to
recipes you create in the app. TheMealDB's recipes are read-only, which
matches how the brief phrases it: "edit recipes created by the user," not
"edit any recipe."

## One recipe per day, not per meal

The meal plan is one recipe per weekday. No breakfast/lunch/dinner slots.
Nothing in the brief asked for multiple meals a day, and adding that
seemed like solving a problem nobody had.

## Deleting things

Delete uses a two-step inline confirm (click Delete, then Confirm) instead
of a native `window.confirm()` popup. Just a UX preference — felt less
jarring, and it's still a real confirmation step either way.

## Tooling

npm, not pnpm or yarn — the brief keeps saying "npm package" and "npm
Publishing Requirement," so I stuck with what it was already implying.

One GitHub repo, not two, even though the app and the component library
are architecturally separate projects with their own `package.json`s. The
deliverables list asks for "a link to github repository," singular, and
splitting into two repos would mean handing over a link nobody asked for.
The app still consumes the library as a real published npm dependency
either way — that part doesn't depend on how many repos anything lives in.

## Deployment

The app builds as a static site with no server-side code at all — no
API routes, no server-rendered pages. Everything it needs either comes
from TheMealDB over `fetch()` or from `localStorage`, so there was never
anything that needed a server to run. That's what let it deploy to Vercel
with basically zero configuration.
