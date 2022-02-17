<script>
	import { onMount } from "svelte";

	import i18n from "../../i18n.js";
	import list from "./currencies.js";
	import Input from "../input.svelte";
	import FromTo from "../from-to.svelte";
	import Grid from "../grid.svelte";

	let fromPlaceholder = "";
	let toPlaceholder = "";

	const from = {
		currency: null,
		amount: "1.00",
	};

	let to = "";

	const data = {};

	$: convertedAmount =
		from.amount && data[from.currency] && data[from.currency][to]
			? (from.amount * data[from.currency][to]).toFixed(2)
			: "-";

	function toggleDirection() {
		const oldFrom = from.currency;

		from.currency = to;
		to = oldFrom;
	}

	function getRandomCurrency() {
		return list[Math.round(Math.random() * list.length)];
	}

	async function onFromCurrencySelect({ detail }) {
		const currency = detail.toUpperCase();

		if (list.includes(currency)) {
			from.currency = currency;
			fetchCurrencies(currency);
		}
	}

	function onToCurrencySelect({ detail }) {
		const currency = detail.toUpperCase();

		if (list.includes(currency)) {
			to = currency;
			fetchCurrencies(currency);
		}
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
		<Grid>
			<svelte:fragment slot="1">
				<Input
					list="currencyList"
					id="currencies-from_currency"
					placeholder={fromPlaceholder}
					label={i18n.currencies.labels.currency}
					bind:value={from.currency}
					on:input={onFromCurrencySelect}
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
		{#if from.currency && to && data[from.currency] && [to]}
			<button type="button" class="ToggleDirection" on:click={toggleDirection}
				>{i18n.changeDirection}
				<span class="ToggleDirection-arrow ToggleDirection-arrow--horizontal" aria-hidden="true"
					>⇄</span
				>
				<span class="ToggleDirection-arrow ToggleDirection-arrow--vertical" aria-hidden="true"
					>⇅</span
				>
			</button>

			<div class="Multiplier">
				&times; {data[from.currency][to].toFixed(4)}
			</div>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="to">
		<Grid>
			<svelte:fragment slot="1">
				<Input
					list="currencyList"
					id="currencies-to_currency"
					placeholder={toPlaceholder}
					label={i18n.currencies.labels.currency}
					bind:value={to}
					on:input={onToCurrencySelect}
				/>
			</svelte:fragment>
			<svelte:fragment slot="2">
				<Input
					type="text"
					id="currencies-to_amount"
					label={i18n.currencies.labels.amount}
					readonly
					tabindex="-1"
					value={convertedAmount}
				/>
			</svelte:fragment>
		</Grid>
	</svelte:fragment>
</FromTo>

<datalist id="currencyList">
	{#each list as currency}
		<option value={currency} />
	{/each}
</datalist>

<style>
	.Multiplier {
		font-weight: 800;
	}

	.ToggleDirection {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.ToggleDirection:hover {
		cursor: pointer;
	}
	@media (max-width: 56em) {
		.Multiplier {
			font-size: 2.4rem;
		}

		.ToggleDirection-arrow--horizontal {
			display: none;
		}
	}

	@media (min-width: 56.0625em) {
		.Multiplier {
			font-size: 3.2rem;
			white-space: nowrap;
		}

		.ToggleDirection {
			margin-block-start: 2rem;
		}

		.ToggleDirection-arrow--vertical {
			display: none;
		}
	}
</style>
