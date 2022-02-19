<script>
	import BigNumber from "bignumber.js";

	import i18n from "../../i18n.js";
	import Grid from "../grid.svelte";
	import FromTo from "../from-to.svelte";
	import Input from "../input.svelte";
	import Result from "../result.svelte";
	import Multiplier from "../multiplier.svelte";
	import DirectionToggle from "../direction-toggle.svelte";

	export let names = {};
	export let abbr;
	export let conversions = {};
	export let roundResults = false;

	const from = {
		unit: "",
		value: null,
	};

	const to = {
		unit: "",
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

	function calcResult(fromUnit, fromValue, toUnit) {
		if (!fromUnit || !fromValue || !toUnit) return null;

		let value;

		if (fromUnit === toUnit) {
			value = fromValue;
		} else {
			if (typeof conversions[fromUnit][toUnit] === "function") {
				value = conversions[fromUnit][toUnit](fromValue);
			} else {
				value = fromValue * conversions[fromUnit][toUnit];
			}
		}

		return value;
	}

	function formatResult(result) {
		if (!result) return "-";

		const formatted = roundResults
			? new BigNumber(result).toFormat(roundResults)
			: new BigNumber(result).toFormat();

		if (shouldUseExponential(result, roundResults, formatted)) {
			return `${result.toExponential()}<br><small>${formatted}</small>`;
		}

		return formatted;
	}

	function shouldUseExponential(result, roundResults, formatted) {
		if (result >= 1000000000000000000000) return true;

		if (!roundResults) {
			const arr = formatted.toString().split(".");
			return arr.length === 2 && arr[0] === "0" && arr[1].startsWith("00000");
		}

		return false;
	}
</script>

<FromTo>
	<svelte:fragment slot="from">
		<Grid wrap={false}>
			<svelte:fragment slot="1">
				<Input
					label={i18n.units.labels.unit}
					id="lengths-from-value"
					options={units}
					bind:value={from.unit}
					on:change={({ detail }) => (from.unit = detail)}
				/>
			</svelte:fragment>
			<svelte:fragment slot="2">
				<Input
					type="number"
					placeholder={i18n.units.placeholders.lengths}
					label={i18n.units.labels.value}
					value={from.value}
					on:input={({ detail }) => (from.value = detail)}
				/>
			</svelte:fragment>
		</Grid>
	</svelte:fragment>
	<svelte:fragment slot="divider">
		{#if from.unit && from.value && to.unit}
			<DirectionToggle on:click={toggleDirection} />
			{#if conversions[from.unit][to.unit] && typeof conversions[from.unit][to.unit] !== "function"}
				<Multiplier value={conversions[from.unit][to.unit]} />
			{/if}
		{/if}
	</svelte:fragment><svelte:fragment />
	<svelte:fragment slot="to">
		<Grid wrap={false}>
			<svelte:fragment slot="1">
				<Input
					label={i18n.units.labels.unit}
					id="lengths-from-value"
					options={units}
					bind:value={to.unit}
					on:change={({ detail }) => (to.unit = detail)}
				/>
			</svelte:fragment>
			<svelte:fragment slot="2">
				<Result wrap={true} label={i18n.units.labels.value} result={formattedResult} />
			</svelte:fragment>
		</Grid>
	</svelte:fragment>
</FromTo>
