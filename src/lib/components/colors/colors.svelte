<script lang="ts">
	import { browser } from "$app/env";
	import { page } from "$app/stores";
	import { onMount } from "svelte";

	import htmlNames from "./html-names.js";
	import i18n from "$lib/i18n.js";
	import FromTo from "$lib/components/from-to.svelte";
	import Input from "$lib/components/input.svelte";
	import Button from "$lib/components/button.svelte";
	import w3color from "./w3color.js";

	let color = getColorFromSearchParam() || "";
	let bgColor = "";
	let shouldValidate = color ? true : false;

	const lowercaseHtmlNames = htmlNames.map((name) => name.toLowerCase());

	interface w3colorResult {
		valid: boolean;
	}

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

	$: {
		if (browser) {
			history.replaceState(null, null, `?string=${color}`);
		}
	}

	$: w3colorResult = w3color(fixedColor);
	$: fixedColor = ["RGB", "RGBA"].includes(colorSpace) ? rgbOrRgbaWithNamespace : color;
	$: colorSpace = color ? getColorSpace(color) : "-";
	$: rgbOrRgbaWithNamespace = ["RGB", "RGBA"].includes(colorSpace)
		? wrapRgbWithoutPrefix(color)
		: color;
	$: colorAsHex = color && isValid ? w3colorResult.toHexString() : "";
	$: isValid = isValidColor(w3colorResult, color);
	$: matchesBackground = colorMatchesBackground(result, w3color(bgColor));
	$: result = isValid ? w3colorResult : null;
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

	function wrapRgbWithoutPrefix(color: string) {
		if (!color) return color;

		const lowercase = color.toLowerCase().trim();

		if (lowercase.startsWith("rgb(") || lowercase.startsWith("rgba(")) return color;

		const parts = getRgbOrRgbaParts(color.trim());

		return parts.length > 3 ? `rgba(${parts.join(",")})` : `rgb(${parts.join(",")})`;
	}

	function getColorSpace(color: string) {
		const lowercase = color.toLowerCase().trim();

		if (lowercase.startsWith("rgba")) return "RGBA";
		if (lowercase.startsWith("rgb")) return "RGB";
		if (lowercase.startsWith("hsla")) return "HSLA";
		if (lowercase.startsWith("hsl")) return "HSL";
		if (lowercase.startsWith("hwb")) return "HWB";
		if (lowercase.startsWith("cmyk")) return "CMYK";
		if (lowercase.startsWith("#")) return "Hex";
		if (lowercaseHtmlNames.filter((name) => name.startsWith(lowercase)).length > 0) return "HTML";

		const isRgbOrRgba = isRgbOrRgbaWithoutExplicitNamespace(color);

		if (isRgbOrRgba) return getRgbOrRgbaParts(color).length >= 4 ? "RGBA" : "RGB";

		return "-";
	}

	function isRgbOrRgbaWithoutExplicitNamespace(color: string) {
		const regex = /^([0-9.]*[0-9]+)$/;
		const parts = getRgbOrRgbaParts(color);

		if (parts.every((str) => regex.test(str))) return true;

		return false;
	}

	function getRgbOrRgbaParts(color: string) {
		const trimmedColor = color.trim();
		const separators = [",", " "];

		for (let i = 0; i < separators.length; i += 1) {
			const split = trimmedColor
				.split(separators[i])
				.map((str) => str.trim())
				.filter((str) => str !== "" && str !== ",");

			if (split.length > 1) return split;
		}

		return [];
	}

	function getColorFromSearchParam() {
		if ($page.url.searchParams.get("string")) {
			return decodeURIComponent($page.url.searchParams.get("string"));
		}

		if ($page.url.searchParams.get("picker")) {
			return decodeURIComponent($page.url.searchParams.get("picker"));
		}

		return null;
	}

	function isValidColor(w3colorResult: w3colorResult, color: string) {
		if (color == "" || !w3colorResult.valid) {
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
				name="string"
				invalid={shouldValidate && color.length > 0 && !isValid}
				bind:value={color}
				on:input={({ detail }) => {
					shouldValidate = false;
					color = detail;
				}}
				on:change={() => {
					shouldValidate = true;
				}}
			/>
			<dl class="ColorSpace">
				<dt>{i18n.colors.colorSpace}</dt>
				<dd>{colorSpace}</dd>
			</dl>
		</div>
		<p class="ColorInputDivider">or</p>
		<div class="ColorInput">
			<Input id="color-from-picker" label="Color picker" viaSlot={true}>
				<span class="ColorPicker" class:matches-background={matchesBackground} style:color={rgba}>
					<input
						name="picker"
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
		<Button />
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
	.ColorSpace {
		color: var(--color-copy-light);
		margin-block-start: 1rem;
		font-size: 0.875em;
		display: flex;
	}

	.ColorSpace dt::after {
		display: inline;
		content: ":";
		padding-inline-end: 0.5em;
	}

	.ColorSpace dd {
		font-weight: 800;
	}

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
