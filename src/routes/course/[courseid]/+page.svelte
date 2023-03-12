<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { CardDeck, UnitCard } from '../../../packages/tutors-ui';
	import { page } from '$app/stores';
	import { Buffer } from 'buffer';
	import { currentCourse } from '../../../packages/tutors-reader-lib/src/stores/stores';

	export let data: PageData;

	let standardDeck = true;
	let pinBuffer = '';
	let ignorePin = '';
	let isMobile: boolean = false;

	function keypressInput(e: { key: string }) {
		pinBuffer = pinBuffer.concat(e.key);
		if (pinBuffer === ignorePin) {
			data.course.showAllLos();
			data.course.standardLos = data.course.allLos;
			standardDeck = false;
		}
	}

	if (
		['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(
			navigator.platform
		) ||
		(navigator.userAgent.includes('Mac') && 'ontouchend' in document) ||
		navigator.userAgent.includes('Mobile')
	) {
		isMobile = true;
	}

	onMount(async () => {
		if (data.course.lo.properties.ignorepin) {
			ignorePin = data.course.lo.properties.ignorepin.toString();
			window.addEventListener('keydown', keypressInput);
		}
	});

	const currentUrl = $page.url.toString().slice(0, $page.url.toString().indexOf('course'));

	const manifest = {
		name: $currentCourse.lo.title,
		short_name: $currentCourse.lo.title,
		id: $currentCourse.lo.title,
		icons: [
			{
				src: 'https://reader.tutors.dev/icons/icon-48x48.png',
				sizes: '48x48',
				type: 'image/png',
				purpose: 'maskable any'
			},
			{
				src: 'https://reader.tutors.dev/icons/icon-72x72.png',
				sizes: '72x72',
				type: 'image/png',
				purpose: 'maskable any'
			},
			{
				src: 'https://reader.tutors.dev/icons/icon-96x96.png',
				sizes: '96x96',
				type: 'image/png',
				purpose: 'maskable any'
			},
			{
				src: 'https://reader.tutors.dev/icons/icon-128x128.png',
				sizes: '128x128',
				type: 'image/png',
				purpose: 'maskable any'
			},
			{
				src: 'https://reader.tutors.dev/icons/icon-144x144.png',
				sizes: '144x144',
				type: 'image/png',
				purpose: 'maskable any'
			},
			{
				src: 'https://reader.tutors.dev/icons/icon-152x152.png',
				sizes: '152x152',
				type: 'image/png',
				purpose: 'maskable any'
			},
			{
				src: 'https://reader.tutors.dev/icons/icon-192x192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'maskable any'
			},
			{
				src: 'https://reader.tutors.dev/icons/icon-384x384.png',
				sizes: '384x384',
				type: 'image/png',
				purpose: 'maskable any'
			},
			{
				src: 'https://reader.tutors.dev/icons/icon-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable any'
			}
		],
		theme_color: '#37919b',
		background_color: '#121317',
		display: 'standalone',
		scope: currentUrl,
		start_url: $page.url
	};
	const manifestString = Buffer.from(JSON.stringify(manifest), 'utf8').toString('base64');
</script>

<svelte:head>
	{#if manifestString}
		<link rel="manifest" href="data:application/manifest+json;base64,{manifestString}" />
		<meta name="theme-color" content="#37919b" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	{/if}
</svelte:head>

{#each data.course.units as unit}
	<UnitCard {unit} />
{/each}
{#if standardDeck}
	<CardDeck los={data.course.standardLos} border />
{:else}
	<CardDeck los={data.course.allLos} border />
{/if}
