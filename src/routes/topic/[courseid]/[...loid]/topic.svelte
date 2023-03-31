<script lang="ts">
	import type { Topic } from '../../../../packages/tutors-reader-lib/src/models/topic';
	import { CardDeck, UnitCard, TalkCard } from '../../../../packages/tutors-ui';
	export let topic: Topic;
</script>

{#key topic}
{#each topic.panelTalks as lo}
	<TalkCard {lo} />
{/each}
{#each topic.units as unit}
	<UnitCard {unit} />
{/each}
<CardDeck los={topic.standardLos} border />
{/key}