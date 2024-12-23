<script>
	import { page } from '$app/stores';

	import i18n from '$lib/i18n.js';
	import { liquids, temperatures, volumes, weights } from './lookup/index.js';

	import Accordion from '$lib/components/accordion.svelte';
	import Section from '../units.svelte';
	import Ingredients from './ingredients.svelte';

	let open = $page.url.searchParams.get('type');

	const pageName = 'cooking';
</script>

<Accordion open={open === 'ingredients'} id="ingredients">
	{#snippet title()}
		{@html i18n.cooking.ingredients.title}
	{/snippet}
	{#snippet content()}
		<Ingredients />
	{/snippet}
</Accordion>

<Accordion open={open === 'liquids'} id="liquids">
	{#snippet title()}
		{@html i18n.cooking.liquids.title}
	{/snippet}
	{#snippet content()}
		<Section names={liquids.names} conversions={liquids.conversions} alias="liquids" {pageName} />
	{/snippet}
</Accordion>

<Accordion open={open === 'temperatures'} id="temperatures">
	{#snippet title()}
		{@html i18n.cooking.temperatures.title}
	{/snippet}
	{#snippet content()}
		<Section
			names={Object.fromEntries(
				Object.entries(temperatures.names).filter((entry) => entry[0] != 'K')
			)}
			conversions={temperatures.conversions}
			alias="temperatures"
			{pageName}
		/>
	{/snippet}
</Accordion>

<Accordion open={open === 'volumes'} id="volumes">
	{#snippet title()}
		{@html i18n.cooking.volumes.title}
	{/snippet}
	{#snippet content()}
		<Section names={volumes.names} conversions={volumes.conversions} alias="volumes" {pageName} />
	{/snippet}
</Accordion>

<Accordion open={open === 'weights'} id="weights">
	{#snippet title()}
		{@html i18n.cooking.weights.title}
	{/snippet}
	{#snippet content()}
		<Section names={weights.names} conversions={weights.conversions} alias="weights" {pageName} />
	{/snippet}
</Accordion>
