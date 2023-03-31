<script lang="ts">
	import { page } from '$app/stores';
	import '@skeletonlabs/skeleton/styles/all.css';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { afterNavigate, invalidateAll } from '$app/navigation';
	import NavBar from '$lib/navigators/NavBar.svelte';
	import PageHeader from '$lib/navigators/PageHeader.svelte';
	import tutors from '../packages/tutors-ui/lib/themes/tutors.css?inline';
	import dyslexia from '../packages/tutors-ui/lib/themes/dyslexia.css?inline';
	import {
		storeTheme,
		currentLo,
		currentPage,
		home,
		filePath
	} from '../packages/tutors-reader-lib/src/stores/stores';
	import Sidebars from '$lib/navigators/sidebars/Sidebars.svelte';
	import { watchImmediate } from 'tauri-plugin-fs-watch-api';
	import type { UnlistenFn } from '@tauri-apps/api/event';

	let mounted = false;
	const themes: any = { tutors, dyslexia };
	let watcher: UnlistenFn;

	onMount(async () => {
		mounted = true;
		storeTheme.subscribe(setBodyThemeAttribute);
		setColorScheme();
	});

	page.subscribe((path) => {
		if (path.route.id) {
			currentPage.set(path.url.pathname);
		}
		if (path.url.pathname == '/') {
			home.set(true);
		} else {
			home.set(false);
		}
	});

	filePath.subscribe(async (path) => {
		watcher = await watchImmediate(path, { recursive: true }, async (event) => {
			console.log(event);
			invalidateAll();
		});
	});

	afterNavigate((params: any) => {
		const isNewPage: boolean =
			params.from && params.to && params.from.route.id !== params.to.route.id;
		const elemPage = document.querySelector('#page');
		if (isNewPage && elemPage !== null) {
			elemPage.scrollTop = 0;
		}
	});

	function setColorScheme() {
		if (
			localStorage.getItem('storeLightSwitch') === 'true' ||
			(!('storeLightSwitch' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	function setBodyThemeAttribute(): void {
		document.body.setAttribute('data-theme', $storeTheme);
	}
</script>

<svelte:head>
	{@html `\<style\>${themes[$storeTheme]}}\</style\>`}
	{#if currentLo}
		<title>{$currentLo?.title}</title>
	{:else}
		<title>Tutors Course Reader</title>
	{/if}
</svelte:head>

<div id="app" class="h-full overflow-hidden">
	<Sidebars />
	<AppShell class="h-screen">
		<svelte:fragment slot="header">
			{#if !$home}
				<NavBar />
				<PageHeader />
			{/if}
		</svelte:fragment>
		<div id="top" />
		<div class="mx-auto my-4">
			<slot />
		</div>
	</AppShell>
</div>
