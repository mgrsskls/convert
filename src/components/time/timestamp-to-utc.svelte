<script>
	import i18n from "../../i18n.js";
	import Grid from "../grid.svelte";
	import FromTo from "../from-to.svelte";
	import Input from "../input.svelte";
	import { standardizeDate } from "./utils.js";

	export let currentLocalTime;

	const from = {
		value: 0,
		changed: false,
	};

	$: fromValue = from.changed ? from.value : currentLocalTime.getTime();
	$: date = convertToDateObject(fromValue);
	$: to =
		typeof date === "string"
			? date
			: Intl.DateTimeFormat(["en-GB"], {
					timeZone: "UTC",
					year: "numeric",
					month: "numeric",
					day: "numeric",
					hour: "numeric",
					minute: "numeric",
			  }).format(date);
	$: formattedResult = standardizeDate(to);

	function convertToDateObject(from) {
		if (!from) return "";

		try {
			return new Date(parseInt(from, 10));
		} catch (e) {
			return "Invalid date";
		}
	}
</script>

<FromTo>
	<svelte:fragment slot="from">
		<Input
			label={i18n.time.labels.unixTimestamp}
			id="timestamp-to-utc_from"
			type="number"
			hasResetButton="true"
			resetButtonIsVisible={from.changed}
			value={fromValue}
			placeholder={i18n.time.placeholders.unixTimestamp}
			toggleLabel={i18n.time.toggle.timestamp}
			on:input={({ detail }) => {
				from.changed = true;
				from.value = detail;
			}}
			on:focus={() => {
				from.changed = true;
				from.value = fromValue;
			}}
			on:change={(e) => {
				from.changed = !e.target.checked;
				from.value = fromValue;
			}}
		/>
	</svelte:fragment>
	<svelte:fragment slot="to">
		<Grid>
			<svelte:fragment slot="1">
				<Input
					label={i18n.time.labels.timeZone}
					id="timestamp-to-utc_to-time-zone"
					type="text"
					readonly="true"
					tabindex="-1"
					value="UTC"
				/>
			</svelte:fragment>
			<svelte:fragment slot="2">
				<Input
					label={i18n.time.labels.dateTime}
					id="timestamp-to-utc_to-datetime"
					type="datetime-local"
					readonly="true"
					tabindex="-1"
					value={formattedResult}
				/>
			</svelte:fragment>
		</Grid>
	</svelte:fragment>
</FromTo>
