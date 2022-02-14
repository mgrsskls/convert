<script>
	import i18n from "../../i18n.js";
	import Grid from "./grid.svelte";
	import FromTo from "../from-to.svelte";
	import Input from "../input.svelte";
	import list from "./list.js";
	import { formatDateForInput, getDateObjectForGivenDatetimeAndTimeZone } from "./utils.js";
	import { getLocation } from "./api.js";

	export let userTimeZoneId;
	export let currentLocalTime;

	const user = {
		timeZone: {
			id: userTimeZoneId,
			formatted: userTimeZoneId,
		},
	};

	const from = {
		timeZone: {
			id: user.timeZone.id,
			formatted: user.timeZone.formatted,
		},
		datetime: {
			formatted: formatDateForInput(currentLocalTime),
			changed: false,
		},
	};

	getLocation(user.timeZone.id.replace("/", " ").replace(/_/g, " ")).then((result) => {
		const location = result?.length > 0 ? result[0].formatted_address : user.timeZone.id;

		from.timeZone.formatted = location;
		user.timeZone.formatted = location;
	});

	$: fromDatetimeFormatted = from.datetime.changed
		? from.datetime.formatted
		: formatDateForInput(currentLocalTime);
	$: userChangedTimeZone =
		from.timeZone.id && user.timeZone.id ? from.timeZone.id !== user.timeZone.id : false;
	$: fromDatetimeTimeZoneObject = getDateObjectForGivenDatetimeAndTimeZone(
		fromDatetimeFormatted,
		from.timeZone.id
	);
	$: result = fromDatetimeTimeZoneObject.getTime();

	async function setFromTimeZone(value) {
		if (!value?.length === 0) return;

		const addresses = getLocation(value);

		if (addresses?.length > 0) {
			from.timeZone.formatted = addresses[0].formatted_address;
			from.timeZone.id = addresses[0].timeZone.id;
		} else {
			if (list.includes(value)) {
				from.timeZone.formatted = value;
				from.timeZone.id = value;
			}
		}
	}

	function resetFromTimeZone() {
		from.timeZone.id = user.timeZone.id;
		from.timeZone.formatted = user.timeZone.formatted;
	}
</script>

<FromTo>
	<svelte:fragment slot="from">
		<Grid>
			<svelte:fragment slot="1">
				<Input
					label={i18n.time.labels.timeZone}
					id="time-zone-to-timestamp_from-time-zone"
					type="text"
					hasResetButton="true"
					placeholder={i18n.time.placeholders.timeZone.from}
					list="time-zones"
					resetButtonIsVisible={userChangedTimeZone}
					value={from.timeZone.formatted}
					toggleLabel={i18n.time.toggle.timeZone}
					on:change={(e) => {
						if (e.target.checked) resetFromTimeZone();
					}}
					on:input={({ detail }) => {
						setFromTimeZone(detail);
					}}
				/>
				<input type="hidden" value={from.timeZone.id} />
			</svelte:fragment>
			<svelte:fragment slot="2">
				<Input
					label={i18n.time.labels.dateTime}
					id="time-zone-to-timestamp_from-datetime"
					type="datetime-local"
					hasResetButton="true"
					resetButtonIsVisible={from.datetime.changed}
					value={fromDatetimeFormatted}
					toggleLabel={i18n.time.toggle.datetime}
					on:change={(e) => {
						from.datetime.changed = !e.target.checked;
						from.datetime.formatted = fromDatetimeFormatted;
					}}
					on:input={({ detail }) => {
						from.datetime.changed = true;
						from.datetime.formatted = detail;
					}}
				/>
			</svelte:fragment>
		</Grid>
	</svelte:fragment>
	<svelte:fragment slot="to">
		<Input
			label={i18n.time.labels.unixTimestamp}
			id="time-zone-to-timestamp_to-timestamp"
			type="number"
			readonly="true"
			tabindex="-1"
			value={result}
		/>
	</svelte:fragment>
</FromTo>
