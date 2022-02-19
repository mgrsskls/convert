<script>
	import { onMount } from "svelte";

	import i18n from "../../i18n.js";
	import list from "./list.js";
	import Input from "../input.svelte";
	import FromTo from "../from-to.svelte";
	import Grid from "../grid.svelte";
	import Result from "../result.svelte";
	import Multiplier from "../multiplier.svelte";
	import DirectionToggle from "../direction-toggle.svelte";

	const sortedCurrencies = list.sort((a, b) => {
		if (a.id > b.id) return 1;
		if (a.id < b.id) return -1;
		return 0;
	});
	const supportedCurrencies = sortedCurrencies.filter((currency) => currency.api);
	const supportedCurrencyIds = supportedCurrencies.map((currency) => currency.id);
	const unsupportedCurrencies = sortedCurrencies.filter((currency) => !currency.api);
	const unsupportedCurrencyIds = unsupportedCurrencies.map((currency) => currency.id);

	let fromPlaceholder = "";
	let toPlaceholder = "";

	const from = {
		currency: null,
		amount: "1.00",
		invalid: false,
	};

	const to = {
		currency: null,
		invalid: false,
	};

	const data = {};

	$: convertedAmount =
		from.amount && data[from.currency] && data[from.currency][to.currency]
			? (from.amount * data[from.currency][to.currency]).toFixed(2)
			: "-";

	function toggleDirection() {
		const oldFrom = from.currency;

		from.currency = to.currency;
		to.currency = oldFrom;
	}

	function getRandomCurrency() {
		return supportedCurrencyIds[Math.round(Math.random() * supportedCurrencyIds.length)];
	}

	async function onFromCurrencySelect({ detail }) {
		const currency = detail.toUpperCase();

		from.invalid = false;

		if (supportedCurrencyIds.includes(currency)) {
			from.currency = currency;
			fetchCurrencies(currency);
		}
	}

	function onFromCurrencyChange({ detail }) {
		from.invalid = !supportedCurrencyIds.includes(detail);
	}

	function onToCurrencySelect({ detail }) {
		const currency = detail.toUpperCase();

		to.invalid = false;

		if (supportedCurrencyIds.includes(currency)) {
			to.currency = currency;
			fetchCurrencies(currency);
		}
	}

	function onToCurrencyChange({ detail }) {
		to.invalid = !supportedCurrencyIds.includes(detail);
	}

	async function fetchCurrencies(currency) {
		try {
			if (!data[currency]) {
				const response = await fetch(
					`${
						import.meta.env.VITE_BACKEND_HOST || ""
					}/.netlify/functions/currencies?currency=${currency}`
				);
				const json = await response.json();

				data[currency] = json;
			}
		} catch (e) {
			console.error(e);
		}
	}

	onMount(() => {
		fromPlaceholder = `e.g. ${getRandomCurrency()}`;
		toPlaceholder = `e.g. ${getRandomCurrency()}`;
	});
</script>

<FromTo>
	<svelte:fragment slot="from">
		<Grid wrap={false}>
			<svelte:fragment slot="1">
				<Input
					list="currencyList"
					id="currencies-from_currency"
					placeholder={fromPlaceholder}
					label={i18n.currencies.labels.currency}
					invalid={from.invalid}
					bind:value={from.currency}
					on:input={onFromCurrencySelect}
					on:change={onFromCurrencyChange}
				/>
			</svelte:fragment>
			<svelte:fragment slot="2">
				<Input
					type="number"
					step="0.01"
					id="currencies-from_amount"
					placeholder="e.g. 12.99"
					label={i18n.currencies.labels.amount}
					bind:value={from.amount}
					on:input={({ detail }) => (from.amount = detail)}
				/>
			</svelte:fragment>
		</Grid>
	</svelte:fragment>
	<svelte:fragment slot="divider">
		{#if !from.invalid && !to.invalid}
			{#if from.currency && to.currency && data[from.currency] && [to.currency]}
				<DirectionToggle on:click={toggleDirection} />
				<Multiplier value={data[from.currency][to.currency].toFixed(4)} />
			{/if}
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="to">
		<Grid wrap={false}>
			<svelte:fragment slot="1">
				<Input
					list="currencyList"
					id="currencies-to_currency"
					placeholder={toPlaceholder}
					label={i18n.currencies.labels.currency}
					invalid={to.invalid}
					bind:value={to.currency}
					on:input={onToCurrencySelect}
					on:change={onToCurrencyChange}
				/>
			</svelte:fragment>
			<svelte:fragment slot="2">
				<Result label={i18n.currencies.labels.amount} result={convertedAmount} />
			</svelte:fragment>
		</Grid>
	</svelte:fragment>
</FromTo>

<div class="CurrencySupport">
	<h3 class="CurrencySupport-title">{i18n.currencies.supported}</h3>
	<ul class="CurrencySupport-list">
		{#each supportedCurrencyIds as currency}
			<li class="CurrencySupport-currency">{currency}</li>
		{/each}
	</ul>
	<h3 class="CurrencySupport-title">{i18n.currencies.unsupported}</h3>
	<ul class="CurrencySupport-list">
		{#each unsupportedCurrencyIds as currency}
			<li class="CurrencySupport-currency">{currency}</li>
		{/each}
	</ul>
</div>

<datalist id="currencyList">
	{#each supportedCurrencies as currency}
		<option value={currency.id}>{currency.name}</option>
	{/each}
</datalist>

<style>
	.CurrencySupport {
		color: var(--color-copy-light);
		font-size: 0.75em;
		margin-block-start: 4rem;
	}

	.CurrencySupport-title {
		font-weight: bold;
	}

	.CurrencySupport-list {
		display: flex;
		flex-wrap: wrap;
	}

	.CurrencySupport-list + .CurrencySupport-title {
		margin-block-start: 2rem;
	}

	.CurrencySupport-currency {
		list-style-type: none;
	}

	.CurrencySupport-currency:not(:last-child) {
		padding-inline-end: 0.5ch;
	}

	.CurrencySupport-currency:not(:last-child)::after {
		content: ",";
	}
</style>
