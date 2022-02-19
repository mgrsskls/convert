<script lang="ts">
	import { tick } from "svelte";
	import i18n from "$lib/i18n.js";
	import Grid from "$lib/components/grid.svelte";
	import FromTo from "$lib/components/from-to.svelte";
	import Input from "$lib/components/input.svelte";
	import Result from "$lib/components/result.svelte";
	import { formatDateForInput, getDateObjectForGivenDatetimeAndTimeZone } from "./utils.js";
	import { getLocation } from "./api.js";

	export let userTimeZoneId: string;
	export let currentLocalTime: Date;
	export let formattedList: Array<string>;

	let timeout: number;

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

	$: fromDatetimeFormatted = from.datetime.changed
		? from.datetime.formatted
		: formatDateForInput(currentLocalTime);
	$: userChangedTimeZone =
		from.timeZone.value && userTimeZoneId ? from.timeZone.value !== userTimeZoneId : false;
	$: fromDatetimeTimeZoneObject = getDateObjectForGivenDatetimeAndTimeZone(
		fromDatetimeFormatted,
		from.timeZone.value
	);
	$: result = fromDatetimeTimeZoneObject ? fromDatetimeTimeZoneObject.getTime() : "-";

	function setFromTimeZone(value: string) {
		const lowercaseValue = value.toLowerCase();

		from.timeZone.suggestion = null;

		if (value.length === 0) return;

		if (formattedList.filter((entry) => entry.includes(lowercaseValue)).length > 0) {
			if (formattedList.includes(lowercaseValue)) {
				from.timeZone.value = value;
			}
		} else {
			clearTimeout(timeout);

			timeout = window.setTimeout(async () => {
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
					id="time-zone-to-timestamp_from-time-zone"
					type="text"
					hasResetButton={true}
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
					id="time-zone-to-timestamp_from-datetime"
					type="datetime-local"
					hasResetButton={true}
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
	<svelte:fragment slot="to">
		<Result label={i18n.time.labels.unixTimestamp} {result} highlight={true} />
	</svelte:fragment>
</FromTo>
