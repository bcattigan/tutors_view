<script lang="ts">
	import { currentCourse } from '../../packages/tutors-reader-lib/src/stores/stores';
	import { NavTitle } from '../../packages/tutors-ui';
	import { Icon } from '../../packages/tutors-ui';
	import { AppBar, drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
	import LayoutMenu from './LayoutMenu.svelte';

	const infoDrawerOpen: any = () => {
		const settings: DrawerSettings = { id: 'info', position: 'left' };
		drawerStore.open(settings);
	};
	const calendarDrawerOpen: any = () => {
		const settings: DrawerSettings = { id: 'calendar', position: 'left' };
		drawerStore.open(settings);
	};
	const tocDrawerOpen: any = () => {
		const settings: DrawerSettings = { id: 'toc', position: 'right' };
		drawerStore.open(settings);
	};
  
</script>

<AppBar class="space-x-1 lg:space-x-4 shadow-none border-b-[1px] border-surface-200-700-token">
	<svelte:fragment slot="lead">
		<div class="flex items-center">
			{#if $currentCourse?.lo.contentMd}
				<button class="btn btn-sm" on:click={infoDrawerOpen}>
					<Icon type="courseinfo" />
				</button>
			{/if}
			<NavTitle />
		</div>
	</svelte:fragment>
	{#if $currentCourse?.currentWeek}
		<div class="hidden w-full lg:flex">
			<button
				class="mx-auto inline-flex rounded-lg variant-soft-primary p-2"
				on:click={calendarDrawerOpen}
			>
				<span class="my-auto pl-2 pr-4">
					<Icon type="calendar" />
				</span>
				<span class="divider-vertical h-12 hidden lg:flex my-auto" />
				<span class="px-2">
					<span class="pt-1 text-sm">Current Week</span><br />
					<span class="text-lg pb-1 font-bold">{$currentCourse.currentWeek.title}</span>
				</span>
			</button>
		</div>
	{/if}
	<svelte:fragment slot="trail">
		<div class="flex items-center space-x-1 lg:space-x-4">
			<LayoutMenu />
			<button class="btn btn-sm" on:click={tocDrawerOpen}>
				<Icon type="toc" />
			</button>
		</div>
	</svelte:fragment>
</AppBar>
