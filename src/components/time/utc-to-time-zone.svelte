<script>
	import i18n from "../../i18n.js";
	import Grid from "../grid.svelte";
	import FromTo from "../from-to.svelte";
	import Input from "../input.svelte";
	import list from "./list.js";
	import {
		formatDateForInput,
		getDatetimeObject,
		getTimeZonesDifference,
		getDatetimeParts,
	} from "./utils.js";
	import { getLocation } from "./api.js";

	export let currentLocalTime;

	const from = {
		timeZone: "UTC",
		datetime: {
			formatted: formatDateForInput(currentLocalTime),
			changed: false,
		},
	};

	const to = {
		timeZone: {
			id: "",
			formatted: "",
		},
	};

	$: fromDatetimeFormatted = from.datetime.changed
		? from.datetime.formatted
		: formatDateForInput(currentLocalTime);
	$: fromDatetimeTimeZoneObject = new Date(Date.UTC(...getDatetimeParts(fromDatetimeFormatted)));
	$: fromDatetimeObject = getDatetimeObject(from.timeZone, fromDatetimeTimeZoneObject);
	$: toDatetimeObject = getDatetimeObject(to.timeZone.id, fromDatetimeTimeZoneObject);
	$: toDatetimeFormattedForInput = toDatetimeObject ? formatDateForInput(toDatetimeObject) : "";
	$: differenceInHours = getTimeZonesDifference(fromDatetimeObject, toDatetimeObject);

	async function setToTimeZone(value) {
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
</script>

<FromTo>
	<svelte:fragment slot="from">
		<Grid>
			<svelte:fragment slot="1">
				<Input
					label={i18n.time.labels.timeZone}
					id="utc-to-time-zone_from-time-zone"
					type="text"
					value="UTC"
					readonly
					tabindex="-1"
				/>
			</svelte:fragment>
			<svelte:fragment slot="2">
				<Input
					label={i18n.time.labels.dateTime}
					id="utc-to-time-zone_from-datetime"
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
	<svelte:fragment slot="divider">
		{#if differenceInHours}
			<span class="Difference"><span>{differenceInHours}</span> hours</span>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="to">
		<Grid>
			<svelte:fragment slot="1">
				<Input
					label={i18n.time.labels.timeZone}
					id="utc-to-time-zone_to-time-zone"
					type="text"
					list="time-zones"
					placeholder={i18n.time.placeholders.timeZone.to}
					value={to.timeZone.formatted}
					on:input={({ detail }) => setToTimeZone(detail)}
				/>
				<input type="hidden" value={to.timeZone.id} />
			</svelte:fragment><svelte:fragment slot="2">
				<Input
					label={i18n.time.labels.dateTime}
					id="utc-to-time-zone_to-datetime"
					type="datetime-local"
					readonly="true"
					tabindex="-1"
					value={toDatetimeFormattedForInput}
				/>
			</svelte:fragment>
		</Grid>
	</svelte:fragment>
</FromTo>
