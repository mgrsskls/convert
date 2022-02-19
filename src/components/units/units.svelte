<script>
	import { page } from "$app/stores";
	import i18n from "../../i18n.js";
	import { areas, lengths, masses, speeds, temperatures, volumes } from "./lookup/index.js";

	import Accordion from "../Accordion.svelte";
	import Section from "./section.svelte";

	const open = $page.url.searchParams.get("type");
</script>

<Accordion open={open === "areas"}>
	<svelte:fragment slot="title">{i18n.units.areas.title}</svelte:fragment>
	<svelte:fragment slot="content">
		<Section names={areas.names} abbr={i18n.units.areas.abbr} conversions={areas.conversions} />
	</svelte:fragment>
</Accordion>

<Accordion open={open === "lengths"}>
	<svelte:fragment slot="title">{i18n.units.lengths.title}</svelte:fragment>
	<svelte:fragment slot="content">
		<Section names={lengths.names} conversions={lengths.conversions} />
	</svelte:fragment>
</Accordion>

<Accordion open={open === "masses"}>
	<svelte:fragment slot="title">{i18n.units.masses.title}</svelte:fragment>
	<svelte:fragment slot="content">
		<Section names={masses.names} conversions={masses.conversions} />
	</svelte:fragment>
</Accordion>

<Accordion open={open === "speeds"}>
	<svelte:fragment slot="title">{i18n.units.speeds.title}</svelte:fragment>
	<svelte:fragment slot="content">
		<Section names={speeds.names} abbr={i18n.units.speeds.abbr} conversions={speeds.conversions} />
	</svelte:fragment>
</Accordion>

<Accordion open={open === "temperatures"}>
	<svelte:fragment slot="title">{i18n.units.temperatures.title}</svelte:fragment>
	<svelte:fragment slot="content">
		<Section
			names={temperatures.names}
			abbr={i18n.units.temperatures.abbr}
			conversions={temperatures.conversions}
			roundResults={1}
		/>
	</svelte:fragment>
</Accordion>

<Accordion open={open === "volumes"}>
	<svelte:fragment slot="title">{i18n.units.volumes.title}</svelte:fragment>
	<svelte:fragment slot="content">
		<Section
			names={volumes.names}
			abbr={i18n.units.volumes.abbr}
			conversions={volumes.conversions}
		/>
	</svelte:fragment>
</Accordion>
