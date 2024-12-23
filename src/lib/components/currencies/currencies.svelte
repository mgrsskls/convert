<script>
	import { page } from '$app/stores';

	import i18n from '$lib/i18n.js';
	import list from './list.js';
	import Input from '$lib/components/input.svelte';
	import FromTo from '$lib/components/from-to.svelte';
	import Grid from '$lib/components/grid.svelte';
	import Result from '$lib/components/result.svelte';
	import Multiplier from '$lib/components/multiplier.svelte';
	import DirectionToggle from '$lib/components/direction-toggle.svelte';
	import Button from '$lib/components/button.svelte';
	import SupportedUnits from '$lib/components/supported-units.svelte';

	const sortedCurrencies = list.sort((a, b) => {
		if (a.id > b.id) return 1;
		if (a.id < b.id) return -1;
		return 0;
	});
	const supportedCurrencies = sortedCurrencies.filter((currency) => currency.api);
	const supportedCurrencyIds = supportedCurrencies.map((currency) => currency.id);
	const unsupportedCurrencies = sortedCurrencies.filter((currency) => !currency.api);
	const unsupportedCurrencyIds = unsupportedCurrencies.map((currency) => currency.id);

	let fromPlaceholder = 'e.g. EUR';
	let toPlaceholder = 'e.g. USD';

	const initialFromCurrency = $page.url.searchParams.get('from[currency]')
		? decodeURIComponent($page.url.searchParams.get('from[currency]'))
		: null;
	const initialFromAmount = $page.url.searchParams.get('from[amount]')
		? decodeURIComponent($page.url.searchParams.get('from[amount]'))
		: '1.0';
	const stateFrom = $state({
		currency: initialFromCurrency,
		amount: initialFromAmount,
		shouldValidateCurrency: initialFromCurrency ? true : false,
		shouldValidateAmount: initialFromAmount ? true : false
	});

	const initialToCurrency = $page.url.searchParams.get('to[currency]')
		? decodeURIComponent($page.url.searchParams.get('to[currency]'))
		: null;
	const stateTo = $state({
		currency: initialToCurrency,
		shouldValidateCurrency: initialToCurrency ? true : false
	});

	const data = $state(
		$page.data.result
			? {
					[stateFrom.currency]: $page.data.result
				}
			: {}
	);

	let fromCurrencyIsValid = $derived(supportedCurrencyIds.includes(stateFrom.currency));
	let fromAmountIsValid = $derived(!Number.isNaN(parseFloat(stateFrom.amount)));
	let toCurrencyIsValid = $derived(supportedCurrencyIds.includes(stateTo.currency));
	let convertedAmount = $derived(
		fromCurrencyIsValid &&
			fromAmountIsValid &&
			toCurrencyIsValid &&
			data[stateFrom.currency] &&
			data[stateFrom.currency][stateTo.currency]
			? (parseFloat(stateFrom.amount) * data[stateFrom.currency][stateTo.currency].value).toFixed(2)
			: '-'
	);

	function toggleDirection() {
		const oldFrom = stateFrom.currency;

		stateFrom.currency = stateTo.currency;
		stateTo.currency = oldFrom;

		if (supportedCurrencyIds.includes(stateFrom.currency)) {
			fetchCurrencies(stateFrom.currency);
		}
	}

	async function onFromCurrencySelect({ detail }) {
		stateFrom.currency = detail.toUpperCase();

		if (supportedCurrencyIds.includes(stateFrom.currency)) {
			fetchCurrencies(stateFrom.currency);
		}

		stateFrom.shouldValidateCurrency = false;
	}

	function onFromCurrencyChange() {
		stateFrom.shouldValidateCurrency = true;
	}

	function onToCurrencySelect({ detail }) {
		stateTo.currency = detail.toUpperCase();
		stateTo.shouldValidateCurrency = false;
	}

	function onToCurrencyChange() {
		stateTo.shouldValidateCurrency = true;
	}

	async function fetchCurrencies(currency) {
		try {
			if (!data[currency]) {
				const response = await fetch(`/currencies/rates?currency=${currency}`);
				const json = await response.json();

				data[currency] = json;
			}
		} catch (e) {
			console.error(e);
		}
	}
</script>

<FromTo>
	{#snippet from()}
		<Grid>
			{#snippet one()}
				<Input
					list="currencyList"
					id="currencies-from_currency"
					name="from[currency]"
					placeholder={fromPlaceholder}
					label={i18n.currencies.labels.currency}
					invalid={stateFrom.shouldValidateCurrency && !fromCurrencyIsValid}
					bind:value={stateFrom.currency}
					on:input={onFromCurrencySelect}
					on:change={onFromCurrencyChange}
				/>
			{/snippet}
			{#snippet two()}
				<Input
					name="from[amount]"
					type="text"
					inputmode="decimal"
					id="currencies-from_amount"
					placeholder="e.g. 12.99"
					label={i18n.currencies.labels.amount}
					invalid={stateFrom.shouldValidateAmount && !fromAmountIsValid}
					bind:value={stateFrom.amount}
					on:input={({ detail }) => {
						stateFrom.amount = detail;
						stateFrom.shouldValidateAmount = false;
					}}
					on:change={() => (stateFrom.shouldValidateAmount = true)}
				/>
			{/snippet}
		</Grid>
	{/snippet}
	{#snippet divider()}
		{#if fromCurrencyIsValid && toCurrencyIsValid}
			{#if data[stateFrom.currency] && data[stateFrom.currency][stateTo.currency]}
				<Multiplier value={data[stateFrom.currency][stateTo.currency].value.toFixed(4)} />
				<DirectionToggle on:click={toggleDirection} />
			{/if}
		{/if}
	{/snippet}
	{#snippet to()}
		<Grid>
			{#snippet one()}
				<Input
					name="to[currency]"
					list="currencyList"
					id="currencies-to_currency"
					placeholder={toPlaceholder}
					label={i18n.currencies.labels.currency}
					invalid={stateTo.shouldValidateCurrency && !toCurrencyIsValid}
					bind:value={stateTo.currency}
					on:input={onToCurrencySelect}
					on:change={onToCurrencyChange}
				/>
				<Button />
			{/snippet}
			{#snippet two()}
				<Result label={i18n.currencies.labels.amount} result={convertedAmount} highlight={true} />
			{/snippet}
		</Grid>
	{/snippet}
</FromTo>

<SupportedUnits
	supported={supportedCurrencyIds}
	unsupported={unsupportedCurrencyIds}
	title={$page.data.title.toLowerCase()}
/>

<p>
	<small
		>Currency conversion rates are updated daily via <a
			href="https://www.currencyapi.com/"
			target="_blank"
			rel="noopener noreferrer">https://www.currencyapi.com/</a
		>.</small
	>
</p>

<datalist id="currencyList">
	{#each supportedCurrencies as currency}
		<option value={currency.id}>{currency.name}</option>
	{/each}
</datalist>

<style>
	p {
		margin-block-start: 2rem;
	}

	small {
		color: var(--color-copy-light);
		font-size: 1.2rem;
	}
</style>
