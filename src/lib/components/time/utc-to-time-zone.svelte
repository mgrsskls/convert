<script lang="ts">
	import { tick } from "svelte";
	import i18n from "$lib/i18n.js";
	import Grid from "$lib/components/grid.svelte";
	import FromTo from "$lib/components/from-to.svelte";
	import Input from "$lib/components/input.svelte";
	import Result from "$lib/components/result.svelte";
	import Difference from "./difference.svelte";
	import {
		formatDateForInput,
		getDatetimeObject,
		getTimeZonesDifference,
		getDatetimeParts,
	} from "./utils.js";
	import { getLocation } from "./api.js";

	export let currentLocalTime: Date;
	export let formattedList: Array<string>;

	let timeout: number;

	const from = {
		timeZone: "UTC",
		datetime: {
			formatted: formatDateForInput(currentLocalTime),
			changed: false,
		},
	};

	const to = {
		timeZone: {
			value: "",
			suggestion: null,
			suggestionLoading: false,
		},
	};

	$: fromDatetimeFormatted = from.datetime.changed
		? from.datetime.formatted
		: formatDateForInput(currentLocalTime);
	$: fromDatetimeTimeZoneObject = getDatetimeTimeZoneObject(fromDatetimeFormatted);
	$: fromDatetimeObject = getDatetimeObject(from.timeZone, fromDatetimeTimeZoneObject);
	$: toDatetimeObject = to.timeZone.value
		? getDatetimeObject(to.timeZone.value, fromDatetimeTimeZoneObject)
		: null;
	$: toDatetimeFormattedForInput = toDatetimeObject ? toDatetimeObject.toLocaleString() : "-";
	$: differenceInHours =
		fromDatetimeObject && toDatetimeObject
			? getTimeZonesDifference(fromDatetimeObject, toDatetimeObject)
			: null;

	function getDatetimeTimeZoneObject(string: string) {
		const datetimeParts = getDatetimeParts(string);

		return new Date(
			Date.UTC(
				datetimeParts[0],
				datetimeParts[1],
				datetimeParts[2],
				datetimeParts[3],
				datetimeParts[4]
			)
		);
	}

	function setToTimeZone(value: string) {
		const lowercaseValue = value.toLowerCase();

		to.timeZone.suggestion = null;

		if (value.length === 0) {
			to.timeZone.value = "";
			return;
		}

		if (formattedList.filter((entry) => entry.includes(lowercaseValue)).length > 0) {
			if (formattedList.includes(lowercaseValue)) {
				to.timeZone.value = value;
			}
		} else {
			clearTimeout(timeout);

			timeout = window.setTimeout(async () => {
				to.timeZone.suggestionLoading = true;
				const suggestion = await getLocation(value);
				to.timeZone.suggestion = suggestion.timezone;
				to.timeZone.suggestionLoading = false;
			}, 500);
		}
	}
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
					id="utc-to-time-zone_from-datetime"
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
	<svelte:fragment slot="divider">
		{#if differenceInHours}
			<Difference diff={differenceInHours} />
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
					value={to.timeZone.value}
					suggestion={to.timeZone.suggestion}
					loading={to.timeZone.suggestionLoading}
					on:input={({ detail }) => setToTimeZone(detail)}
					on:suggestionAccepted={async () => {
						to.timeZone.value = null;
						await tick();
						to.timeZone.value = to.timeZone.suggestion;
						to.timeZone.suggestion = null;
					}}
				/>
			</svelte:fragment><svelte:fragment slot="2">
				<Result
					label={i18n.time.labels.dateTime}
					result={toDatetimeFormattedForInput}
					highlight={true}
				/>
			</svelte:fragment>
		</Grid>
	</svelte:fragment>
</FromTo>
