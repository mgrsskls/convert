<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import BigNumber from 'bignumber.js';
	import Big from 'big.js';

	import i18n from '$lib/i18n.js';
	import Grid from '$lib/components/grid.svelte';
	import FromTo from '$lib/components/from-to.svelte';
	import Input from '$lib/components/input.svelte';
	import Result from '$lib/components/result.svelte';
	import Multiplier from '$lib/components/multiplier.svelte';
	import DirectionToggle from '$lib/components/direction-toggle.svelte';
	import Button from '$lib/components/button.svelte';

	export let alias;
	export let names = {};
	export let abbr = null;
	export let conversions = {};
	export let roundResults = false;
	export let pageName;

	let shouldUpdateHistory = false;

	const initialFromUnit = $page.url.searchParams.get(`${alias}[from][unit]`)
		? decodeURIComponent($page.url.searchParams.get(`${alias}[from][unit]`))
		: '';
	const initialFromValue = $page.url.searchParams.get(`${alias}[from][value]`)
		? decodeURIComponent($page.url.searchParams.get(`${alias}[from][value]`))
		: null;
	const from = {
		unit: initialFromUnit,
		shouldValidateUnit: initialFromUnit ? true : false,
		value: initialFromValue,
		shouldValidateValue: initialFromValue ? true : false
	};

	const initialToUnit = $page.url.searchParams.get(`${alias}[to][unit]`)
		? decodeURIComponent($page.url.searchParams.get(`${alias}[to][unit]`))
		: '';
	const to = {
		unit: initialToUnit,
		shouldValidateUnit: initialToUnit ? true : false
	};

	const units = Object.entries(names).map((entry) => ({
		value: entry[0],
		label: `${entry[1]}${abbr ? ` (${abbr[entry[0]]})` : ''}`
	}));
	const unitValues = units.map((unit) => unit.value);

	$: {
		if (browser && shouldUpdateHistory) {
			history.replaceState(
				null,
				null,
				`?type=${alias}&${alias}[from][unit]=${from.unit || ''}&${alias}[from][value]=${
					from.value || ''
				}&${alias}[to][unit]=${to.unit || ''}`
			);
		}

		shouldUpdateHistory = true;
	}

	$: fromUnitIsValid = unitValues.includes(from.unit);
	$: fromValueIsValid = !Number.isNaN(parseFloat(from.value));
	$: toUnitIsValid = unitValues.includes(to.unit);
	$: result =
		fromValueIsValid && from.unit && to.unit
			? calcResult(from.unit, parseFloat(from.value), to.unit)
			: null;
	$: useExponential = shouldUseExponential(result, rawResult, roundResults);
	$: rawResult = getFormattedResult(result, roundResults) || '-';

	function toggleDirection() {
		const oldFrom = from.unit;

		from.unit = to.unit;
		to.unit = oldFrom;
	}

	function calcResult(fromUnit, fromValue, toUnit) {
		if (
			!fromUnit ||
			fromValue === null ||
			!toUnit ||
			!conversions[fromUnit] ||
			!conversions[fromUnit][toUnit]
		)
			return null;

		let value;

		if (fromUnit === toUnit) {
			value = fromValue;
		} else if (conversions[fromUnit]) {
			if (typeof conversions[fromUnit][toUnit] === 'function') {
				value = conversions[fromUnit][toUnit](fromValue);
			} else {
				value = new Big(fromValue).times(new Big(conversions[fromUnit][toUnit])).toString();
			}
		}

		return value;
	}

	function getFormattedResult(result, roundResults) {
		if (!['string', 'number'].includes(typeof result)) return null;

		return roundResults && typeof roundResults === 'number'
			? new BigNumber(result).toFormat(roundResults)
			: new BigNumber(result).toFormat();
	}

	function shouldUseExponential(result, formatted, roundResults) {
		if (!result) return false;

		if (result >= 1000000000000000000000) return true;

		if (!roundResults) {
			const arr = formatted.toString().split('.');
			return arr.length === 2 && ['0', '-0'].includes(arr[0]) && arr[1].startsWith('000000');
		}

		return false;
	}
</script>

<FromTo action={`#${alias}`}>
	<svelte:fragment slot="from">
		<input type="hidden" name="type" value={alias} />
		<Grid>
			<svelte:fragment slot="1">
				<Input
					name={`${alias}[from][unit]`}
					label={i18n[pageName].labels.unit}
					id={`${alias}-from-unit`}
					options={units}
					invalid={from.shouldValidateUnit && !fromUnitIsValid}
					bind:value={from.unit}
					on:change={({ detail }) => {
						from.unit = detail;
						from.shouldValidateUnit = true;

						if (units.length === 2) {
							to.unit = units.find((unit) => unit.value != detail).value;
						}
					}}
				/>
			</svelte:fragment>
			<svelte:fragment slot="2">
				<Input
					name={`${alias}[from][value]`}
					type="text"
					inputmode="decimal"
					id={`${alias}-from-value`}
					placeholder={i18n[pageName][alias].placeholders.value}
					label={i18n[pageName].labels.value}
					value={from.value}
					invalid={from.shouldValidateValue && !fromValueIsValid}
					on:input={({ detail }) => {
						from.value = detail;
						from.shouldValidateValue = false;
					}}
					on:change={() => {
						from.shouldValidateValue = true;
					}}
				/>
			</svelte:fragment>
		</Grid>
	</svelte:fragment>
	<svelte:fragment slot="divider">
		{#if from.unit && to.unit}
			{#if conversions[from.unit] && conversions[from.unit][to.unit] && typeof conversions[from.unit][to.unit] !== 'function'}
				<Multiplier value={new BigNumber(conversions[from.unit][to.unit]).toFormat()} />
			{/if}
			<DirectionToggle on:click={toggleDirection} />
		{/if}
	</svelte:fragment><svelte:fragment />
	<svelte:fragment slot="to">
		<Grid>
			<svelte:fragment slot="1">
				<Input
					name={`${alias}[to][unit]`}
					label={i18n[pageName].labels.unit}
					id={`${alias}-to-unit`}
					options={units}
					invalid={to.shouldValidateUnit && !toUnitIsValid}
					bind:value={to.unit}
					on:change={({ detail }) => {
						to.unit = detail;
						to.shouldValidateUnit = true;
					}}
				/>
				<Button />
			</svelte:fragment>
			<svelte:fragment slot="2">
				<Result
					wrap={true}
					label={i18n[pageName].labels.value}
					result={(useExponential ? result : rawResult).toString()}
					raw={useExponential ? rawResult : null}
					highlight={true}
				/>
			</svelte:fragment>
		</Grid>
	</svelte:fragment>
</FromTo>
