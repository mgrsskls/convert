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
	<svelte:fragment slot="title">{@html i18n.units.areas.title}</svelte:fragment>
	<svelte:fragment slot="content">
		<Section
			names={areas.names}
			abbr={i18n.units.areas.abbr}
			conversions={areas.conversions}
			alias="areas"
			{pageName}
		/>
	</svelte:fragment>
</Accordion>

<Accordion open={open === 'lengths'} id="lengths">
	<svelte:fragment slot="title">{@html i18n.units.lengths.title}</svelte:fragment>
	<svelte:fragment slot="content">
		<Section names={lengths.names} conversions={lengths.conversions} alias="lengths" {pageName} />
	</svelte:fragment>
</Accordion>

<Accordion open={open === 'masses'} id="masses">
	<svelte:fragment slot="title">{@html i18n.units.masses.title}</svelte:fragment>
	<svelte:fragment slot="content">
		<Section names={masses.names} conversions={masses.conversions} alias="masses" {pageName} />
	</svelte:fragment>
</Accordion>

<Accordion open={open === 'speeds'} id="speeds">
	<svelte:fragment slot="title">{@html i18n.units.speeds.title}</svelte:fragment>
	<svelte:fragment slot="content">
		<Section
			names={speeds.names}
			abbr={i18n.units.speeds.abbr}
			conversions={speeds.conversions}
			alias="speeds"
			{pageName}
		/>
	</svelte:fragment>
</Accordion>

<Accordion open={open === 'temperatures'} id="temperatures">
	<svelte:fragment slot="title">{@html i18n.units.temperatures.title}</svelte:fragment>
	<svelte:fragment slot="content">
		<Section
			names={temperatures.names}
			abbr={i18n.units.temperatures.abbr}
			conversions={temperatures.conversions}
			roundResults={2}
			alias="temperatures"
			{pageName}
		/>
	</svelte:fragment>
</Accordion>

<Accordion open={open === 'volumes'} id="volumes">
	<svelte:fragment slot="title">{@html i18n.units.volumes.title}</svelte:fragment>
	<svelte:fragment slot="content">
		<Section
			names={volumes.names}
			abbr={i18n.units.volumes.abbr}
			conversions={volumes.conversions}
			alias="volumes"
			{pageName}
		/>
	</svelte:fragment>
</Accordion>
