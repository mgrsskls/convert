<script>
	import i18n from "$lib/i18n.js";
	import Grid from "$lib/components/grid.svelte";
	import FromTo from "$lib/components/from-to.svelte";
	import Input from "$lib/components/input.svelte";
	import Result from "$lib/components/result.svelte";
	import { formatDateForInput, getDatetimeParts } from "./utils.js";

	export let currentLocalTime;

	const from = {
		value: formatDateForInput(currentLocalTime),
		changed: false,
	};

	$: fromValue = from.changed ? from.value : formatDateForInput(currentLocalTime);
	$: to = fromValue ? Date.UTC(...getDatetimeParts(fromValue)) : "-";
</script>

<FromTo>
	<svelte:fragment slot="from">
		<Grid>
			<svelte:fragment slot="1">
				<Result label={i18n.time.labels.timeZone} result="UTC" />
			</svelte:fragment>
			<svelte:fragment slot="2">
				<Input
					label={i18n.time.labels.dateTime}
					id="utc-to-timestamp_from-datetime"
					type="datetime-local"
					hasResetButton="true"
					resetButtonIsVisible={from.changed}
					value={fromValue}
					toggleLabel={i18n.time.toggle.datetime}
					on:input={({ detail }) => {
						from.changed = true;
						from.value = detail;
					}}
					on:toggleReset={({ detail: checked }) => {
						from.changed = !checked;
						from.value = fromValue;
					}}
				/>
			</svelte:fragment>
		</Grid>
	</svelte:fragment>
	<svelte:fragment slot="to">
		<Result label={i18n.time.labels.unixTimestamp} result={to} highlight={true} />
	</svelte:fragment>
</FromTo>
