<script lang="ts">
	import { page } from "$app/stores";
	import BigNumber from "bignumber.js";

	import i18n from "$lib/i18n.js";
	import Grid from "$lib/components/grid.svelte";
	import FromTo from "$lib/components/from-to.svelte";
	import Input from "$lib/components/input.svelte";
	import Result from "$lib/components/result.svelte";
	import Multiplier from "$lib/components/multiplier.svelte";
	import DirectionToggle from "$lib/components/direction-toggle.svelte";
	import Button from "$lib/components/button.svelte";

	export let alias: string;
	export let names: object = {};
	export let abbr: object | null = null;
	export let conversions: object = {};
	export let roundResults: boolean | number = false;

	const from = {
		unit: $page.url.searchParams.get("from[unit]")
			? decodeURIComponent($page.url.searchParams.get("from[unit]"))
			: "",
		value: $page.url.searchParams.get("from[value]")
			? parseInt(decodeURIComponent($page.url.searchParams.get("from[value]")), 10)
			: null,
	};

	const to = {
		unit: $page.url.searchParams.get("to[unit]")
			? decodeURIComponent($page.url.searchParams.get("to[unit]"))
			: "",
	};

	const units = Object.entries(names).map((entry) => ({
		value: entry[0],
		label: `${entry[1]} (${abbr ? abbr[entry[0]] : entry[0]})`,
	}));

	$: result =
		from.unit && from.value && to.unit ? calcResult(from.unit, from.value, to.unit) : null;
	$: formattedResult = formatResult(result);

	function toggleDirection() {
		const oldFrom = from.unit;

		from.unit = to.unit;
		to.unit = oldFrom;
	}

	function calcResult(fromUnit: string, fromValue: number, toUnit: string) {
		if (!fromUnit || !fromValue || !toUnit) return null;

		let value: number;

		if (fromUnit === toUnit) {
			value = fromValue;
		} else if (conversions[fromUnit]) {
			if (typeof conversions[fromUnit][toUnit] === "function") {
				value = conversions[fromUnit][toUnit](fromValue);
			} else {
				value = fromValue * conversions[fromUnit][toUnit];
			}
		}

		return value;
	}

	function formatResult(result: number) {
		if (!result) return "-";

		const formatted =
			roundResults && typeof roundResults === "number"
				? new BigNumber(result).toFormat(roundResults)
				: new BigNumber(result).toFormat();

		if (shouldUseExponential(result, roundResults, formatted)) {
			return `${result.toExponential()}<br><small>${formatted}</small>`;
		}

		return formatted;
	}

	function shouldUseExponential(result: number, roundResults: boolean | number, formatted: string) {
		if (result >= 1000000000000000000000) return true;

		if (!roundResults) {
			const arr = formatted.toString().split(".");
			return arr.length === 2 && arr[0] === "0" && arr[1].startsWith("00000");
		}

		return false;
	}
</script>

<FromTo action={`#${alias}`}>
	<svelte:fragment slot="from">
		<input type="hidden" name="type" value={alias} />
		<Grid wrap={false}>
			<svelte:fragment slot="1">
				<Input
					name="from[unit]"
					label={i18n.units.labels.unit}
					id={`${alias}-from-value`}
					options={units}
					bind:value={from.unit}
					on:change={({ detail }) => (from.unit = detail)}
				/>
			</svelte:fragment>
			<svelte:fragment slot="2">
				<Input
					name="from[value]"
					type="number"
					id={`${alias}-from-unit`}
					placeholder={i18n.units.placeholders.lengths}
					label={i18n.units.labels.value}
					value={from.value}
					on:input={({ detail }) => (from.value = detail)}
				/>
			</svelte:fragment>
		</Grid>
	</svelte:fragment>
	<svelte:fragment slot="divider">
		{#if from.unit && to.unit}
			<DirectionToggle on:click={toggleDirection} />
			{#if conversions[from.unit] && conversions[from.unit][to.unit] && typeof conversions[from.unit][to.unit] !== "function"}
				<Multiplier value={conversions[from.unit][to.unit]} />
			{/if}
		{/if}
	</svelte:fragment><svelte:fragment />
	<svelte:fragment slot="to">
		<Grid wrap={false}>
			<svelte:fragment slot="1">
				<Input
					name="to[unit]"
					label={i18n.units.labels.unit}
					id={`${alias}-to-value`}
					options={units}
					bind:value={to.unit}
					on:change={({ detail }) => (to.unit = detail)}
				/>
				<Button />
			</svelte:fragment>
			<svelte:fragment slot="2">
				<Result
					wrap={true}
					label={i18n.units.labels.value}
					result={formattedResult}
					highlight={true}
				/>
			</svelte:fragment>
		</Grid>
	</svelte:fragment>
</FromTo>
