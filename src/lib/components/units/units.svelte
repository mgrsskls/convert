<script>
	import { page } from '$app/stores';

	import i18n from '$lib/i18n.js';
	import { areas, lengths, masses, speeds, temperatures, volumes } from './lookup/index.js';

	import Accordion from '$lib/components/accordion.svelte';
	import Section from '../units.svelte';

	let open = $page.url.searchParams.get('type');

	const pageName = 'units';
</script>

<Accordion open={open === 'areas'} id="areas">
	{#snippet title()}
		{@html i18n.units.areas.title}
	{/snippet}
	{#snippet content()}
		<Section
			names={areas.names}
			abbr={i18n.units.areas.abbr}
			conversions={areas.conversions}
			alias="areas"
			{pageName}
		/>
	{/snippet}
</Accordion>

<Accordion open={open === 'lengths'} id="lengths">
	{#snippet title()}
		{@html i18n.units.lengths.title}
	{/snippet}
	{#snippet content()}
		<Section names={lengths.names} conversions={lengths.conversions} alias="lengths" {pageName} />
	{/snippet}
</Accordion>

<Accordion open={open === 'masses'} id="masses">
	{#snippet title()}
		{@html i18n.units.masses.title}
	{/snippet}
	{#snippet content()}
		<Section names={masses.names} conversions={masses.conversions} alias="masses" {pageName} />
	{/snippet}
</Accordion>

<Accordion open={open === 'speeds'} id="speeds">
	{#snippet title()}
		{@html i18n.units.speeds.title}
	{/snippet}
	{#snippet content()}
		<Section
			names={speeds.names}
			abbr={i18n.units.speeds.abbr}
			conversions={speeds.conversions}
			alias="speeds"
			{pageName}
		/>
	{/snippet}
</Accordion>

<Accordion open={open === 'temperatures'} id="temperatures">
	{#snippet title()}
		{@html i18n.units.temperatures.title}
	{/snippet}
	{#snippet content()}
		<Section
			names={temperatures.names}
			abbr={i18n.units.temperatures.abbr}
			conversions={temperatures.conversions}
			roundResults={2}
			alias="temperatures"
			{pageName}
		/>
	{/snippet}
</Accordion>

<Accordion open={open === 'volumes'} id="volumes">
	{#snippet title()}
		{@html i18n.units.volumes.title}
	{/snippet}
	{#snippet content()}
		<Section
			names={volumes.names}
			abbr={i18n.units.volumes.abbr}
			conversions={volumes.conversions}
			alias="volumes"
			{pageName}
		/>
	{/snippet}
</Accordion>
