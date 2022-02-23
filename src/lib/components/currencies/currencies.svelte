<script lang="ts">
	import { browser } from "$app/env";
	import { page } from "$app/stores";

	import i18n from "$lib/i18n.js";
	import list from "./list.js";
	import Input from "$lib/components/input.svelte";
	import FromTo from "$lib/components/from-to.svelte";
	import Grid from "$lib/components/grid.svelte";
	import Result from "$lib/components/result.svelte";
	import Multiplier from "$lib/components/multiplier.svelte";
	import DirectionToggle from "$lib/components/direction-toggle.svelte";
	import Button from "$lib/components/button.svelte";
	import SupportedUnits from "$lib/components/supported-units.svelte";

	const sortedCurrencies = list.sort((a, b) => {
		if (a.id > b.id) return 1;
		if (a.id < b.id) return -1;
		return 0;
	});
	const supportedCurrencies = sortedCurrencies.filter((currency) => currency.api);
	const supportedCurrencyIds = supportedCurrencies.map((currency) => currency.id);
	const unsupportedCurrencies = sortedCurrencies.filter((currency) => !currency.api);
	const unsupportedCurrencyIds = unsupportedCurrencies.map((currency) => currency.id);

	let fromPlaceholder = "e.g. EUR";
	let toPlaceholder = "e.g. USD";
	let shouldUpdateHistory = false;

	const initialFromCurrency = $page.url.searchParams.get("from[currency]")
		? decodeURIComponent($page.url.searchParams.get("from[currency]"))
		: null;
	const initialFromAmount = $page.url.searchParams.get("from[amount]")
		? decodeURIComponent($page.url.searchParams.get("from[amount]"))
		: "1.0";
	const from: {
		currency: string | null;
		amount: string;
		shouldValidateCurrency: boolean;
		shouldValidateAmount: boolean;
	} = {
		currency: initialFromCurrency,
		amount: initialFromAmount,
		shouldValidateCurrency: initialFromCurrency ? true : false,
		shouldValidateAmount: initialFromAmount ? true : false,
	};

	const initialToCurrency = $page.url.searchParams.get("to[currency]")
		? decodeURIComponent($page.url.searchParams.get("to[currency]"))
		: null;
	const to = {
		currency: initialToCurrency,
		shouldValidateCurrency: initialToCurrency ? true : false,
	};

	const data = $page.stuff.data
		? {
				[from.currency]: $page.stuff.data,
		  }
		: {};

	$: {
		if (browser && shouldUpdateHistory) {
			history.replaceState(
				null,
				null,
				`?from[currency]=${from.currency || ""}&from[amount]=${from.amount || ""}&to[currency]=${
					to.currency || ""
				}`
			);
		}

		shouldUpdateHistory = true;
	}

	$: fromCurrencyIsValid = supportedCurrencyIds.includes(from.currency);
	$: fromAmountIsValid = !Number.isNaN(parseFloat(from.amount));
	$: toCurrencyIsValid = supportedCurrencyIds.includes(to.currency);
	$: convertedAmount =
		fromCurrencyIsValid &&
		fromAmountIsValid &&
		toCurrencyIsValid &&
		data[from.currency] &&
		data[from.currency][to.currency]
			? (parseFloat(from.amount) * data[from.currency][to.currency]).toFixed(2)
			: "-";

	function toggleDirection() {
		const oldFrom = from.currency;

		from.currency = to.currency;
		to.currency = oldFrom;

		if (supportedCurrencyIds.includes(from.currency)) {
			fetchCurrencies(from.currency);
		}
	}

	async function onFromCurrencySelect({ detail }) {
		from.currency = detail.toUpperCase();

		if (supportedCurrencyIds.includes(from.currency)) {
			fetchCurrencies(from.currency);
		}

		from.shouldValidateCurrency = false;
	}

	function onFromCurrencyChange() {
		from.shouldValidateCurrency = true;
	}

	function onToCurrencySelect({ detail }) {
		to.currency = detail.toUpperCase();
		to.shouldValidateCurrency = false;
	}

	function onToCurrencyChange() {
		to.shouldValidateCurrency = true;
	}

	async function fetchCurrencies(currency: string) {
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
	<svelte:fragment slot="from">
		<Grid wrapSize="14rem">
			<svelte:fragment slot="1">
				<Input
					list="currencyList"
					id="currencies-from_currency"
					name="from[currency]"
					placeholder={fromPlaceholder}
					label={i18n.currencies.labels.currency}
					invalid={from.shouldValidateCurrency && !fromCurrencyIsValid}
					bind:value={from.currency}
					on:input={onFromCurrencySelect}
					on:change={onFromCurrencyChange}
				/>
			</svelte:fragment>
			<svelte:fragment slot="2">
				<Input
					name="from[amount]"
					type="text"
					inputmode="decimal"
					id="currencies-from_amount"
					placeholder="e.g. 12.99"
					label={i18n.currencies.labels.amount}
					invalid={from.shouldValidateAmount && !fromAmountIsValid}
					bind:value={from.amount}
					on:input={({ detail }) => {
						from.amount = detail;
						from.shouldValidateAmount = false;
					}}
					on:change={() => (from.shouldValidateAmount = true)}
				/>
			</svelte:fragment>
		</Grid>
	</svelte:fragment>
	<svelte:fragment slot="divider">
		{#if fromCurrencyIsValid && toCurrencyIsValid}
			{#if data[from.currency] && data[from.currency][to.currency]}
				<Multiplier value={data[from.currency][to.currency].toFixed(4)} />
				<DirectionToggle on:click={toggleDirection} />
			{/if}
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="to">
		<Grid wrapSize="14rem">
			<svelte:fragment slot="1">
				<Input
					name="to[currency]"
					list="currencyList"
					id="currencies-to_currency"
					placeholder={toPlaceholder}
					label={i18n.currencies.labels.currency}
					invalid={to.shouldValidateCurrency && !toCurrencyIsValid}
					bind:value={to.currency}
					on:input={onToCurrencySelect}
					on:change={onToCurrencyChange}
				/>
				<Button />
			</svelte:fragment>
			<svelte:fragment slot="2">
				<Result label={i18n.currencies.labels.amount} result={convertedAmount} highlight={true} />
			</svelte:fragment>
		</Grid>
	</svelte:fragment>
</FromTo>

<SupportedUnits
	supported={supportedCurrencyIds}
	unsupported={unsupportedCurrencyIds}
	title={$page.stuff.title.toLowerCase()}
/>

<datalist id="currencyList">
	{#each supportedCurrencies as currency}
		<option value={currency.id}>{currency.name}</option>
	{/each}
</datalist>
