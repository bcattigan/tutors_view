<script lang="ts">
	import type { PageData } from './$types';
	import { VideoCard, TopicNavigatorCard } from '../../../../packages/tutors-ui';
	export let data: PageData;
</script>

{#key data}
	{#if data.lo}
		<div class="min-h-screen flex w-11/12 mx-auto">
			<div class="w-full">
				{#key data.lo}
					<VideoCard lo={data.lo} autoplay={true} />
				{/key}
			</div>
			<div class="hidden md:block">
				<TopicNavigatorCard topic={data.lo.parent} />
			</div>
		</div>
	{/if}
{/key}
