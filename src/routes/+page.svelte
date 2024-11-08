<script>
	// @ts-nocheck

	import Nav from '$lib/components/Nav.svelte';
	import App from '$lib/components/App.svelte';
</script>

<svelte:head>
	<title>ALGEO - Discover Algeria's Future, Present and Past.</title>
</svelte:head>

<main>
	<Nav />
	<App />
</main>

<style>
	main {
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;
		justify-content: stretch;
	}
</style>
