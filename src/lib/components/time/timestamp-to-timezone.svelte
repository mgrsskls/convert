<script>
	import { tick } from "svelte";
	import i18n from "$lib/i18n.js";
	import Grid from "$lib/components/grid.svelte";
	import FromTo from "$lib/components/from-to.svelte";
	import Input from "$lib/components/input.svelte";
	import Result from "$lib/components/result.svelte";
	import { getDatetimeObject } from "./utils.js";
	import { getLocation } from "./api.js";

	export let userTimeZoneId;
	export let currentLocalTime;
	export let formattedList;

	let timeout;

	const from = {
		value: 0,
		changed: false,
	};

	const to = {
		timeZone: {
			value: userTimeZoneId,
		},
	};

	$: fromValue = from.changed ? from.value : currentLocalTime.getTime();
	$: userChangedTimeZone =
		to.timeZone.value && userTimeZoneId ? to.timeZone.value !== userTimeZoneId : false;
	$: toDateTimeZoneObject = to.timeZone.value
		? getDatetimeObject(to.timeZone.value, fromValue)
		: null;
	$: toDatetimeFormattedForInput = toDateTimeZoneObject
		? toDateTimeZoneObject.toLocaleString()
		: "-";

	function setTimeZone(value) {
		const lowercaseValue = value.toLowerCase();

		to.timeZone.suggestion = null;

		if (!value?.length === 0) return;

		if (formattedList.filter((entry) => entry.includes(lowercaseValue)).length > 0) {
			if (formattedList.includes(lowercaseValue)) {
				to.timeZone.value = value;
			}
		} else {
			clearTimeout(timeout);

			timeout = setTimeout(async () => {
				to.timeZone.suggestionLoading = true;
				const suggestion = await getLocation(value);
				to.timeZone.suggestion = suggestion.timezone;
				to.timeZone.suggestionLoading = false;
			}, 500);
		}
	}

	function resetToTimeZone() {
		to.timeZone.value = userTimeZoneId;
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
					hasResetButton="true"
					resetButtonIsVisible={userChangedTimeZone}
					placeholder={i18n.time.placeholders.timeZone.to}
					value={to.timeZone.value}
					toggleLabel={i18n.time.toggle.timeZone}
					suggestion={to.timeZone.suggestion}
					loading={to.timeZone.suggestionLoading}
					on:toggleReset={({ detail: checked }) => {
						if (checked) resetToTimeZone();
					}}
					on:input={({ detail }) => {
						setTimeZone(detail);
					}}
					on:suggestionAccepted={async () => {
						to.timeZone.value = null;
						await tick();
						to.timeZone.value = to.timeZone.suggestion;
						to.timeZone.suggestion = null;
					}}
				/>
			</svelte:fragment>
			<svelte:fragment slot="2">
				<Result label={i18n.time.labels.dateTime} result={toDatetimeFormattedForInput} />
			</svelte:fragment>
		</Grid>
	</svelte:fragment>
</FromTo>
