<script>
	import { page } from '$app/stores';
	import BigNumber from 'bignumber.js';
	import Big from 'big.js';

	import { ingredients } from './lookup/index.js';

	import i18n from '$lib/i18n.js';
	import Grid from '$lib/components/grid.svelte';
	import FromTo from '$lib/components/from-to.svelte';
	import Input from '$lib/components/input.svelte';
	import Result from '$lib/components/result.svelte';
	import Multiplier from '$lib/components/multiplier.svelte';
	import Button from '$lib/components/button.svelte';

	const { names, conversions } = ingredients;
	const alias = 'ingredients';

	const initialFromUnit = $page.url.searchParams.get(`${alias}[from][ingredient]`)
		? decodeURIComponent($page.url.searchParams.get(`${alias}[from][ingredient]`))
		: '';
	const initialFromValue = $page.url.searchParams.get(`${alias}[from][amount]`)
		? decodeURIComponent($page.url.searchParams.get(`${alias}[from][amount]`))
		: null;
	const stateFrom = $state({
		unit: initialFromUnit,
		shouldValidateUnit: initialFromUnit ? true : false,
		value: initialFromValue,
		shouldValidateValue: initialFromValue ? true : false
	});

	const units = Object.entries(names).map((entry) => ({
		value: entry[0],
		label: `${entry[1]}: ${entry[0]}`
	}));
	const unitValues = units.map((unit) => unit.value);

	function calcResult(fromUnit, fromValue) {
		if (!fromUnit || fromValue === null || !conversions[fromUnit]) return null;
		let value;

		if (conversions[fromUnit]) {
			value = new Big(fromValue).times(new Big(conversions[fromUnit])).toString();
		}

		return value;
	}

	/**
	 * @param {string|number} result
	 * @param {number} roundResults
	 */
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
	let result = $derived(
		fromValueIsValid && stateFrom.unit
			? calcResult(stateFrom.unit, parseFloat(stateFrom.value))
			: null
	);
	let rawResult = $derived(getFormattedResult(result, false) || '-');
	let useExponential = $derived(shouldUseExponential(result, rawResult, false));
</script>

<FromTo action={`#${alias}`}>
	{#snippet from()}
		<input type="hidden" name="type" value={alias} />
		<Grid>
			{#snippet one()}
				<Input
					name={`${alias}[from][ingredient]`}
					label={i18n.cooking.ingredients.labels.ingredient}
					id={`${alias}-from-unit`}
					placeholder={i18n.cooking.ingredients.placeholders.ingredient}
					options={[
						{
							value: 'flour',
							label: 'Flour (all-purpose)'
						},
						{
							value: 'sugar_granulated',
							label: 'Sugar (granulated)'
						},
						{
							value: 'sugar_packed',
							label: 'Sugar (packed)'
						},
						{
							value: 'sugar_powdered',
							label: 'Sugar (powdered)'
						},
						{
							value: 'cocoa',
							label: 'Cocoa powder'
						},
						{
							value: 'rice',
							label: 'Rice (uncooked)'
						},
						{
							value: 'salt',
							label: 'Salt'
						},
						{
							value: 'margarine',
							label: 'Margarine'
						},
						{
							value: 'butter',
							label: 'Butter'
						}
					]}
					invalid={stateFrom.shouldValidateUnit && !fromUnitIsValid}
					bind:value={stateFrom.unit}
					change={(value) => {
						stateFrom.unit = value;
						stateFrom.shouldValidateUnit = value.length > 0 ? true : false;
					}}
				/>
			{/snippet}
			{#snippet two()}
				<Input
					name={`${alias}[from][amount]`}
					type="text"
					inputmode="decimal"
					id={`${alias}-from-value`}
					placeholder={i18n.cooking.ingredients.placeholders.amount}
					label={i18n.cooking.ingredients.labels.amount}
					value={stateFrom.value}
					invalid={stateFrom.shouldValidateValue && !fromValueIsValid}
					input={(value) => {
						stateFrom.shouldValidateValue = false;
						stateFrom.value = value;
					}}
					change={() => {
						stateFrom.shouldValidateValue = true;
					}}
				/>
			{/snippet}
		</Grid>
		<Button />
	{/snippet}
	{#snippet divider()}
		{#if stateFrom.unit}
			{#if conversions[stateFrom.unit] && conversions[stateFrom.unit] && typeof conversions[stateFrom.unit] !== 'function'}
				<Multiplier value={new BigNumber(conversions[stateFrom.unit]).toFormat()} />
			{/if}
		{/if}
	{/snippet}
	{#snippet to()}
		<Grid>
			{#snippet one()}
				<Result
					wrap={true}
					label={i18n.cooking.ingredients.labels.result}
					result={(useExponential ? result : rawResult).toString()}
					raw={useExponential ? rawResult : null}
					highlight={true}
				/>
			{/snippet}
			{#snippet two()}{/snippet}
		</Grid>
	{/snippet}
</FromTo>

<datalist id={`${alias}-list`}>
	{#each units as unit}
		<option value={unit.value}>{unit.label}</option>
	{/each}
</datalist>
