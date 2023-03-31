<script lang="ts">
	import type { PageData } from './$types';
	import { TopicNavigatorCard, TalkCard } from '../../../../packages/tutors-ui';
	export let data: PageData;
</script>

{#key data}
{#if data.lo}
	<div class="flex w-11/12 mx-auto">
		<div class="w-full">
			{#key data.lo}
				<TalkCard lo={data.lo} />
			{/key}
		</div>
		<div class="hidden md:block">
			<TopicNavigatorCard topic={data.lo.parent} />
		</div>
	</div>
{/if}
{/key}