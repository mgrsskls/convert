<script>
	import i18n from "../../i18n.js";
	import Grid from "../grid.svelte";
	import FromTo from "../from-to.svelte";
	import Input from "../input.svelte";
	import Result from "./result.svelte";
	import { formatDateForInput, getDatetimeParts } from "./utils.js";

	export let currentLocalTime;

	const from = {
		value: formatDateForInput(currentLocalTime),
		changed: false,
	};

	$: fromValue = from.changed ? from.value : formatDateForInput(currentLocalTime);
	$: to = Date.UTC(...getDatetimeParts(fromValue));
</script>

<FromTo>
	<svelte:fragment slot="from">
		<Grid>
			<svelte:fragment slot="1">
				<Input
					label={i18n.time.labels.timeZone}
					id="utc-to-timestamp_from-time-zone"
					type="text"
					value="UTC"
					readonly
					tabindex="-1"
				/>
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
					on:change={(e) => {
						from.changed = !e.target.checked;
						from.value = fromValue;
					}}
				/>
			</svelte:fragment>
		</Grid>
	</svelte:fragment>
	<svelte:fragment slot="to">
		<Result label={i18n.time.labels.unixTimestamp} result={to} />
	</svelte:fragment>
</FromTo>
