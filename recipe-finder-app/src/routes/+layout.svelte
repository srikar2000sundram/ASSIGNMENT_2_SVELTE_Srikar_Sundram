<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	// recipe-ui-kit custom-element registration happens in +layout.ts's
	// load(), not here — see the comment there for why it can't be an
	// onMount().
	let { children } = $props();

	const navLinks = [
		{ href: '/', label: 'Discover' },
		{ href: '/favorites', label: 'Favorites' },
		{ href: '/meal-plan', label: 'Meal Plan' },
		{ href: '/recipes/new', label: 'Add Recipe' }
	] as const;
</script>

<svelte:head>
	<title>Recipe Finder & Meal Planner</title>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<!-- Cinzel: an engraved, storybook-style display serif used only for
	     headings and the brand mark — see app.css's --ruik-font-display. -->
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&display=swap"
	/>
</svelte:head>

<nav class="app-nav">
	<a class="app-nav__brand" href={resolve('/')}>
		<svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
			<circle cx="16" cy="16" r="16" fill="var(--ruik-color-primary)" />
			<!-- A cauldron: cooking's own bit of magic, no wand required. -->
			<path
				d="M9 14c0 6 3.5 10 7 10s7-4 7-10"
				stroke="var(--ruik-color-on-primary)"
				stroke-width="2.1"
				stroke-linecap="round"
				fill="none"
			/>
			<ellipse cx="16" cy="14" rx="7" ry="1.7" fill="var(--ruik-color-on-primary)" />
			<path
				d="M12 25.5l-1 1.6M20 25.5l1 1.6"
				stroke="var(--ruik-color-on-primary)"
				stroke-width="1.7"
				stroke-linecap="round"
			/>
			<path
				d="M22.5 7.5l.7 1.7 1.7.7-1.7.7-.7 1.7-.7-1.7-1.7-.7 1.7-.7Z"
				fill="var(--ruik-color-on-primary)"
			/>
		</svg>
		Recipe Finder
	</a>
	<div class="app-nav__links">
		{#each navLinks as link (link.href)}
			<a href={resolve(link.href)} class:active={page.url.pathname === link.href}>{link.label}</a>
		{/each}
	</div>
</nav>

<div class="app-shell">
	{@render children()}
</div>
