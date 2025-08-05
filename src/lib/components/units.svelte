<script>
	// import { replaceState } from '$app/navigation';
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

	/**
	 * @typedef {Object} Props
	 * @property {any} alias
	 * @property {any} [names]
	 * @property {any} [abbr]
	 * @property {any} [conversions]
	 * @property {boolean} [roundResults]
	 * @property {any} pageName
	 */

	/** @type {Props} */
	let {
		alias,
		names = {},
		abbr = null,
		conversions = {},
		roundResults = false,
		pageName
	} = $props();

	const initialFromUnit = $page.url.searchParams.get(`${alias}[from][unit]`)
		? decodeURIComponent($page.url.searchParams.get(`${alias}[from][unit]`))
		: '';
	const initialFromValue = $page.url.searchParams.get(`${alias}[from][value]`)
		? decodeURIComponent($page.url.searchParams.get(`${alias}[from][value]`))
		: null;
	const stateFrom = $state({
		unit: initialFromUnit,
		shouldValidateUnit: initialFromUnit ? true : false,
		value: initialFromValue,
		shouldValidateValue: initialFromValue ? true : false
	});

	const initialToUnit = $page.url.searchParams.get(`${alias}[to][unit]`)
		? decodeURIComponent($page.url.searchParams.get(`${alias}[to][unit]`))
		: '';
	const stateTo = $state({
		unit: initialToUnit,
		shouldValidateUnit: initialToUnit ? true : false
	});

	const units = Object.entries(names).map((entry) => ({
		value: entry[0],
		label: `${entry[1]}${abbr ? ` (${abbr[entry[0]]})` : ''}`
	}));
	const unitValues = units.map((unit) => unit.value);

	function toggleDirection() {
		const oldFrom = stateFrom.unit;

		stateFrom.unit = stateTo.unit;
		stateTo.unit = oldFrom;
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
	let fromUnitIsValid = $derived(unitValues.includes(stateFrom.unit));
	let fromValueIsValid = $derived(!Number.isNaN(parseFloat(stateFrom.value)));
	let toUnitIsValid = $derived(unitValues.includes(stateTo.unit));
	let result = $derived(
		fromValueIsValid && stateFrom.unit && stateTo.unit
			? calcResult(stateFrom.unit, parseFloat(stateFrom.value), stateTo.unit)
			: null
	);
	let rawResult = $derived(getFormattedResult(result, roundResults) || '-');
	let useExponential = $derived(shouldUseExponential(result, rawResult, roundResults));
</script>

<FromTo action={`#${alias}`}>
	{#snippet from()}
		<input type="hidden" name="type" value={alias} />
		<Grid>
			{#snippet one()}
				<Input
					name={`${alias}[from][unit]`}
					label={i18n[pageName].labels.unit}
					id={`${alias}-from-unit`}
					options={units}
					invalid={stateFrom.shouldValidateUnit && !fromUnitIsValid}
					bind:value={stateFrom.unit}
					change={(unitValue) => {
						stateFrom.unit = unitValue;
						stateFrom.shouldValidateUnit = true;

						if (units.length === 2) {
							stateTo.unit = units.find((unit) => unit.value != unitValue).value;
						}
					}}
				/>
			{/snippet}
			{#snippet two()}
				<Input
					name={`${alias}[from][value]`}
					type="text"
					inputmode="decimal"
					id={`${alias}-from-value`}
					placeholder={i18n[pageName][alias].placeholders.value}
					label={i18n[pageName].labels.value}
					value={stateFrom.value}
					invalid={stateFrom.shouldValidateValue && !fromValueIsValid}
					input={(value) => {
						stateFrom.value = value;
						stateFrom.shouldValidateValue = false;
					}}
					change={() => {
						stateFrom.shouldValidateValue = true;
					}}
				/>
			{/snippet}
		</Grid>
	{/snippet}
	{#snippet divider()}
		{#if stateFrom.unit && stateTo.unit}
			{#if conversions[stateFrom.unit] && conversions[stateFrom.unit][stateTo.unit] && typeof conversions[stateFrom.unit][stateTo.unit] !== 'function'}
				<Multiplier value={new BigNumber(conversions[stateFrom.unit][stateTo.unit]).toFormat()} />
			{/if}
			<DirectionToggle on:click={toggleDirection} />
		{/if}
	{/snippet}
	{#snippet to()}
		<Grid>
			{#snippet one()}
				<Input
					name={`${alias}[to][unit]`}
					label={i18n[pageName].labels.unit}
					id={`${alias}-to-unit`}
					options={units}
					invalid={stateTo.shouldValidateUnit && !toUnitIsValid}
					bind:value={stateTo.unit}
					change={(unit) => {
						stateTo.unit = unit;
						stateTo.shouldValidateUnit = true;
					}}
				/>
				<Button />
			{/snippet}
			{#snippet two()}
				<Result
					wrap={true}
					label={i18n[pageName].labels.value}
					result={(useExponential ? result : rawResult).toString()}
					raw={useExponential ? rawResult : null}
					highlight={true}
				/>
			{/snippet}
		</Grid>
	{/snippet}
</FromTo>
