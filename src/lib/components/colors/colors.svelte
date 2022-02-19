<script lang="ts">
	import { onMount } from "svelte";

	import htmlNames from "./html-names.js";
	import i18n from "$lib/i18n.js";
	import FromTo from "$lib/components/from-to.svelte";
	import Input from "$lib/components/input.svelte";
	import w3color from "./w3color.js";

	let color = "";
	let bgColor = "";

	$: types = [
		{
			label: "HTML Name",
			value: htmlName,
		},
		{
			label: "RGB",
			value: rgb,
		},
		{
			label: "RGBA",
			value: rgba,
		},
		{
			label: "Hex",
			value: hex,
		},
		{
			label: "HSL",
			value: hsl,
		},
		{
			label: "HSLA",
			value: hsla,
		},
		{
			label: "HWB",
			value: hwb,
		},
		{
			label: "CMYK",
			value: cmyk,
		},
	];

	$: colorAsHex = color && isValid ? w3color(color).toHexString() : "";
	$: isValid = isValidColor(color);
	$: matchesBackground = colorMatchesBackground(result, w3color(bgColor));
	$: result = isValid ? w3color(color) : null;
	$: htmlName = result ? (result.opacity === 1 ? result.toName() || "-" : "-") : "-";
	$: rgb = result ? (result.opacity === 1 ? result.toRgbString() : "-") : "-";
	$: rgba = result ? result.toRgbaString() : "-";
	$: hex = result ? (result.opacity === 1 ? result.toHexString() : "-") : "-";
	$: hsl = result ? (result.opacity === 1 ? result.toHslString() : "-") : "-";
	$: hsla = result ? result.toHslaString() : "-";
	$: hwb = result ? result.toHwbString() : "-";
	$: cmyk = result ? (result.opacity === 1 ? result.toCmykString() : "-") : "-";

	onMount(() => {
		bgColor = window.getComputedStyle(document.documentElement).getPropertyValue("--color-box-bg");
	});

	function isValidColor(color: string) {
		const result = w3color(color);

		if (color == "" || !result.valid) {
			return false;
		}

		return true;
	}

	function colorMatchesBackground(selectedColor: object, backgroundColor: object) {
		if (!selectedColor || !backgroundColor) return;

		const matches = ["red", "green", "blue"].map((color) => {
			const diff = selectedColor[color] - backgroundColor[color];

			return diff >= -20 && diff <= 20;
		});

		return matches.every((entry) => entry === true);
	}

	function onInput(e: Event) {
		const target = e.target as HTMLInputElement;
		color = target.value;
	}
</script>

<FromTo flex1="0 0 25rem">
	<svelte:fragment slot="from">
		<div class="ColorInput">
			<Input
				id="color-from-string"
				placeholder={i18n.colors.placeholder}
				label="Color string"
				list="htmlNames"
				bind:value={color}
				on:input={({ detail }) => (color = detail)}
			/>
		</div>
		<p class="ColorInputDivider">or</p>
		<div class="ColorInput">
			<Input id="color-from-picker" label="Color picker" viaSlot={true}>
				<span class="ColorPicker" class:matches-background={matchesBackground} style:color={rgba}>
					<input
						class="u-hiddenVisually"
						id="color-from-picker"
						type="color"
						bind:value={colorAsHex}
						on:input={onInput}
					/>
					AaBbCc
				</span>
			</Input>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="to">
		<dl class="Values">
			{#each types as { label, value }}
				<div class="Values-entry">
					<dt class="Values-label">{label}</dt>
					<dd>{value}</dd>
				</div>
			{/each}
		</dl>
	</svelte:fragment>
</FromTo>

<datalist id="htmlNames">
	{#each htmlNames as name}
		<option value={name} />
	{/each}
</datalist>

<style>
	.Values {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
	}

	.Values-entry {
		padding-block: 1rem;
	}

	.Values-label {
		font-weight: 800;
		color: var(--color-accent);
	}

	.ColorInputDivider {
		margin-block: 2rem;
	}

	.ColorPicker {
		display: flex;
		gap: 0.25em;
		align-items: center;
		font-size: 3.6rem;
		font-weight: 800;
		line-height: 1;
		margin-block-start: 1rem;
		cursor: pointer;
		color: var(--color-copy);
		transition: text-shadow 0.5s ease;
	}

	.ColorPicker.matches-background {
		text-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.5);
	}

	.ColorPicker::before {
		content: "";
		display: block;
		height: 1em;
		width: 1em;
		background: currentColor;
		transition: box-shadow 0.5s ease;
	}

	.ColorPicker.matches-background::before {
		box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.5);
	}
</style>
