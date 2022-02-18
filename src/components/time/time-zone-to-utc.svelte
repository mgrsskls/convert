<script>
	import { tick } from "svelte";
	import i18n from "../../i18n.js";
	import Grid from "../grid.svelte";
	import FromTo from "../from-to.svelte";
	import Input from "../input.svelte";
	import Result from "./result.svelte";
	import {
		formatDateForInput,
		getDateObjectForGivenDatetimeAndTimeZone,
		getDatetimeObject,
		getTimeZonesDifference,
	} from "./utils.js";
	import { getLocation } from "./api.js";

	export let userTimeZoneId;
	export let currentLocalTime;
	export let formattedList;

	let timeout;

	const from = {
		timeZone: {
			value: userTimeZoneId,
			suggestion: null,
			suggestionLoading: false,
		},
		datetime: {
			formatted: formatDateForInput(currentLocalTime),
			changed: false,
		},
	};

	const to = "UTC";

	$: fromDatetimeFormatted = from.datetime.changed
		? from.datetime.formatted
		: formatDateForInput(currentLocalTime);
	$: userChangedTimeZone =
		from.timeZone.value && userTimeZoneId ? from.timeZone.value !== userTimeZoneId : false;
	$: fromDatetimeTimeZoneObject = getDateObjectForGivenDatetimeAndTimeZone(
		fromDatetimeFormatted,
		from.timeZone.value
	);
	$: fromDatetimeObject = from.timeZone.value
		? getDatetimeObject(from.timeZone.value, fromDatetimeTimeZoneObject)
		: null;
	$: toDatetimeObject = getDatetimeObject(to, fromDatetimeTimeZoneObject);
	$: toDatetimeFormattedForInput = toDatetimeObject ? toDatetimeObject.toLocaleString() : "-";
	$: differenceInHours =
		fromDatetimeObject && toDatetimeObject
			? getTimeZonesDifference(fromDatetimeObject, toDatetimeObject)
			: null;

	function setFromTimeZone(value) {
		const lowercaseValue = value.toLowerCase();

		from.timeZone.suggestion = null;

		if (!value?.length === 0) return;

		if (formattedList.filter((entry) => entry.includes(lowercaseValue)).length > 0) {
			if (formattedList.includes(lowercaseValue)) {
				from.timeZone.value = value;
			}
		} else {
			clearTimeout(timeout);

			timeout = setTimeout(async () => {
				from.timeZone.suggestionLoading = true;
				const suggestion = await getLocation(value);
				from.timeZone.suggestion = suggestion.timezone;
				from.timeZone.suggestionLoading = false;
			}, 500);
		}
	}

	function resetFromTimeZone() {
		from.timeZone.value = userTimeZoneId;
	}
</script>

<FromTo>
	<svelte:fragment slot="from">
		<Grid>
			<svelte:fragment slot="1">
				<Input
					label={i18n.time.labels.timeZone}
					id="time-zone-to-utc_from-time-zone"
					type="text"
					hasResetButton="true"
					placeholder={i18n.time.placeholders.timeZone.from}
					list="time-zones"
					resetButtonIsVisible={userChangedTimeZone}
					value={from.timeZone.value}
					toggleLabel={i18n.time.toggle.timeZone}
					suggestion={from.timeZone.suggestion}
					loading={from.timeZone.suggestionLoading}
					on:toggleReset={({ detail: checked }) => {
						if (checked) resetFromTimeZone();
					}}
					on:input={({ detail }) => {
						setFromTimeZone(detail);
					}}
					on:suggestionAccepted={async () => {
						from.timeZone.value = null;
						await tick();
						from.timeZone.value = from.timeZone.suggestion;
						from.timeZone.suggestion = null;
					}}
				/>
			</svelte:fragment>
			<svelte:fragment slot="2">
				<Input
					label={i18n.time.labels.dateTime}
					id="time-zone-to-utc_from-datetime"
					type="datetime-local"
					hasResetButton="true"
					resetButtonIsVisible={from.datetime.changed}
					value={fromDatetimeFormatted}
					toggleLabel={i18n.time.toggle.datetime}
					on:toggleReset={({ detail: checked }) => {
						from.datetime.changed = !checked;
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
					id="time-zone-to-utc_to-time-zone"
					type="text"
					value="UTC"
					readonly
					tabindex="-1"
				/>
			</svelte:fragment>
			<svelte:fragment slot="2">
				<Result label={i18n.time.labels.dateTime} result={toDatetimeFormattedForInput} />
			</svelte:fragment>
		</Grid>
	</svelte:fragment>
</FromTo>
