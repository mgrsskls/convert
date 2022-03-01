<script lang="ts">
	import { page } from "$app/stores";

	import i18n from "$lib/i18n.js";
	import { liquids, temperatures, volumes, weights } from "./lookup/index.js";

	import Accordion from "$lib/components/accordion.svelte";
	import Section from "../units.svelte";
	import Ingredients from "./ingredients.svelte";

	let open = $page.url.searchParams.get("type");

	const pageName = "cooking";
</script>

<Accordion open={open === "ingredients"} id="ingredients">
	<svelte:fragment slot="title">{@html i18n.cooking.ingredients.title}</svelte:fragment>
	<svelte:fragment slot="content">
		<Ingredients />
	</svelte:fragment>
</Accordion>

<Accordion open={open === "liquids"} id="liquids">
	<svelte:fragment slot="title">{@html i18n.cooking.liquids.title}</svelte:fragment>
	<svelte:fragment slot="content">
		<Section names={liquids.names} conversions={liquids.conversions} alias="liquids" {pageName} />
	</svelte:fragment>
</Accordion>

<Accordion open={open === "temperatures"} id="temperatures">
	<svelte:fragment slot="title">{@html i18n.cooking.temperatures.title}</svelte:fragment>
	<svelte:fragment slot="content">
		<Section
			names={Object.fromEntries(
				Object.entries(temperatures.names).filter((entry) => entry[0] != "K")
			)}
			conversions={temperatures.conversions}
			alias="temperatures"
			{pageName}
		/>
	</svelte:fragment>
</Accordion>

<Accordion open={open === "volumes"} id="volumes">
	<svelte:fragment slot="title">{@html i18n.cooking.volumes.title}</svelte:fragment>
	<svelte:fragment slot="content">
		<Section names={volumes.names} conversions={volumes.conversions} alias="volumes" {pageName} />
	</svelte:fragment>
</Accordion>

<Accordion open={open === "weights"} id="weights">
	<svelte:fragment slot="title">{@html i18n.cooking.weights.title}</svelte:fragment>
	<svelte:fragment slot="content">
		<Section names={weights.names} conversions={weights.conversions} alias="weights" {pageName} />
	</svelte:fragment>
</Accordion>
