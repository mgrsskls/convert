<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import htmlNames from './html-names.js';
	import i18n from '$lib/i18n.js';
	import FromTo from '$lib/components/from-to.svelte';
	import Input from '$lib/components/input.svelte';
	import Button from '$lib/components/button.svelte';
	import Result from '$lib/components/result.svelte';
	import SupportedUnits from '$lib/components/supported-units.svelte';
	import w3color from './w3color.js';

	const initialStringColor = $page.url.searchParams.get('string')
		? decodeURIComponent($page.url.searchParams.get('string'))
		: '';

	const initialPickerColor = $page.url.searchParams.get('picker')
		? decodeURIComponent($page.url.searchParams.get('picker'))
		: '';

	let color = initialStringColor || initialPickerColor || '';

	let colorFromString = initialStringColor;
	let colorFromPicker = initialPickerColor;
	let shouldValidate = color ? true : false;
	let shouldUpdateHistory = false;
	let bgColor = '';

	const lowercaseHtmlNames = htmlNames.map((name) => name.toLowerCase());

	$: types = [
		{
			label: 'HTML Name',
			value: htmlName
		},
		{
			label: 'RGB',
			value: rgb
		},
		{
			label: 'RGBA',
			value: rgba
		},
		{
			label: 'Hex',
			value: hex
		},
		{
			label: 'HSL',
			value: hsl
		},
		{
			label: 'HSLA',
			value: hsla
		},
		{
			label: 'HWB',
			value: hwb
		},
		{
			label: 'CMYK',
			value: cmyk
		}
	];

	$: {
		if (browser && shouldUpdateHistory) {
			history.replaceState(
				null,
				'',
				`?string=${encodeURIComponent(colorFromString)}&picker=${encodeURIComponent(
					colorFromPicker
				)}`
			);
		}

		shouldUpdateHistory = true;
	}

	$: color = colorFromString || colorFromPicker;
	$: w3colorResult = new w3color(fixedColor);
	$: fixedColor = ['RGB', 'RGBA'].includes(colorSpace) ? rgbOrRgbaWithNamespace : color;
	$: colorSpace = color ? getColorSpace(color) : '-';
	$: rgbOrRgbaWithNamespace = ['RGB', 'RGBA'].includes(colorSpace)
		? wrapRgbWithoutPrefix(color)
		: color;
	$: isValid = isValidColor(w3colorResult, color);
	$: matchesBackground = colorMatchesBackground(result, new w3color(bgColor));
	$: result = isValid ? w3colorResult : null;
	$: htmlName = result ? (result.opacity === 1 ? result.toName() || '-' : '-') : '-';
	$: rgb = result ? (result.opacity === 1 ? result.toRgbString() : '-') : '-';
	$: rgba = result ? result.toRgbaString() : '-';
	$: hex = result ? (result.opacity === 1 ? result.toHexString() : '-') : '-';
	$: hsl = result ? (result.opacity === 1 ? result.toHslString() : '-') : '-';
	$: hsla = result ? result.toHslaString() : '-';
	$: hwb = result ? result.toHwbString() : '-';
	$: cmyk = result ? (result.opacity === 1 ? result.toCmykString() : '-') : '-';

	onMount(() => {
		bgColor = window.getComputedStyle(document.documentElement).getPropertyValue('--color-bg');
	});

	/**
	 * @param {string} color
	 */
	function wrapRgbWithoutPrefix(color) {
		if (!color) return color;

		const lowercase = color.toLowerCase().trim();

		if (lowercase.startsWith('rgb(') || lowercase.startsWith('rgba(')) return color;

		const parts = getRgbOrRgbaParts(color.trim());

		return parts.length > 3 ? `rgba(${parts.join(',')})` : `rgb(${parts.join(',')})`;
	}

	/**
	 * @param {string} color
	 */
	function getColorSpace(color) {
		const lowercase = color.toLowerCase().trim();

		if (lowercase.startsWith('rgba')) return 'RGBA';
		if (lowercase.startsWith('rgb')) return 'RGB';
		if (lowercase.startsWith('hsla')) return 'HSLA';
		if (lowercase.startsWith('hsl')) return 'HSL';
		if (lowercase.startsWith('hwb')) return 'HWB';
		if (lowercase.startsWith('cmyk')) return 'CMYK';
		if (lowercase.startsWith('#')) return 'Hex';
		if (lowercaseHtmlNames.filter((name) => name.startsWith(lowercase)).length > 0) return 'HTML';

		const isRgbOrRgba = isRgbOrRgbaWithoutExplicitNamespace(color);

		if (isRgbOrRgba) return getRgbOrRgbaParts(color).length >= 4 ? 'RGBA' : 'RGB';

		return '-';
	}

	/**
	 * @param {string} color
	 */
	function isRgbOrRgbaWithoutExplicitNamespace(color) {
		const regex = /^([0-9.]*[0-9]+)$/;
		const parts = getRgbOrRgbaParts(color);

		if (parts.every((str) => regex.test(str))) return true;

		return false;
	}

	/**
	 * @param {string} color
	 */
	function getRgbOrRgbaParts(color) {
		const trimmedColor = color.trim();
		const separators = [',', ' ', '/'];

		for (let i = 0; i < separators.length; i += 1) {
			const split = trimmedColor
				.split(separators[i])
				.map((str) => str.trim())
				.filter((str) => str !== '' && str !== ',');

			if (split.length > 1) return split;
		}

		return [];
	}

	/**
	 * @param {object} w3colorResult
	 * @param {boolean} w3colorResult.valid
	 * @param {string} color
	 */
	function isValidColor(w3colorResult, color) {
		if (color == '' || !w3colorResult.valid) {
			return false;
		}

		return true;
	}

	/**
	 * @param {object} selectedColor
	 * @param {object} backgroundColor
	 */
	function colorMatchesBackground(selectedColor, backgroundColor) {
		if (!selectedColor || !backgroundColor) return;

		const matches = ['red', 'green', 'blue'].map((color) => {
			const diff = selectedColor[color] - backgroundColor[color];

			return diff >= -20 && diff <= 20;
		});

		return matches.every((entry) => entry === true);
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
				value={colorFromString}
				on:input={({ detail }) => {
					shouldValidate = false;
					colorFromString = detail;
					colorFromPicker = '';
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
			<Input
				id="color-from-picker"
				label="Color picker"
				type="color"
				required={false}
				bind:value={colorFromPicker}
				on:input={({ detail }) => {
					colorFromString = '';
					colorFromPicker = detail;
				}}
			/>
		</div>
		<Button />
	</svelte:fragment>
	<svelte:fragment slot="divider">
		<span
			class="ColorDisplay"
			class:matches-background={matchesBackground}
			style:color={isValid ? rgba : null}
		>
			AaBbCc
		</span>
	</svelte:fragment>
	<svelte:fragment slot="to">
		<div class="Values">
			{#each types as { label, value }}
				<div class="Values-entry">
					<Result {label} result={value} isCode={true} />
				</div>
			{/each}
		</div>
	</svelte:fragment>
	<svelte:fragment slot="support">
		<SupportedUnits
			title="colors"
			block={true}
			supported={[
				'<b>HTML names</b> like <code>rebeccapurple</code>',
				'<b>RGB</b> like <code>rgb(0,0,0)</code>, <code>rgb(0 0 0)</code>, <code>0,0,0</code>, <code>0/0/0</code>, <code>0 0 0</code>',
				'<b>RGBA</b> like <code>rgb(0,0,0, .5)</code>, <code>rgb(0 0 0 .5)</code>, <code>0,0,0,.5</code>, <code>0/0/0/.5</code>, <code>0 0 0 .5</code>',
				'<b>HEX</b> Code like <code>#000</code> or <code>#000000</code>',
				'<b>HSL</b> like <code>hsl(0, 0%, 0%)</code>',
				'<b>HSLA</b> like <code>hsla(0, 0%, 0%, .5)</code>',
				'<b>HWB</b> like <code>hwb(0 0% 100%)</code> or <code>hwb(0, 0%, 100%)</code>',
				'<b>CMYK</b> like <code>cmyk(0%, 0%, 0%, 100%)</code>'
			]}
		/>
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

	.ColorSpace dt {
		font-weight: 800;
	}

	.ColorSpace dt::after {
		display: inline;
		content: ':';
		padding-inline-end: 0.5em;
	}

	.Values {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
	}

	.Values-entry {
		padding-block: 1rem;
	}

	.ColorInputDivider {
		font-style: italic;
		margin-block: 2rem;
	}

	.ColorDisplay {
		display: flex;
		gap: 0.25em;
		align-items: center;
		font-size: 3.6rem;
		font-weight: 800;
		line-height: 1;
		color: var(--color-copy);
		transition: text-shadow 0.5s ease;
	}

	.ColorDisplay.matches-background {
		text-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.5);
	}

	.ColorDisplay::before {
		content: '';
		display: block;
		height: 1em;
		width: 1em;
		background: currentColor;
		transition: box-shadow 0.5s ease;
	}

	.ColorDisplay.matches-background::before {
		box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.5);
	}
</style>
