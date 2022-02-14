<script>
	import i18n from "../../i18n.js";
	import Grid from "./grid.svelte";
	import FromTo from "../from-to.svelte";
	import Input from "../input.svelte";
	import list from "./list.js";
	import { formatDateForInput, getDatetimeObject } from "./utils.js";
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
		value: 0,
		changed: false,
	};

	const to = {
		timeZone: {
			id: user.timeZone.id,
			formatted: user.timeZone.formatted,
		},
	};

	getLocation(user.timeZone.id.replace("/", " ").replace(/_/g, " ")).then((result) => {
		const location = result?.length > 0 ? result[0].formatted_address : user.timeZone.id;
		console.lo;
		to.timeZone.formatted = location;
		user.timeZone.formatted = location;
	});

	$: fromValue = from.changed ? from.value : currentLocalTime.getTime();
	$: userChangedTimeZone =
		to.timeZone.id && user.timeZone.id ? to.timeZone.id !== user.timeZone.id : false;
	$: toDateTimeZoneObject = getDatetimeObject(to.timeZone.id, fromValue);
	$: toDatetimeFormattedForInput = toDateTimeZoneObject
		? formatDateForInput(toDateTimeZoneObject)
		: "";

	async function setTimeZone(value) {
		if (!value?.length === 0) return;

		const addresses = getLocation(value);

		if (addresses?.length > 0) {
			to.timeZone.formatted = addresses[0].formatted_address;
			to.timeZone.id = addresses[0].timeZone.id;
		} else {
			if (list.includes(value)) {
				to.timeZone.formatted = value;
				to.timeZone.id = value;
			}
		}
	}

	function resetToTimeZone() {
		to.timeZone.id = user.timeZone.id;
		to.timeZone.formatted = user.timeZone.formatted;
	}
</script>

<FromTo>
	<svelte:fragment slot="from">
		<Input
			label={i18n.time.labels.timeZone}
			id="timestamp-to-time-zone_from-time-zone"
			type="number"
			hasResetButton="true"
			resetButtonIsVisible={from.changed}
			placeholder={i18n.time.placeholders.unixTimestamp}
			value={fromValue}
			toggleLabel={i18n.time.toggle.timestamp}
			on:change={(e) => {
				from.changed = !e.target.checked;
				from.value = fromValue;
			}}
			on:input={({ detail }) => {
				from.value = detail;
				from.changed = true;
			}}
			on:focus={() => {
				from.changed = true;
				from.value = fromValue;
			}}
		/>
	</svelte:fragment>
	<svelte:fragment slot="to">
		<Grid>
			<svelte:fragment slot="1">
				<Input
					label={i18n.time.labels.timeZone}
					id="timestamp-to-time-zone_time-zone"
					type="text"
					list="time-zones"
					hasResetButton="true"
					resetButtonIsVisible={userChangedTimeZone}
					placeholder={i18n.time.placeholders.timeZone.to}
					value={to.timeZone.formatted}
					toggleLabel={i18n.time.toggle.timeZone}
					on:change={(e) => {
						if (e.target.checked) resetToTimeZone();
					}}
					on:input={({ detail }) => {
						setTimeZone(detail);
					}}
				/>
				<input type="hidden" value={to.timeZone.id} />
			</svelte:fragment>
			<svelte:fragment slot="2">
				<Input
					label={i18n.time.labels.dateTime}
					id="timestamp-to-time-zone_datetime"
					type="datetime-local"
					readonly="true"
					tabindex="-1"
					value={toDatetimeFormattedForInput}
				/>
			</svelte:fragment>
		</Grid>
	</svelte:fragment>
</FromTo>
