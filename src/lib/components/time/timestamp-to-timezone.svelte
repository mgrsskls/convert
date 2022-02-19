<script lang="ts">
	import { tick } from "svelte";
	import i18n from "$lib/i18n.js";
	import Grid from "$lib/components/grid.svelte";
	import FromTo from "$lib/components/from-to.svelte";
	import Input from "$lib/components/input.svelte";
	import Result from "$lib/components/result.svelte";
	import { getDatetimeObject } from "./utils.js";
	import { getLocation } from "./api.js";

	export let userTimeZoneId: string;
	export let currentLocalTime: Date;
	export let formattedList: Array<string>;

	let timeout: number;

	const from: {
		value: number;
		changed: boolean;
	} = {
		value: 0,
		changed: false,
	};

	const to: {
		value: string;
		suggestion: string | null;
		suggestionLoading: boolean;
	} = {
		value: userTimeZoneId,
		suggestion: null,
		suggestionLoading: false,
	};

	$: fromValue = from.changed ? from.value : currentLocalTime.getTime();
	$: userChangedTimeZone = to.value && userTimeZoneId ? to.value !== userTimeZoneId : false;
	$: toDateTimeZoneObject = to.value ? getDatetimeObject(to.value, fromValue) : null;
	$: toDatetimeFormattedForInput = toDateTimeZoneObject
		? toDateTimeZoneObject.toLocaleString()
		: "-";

	function setTimeZone(value: string) {
		const lowercaseValue = value.toLowerCase();

		to.suggestion = null;

		if (value.length === 0) return;

		if (formattedList.filter((entry) => entry.includes(lowercaseValue)).length > 0) {
			if (formattedList.includes(lowercaseValue)) {
				to.value = value;
			}
		} else {
			clearTimeout(timeout);

			timeout = window.setTimeout(async () => {
				to.suggestionLoading = true;
				const suggestion = await getLocation(value);
				to.suggestion = suggestion.timezone;
				to.suggestionLoading = false;
			}, 500);
		}
	}

	function resetToTimeZone() {
		to.value = userTimeZoneId;
	}
</script>

<FromTo>
	<svelte:fragment slot="from">
		<Input
			label={i18n.time.labels.timeZone}
			id="timestamp-to-time-zone_from-time-zone"
			type="number"
			hasResetButton={true}
			resetButtonIsVisible={from.changed}
			placeholder={i18n.time.placeholders.unixTimestamp}
			value={fromValue}
			toggleLabel={i18n.time.toggle.timestamp}
			on:toggleReset={({ detail: checked }) => {
				from.changed = !checked;
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
					hasResetButton={true}
					resetButtonIsVisible={userChangedTimeZone}
					placeholder={i18n.time.placeholders.timeZone.to}
					value={to.value}
					toggleLabel={i18n.time.toggle.timeZone}
					suggestion={to.suggestion}
					loading={to.suggestionLoading}
					on:toggleReset={({ detail: checked }) => {
						if (checked) resetToTimeZone();
					}}
					on:input={({ detail }) => {
						setTimeZone(detail);
					}}
					on:suggestionAccepted={async () => {
						to.value = null;
						await tick();
						to.value = to.suggestion;
						to.suggestion = null;
					}}
				/>
			</svelte:fragment>
			<svelte:fragment slot="2">
				<Result
					label={i18n.time.labels.dateTime}
					result={toDatetimeFormattedForInput}
					highlight={true}
				/>
			</svelte:fragment>
		</Grid>
	</svelte:fragment>
</FromTo>
