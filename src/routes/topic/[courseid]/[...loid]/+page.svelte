<script lang="ts">
	import type { PageData } from './$types';
	import { UnitCard, VideoCard } from '../../../../packages/tutors-ui';
	import Topic from './topic.svelte';
	export let data: PageData;
</script>

{#key data}
{#each data.topic.panelVideos as lo}
	<VideoCard {lo} />
{/each}
{#if data.topic.sideBar.length > 0}
	<div class="block md:flex w-11/12 mx-auto">
		<div class="w-full">
			<Topic topic={data.topic} />
		</div>
		<div class="block w-full md:w-[30rem] md:ml-2">
			{#each data.topic.sideBar as unit}
				<UnitCard {unit} />
			{/each}
		</div>
	</div>
{:else}
	<div class="w-11/12 mx-auto">
		<Topic topic={data.topic} />
	</div>
{/if}
{/key}