<script lang="ts">
	import { page } from "$app/stores";
	import { tick } from "svelte";
	import i18n from "$lib/i18n.js";
	import Grid from "$lib/components/grid.svelte";
	import FromTo from "$lib/components/from-to.svelte";
	import Input from "$lib/components/input.svelte";
	import Result from "$lib/components/result.svelte";
	import Difference from "./difference.svelte";
	import Button from "$lib/components/button.svelte";
	import {
		formatDateForInput,
		getDateObjectForGivenDatetimeAndTimeZone,
		getDatetimeObject,
		getTimeZonesDifference,
	} from "./utils.js";
	import { getLocation } from "./api.js";

	interface Options {
		alias: string;
		formattedList: Array<string>;
		typeFrom: "timeZone" | "timestamp";
		fromTimeZone?: "custom" | "utc";
		typeTo: "timeZone" | "timestamp";
		toTimeZone?: "custom" | "utc";
		userTimeZoneId: string;
	}

	interface TimeZone {
		value: string;
		suggestion: string;
		suggestionLoading: boolean;
	}

	interface Datetime {
		value: string;
		changed: boolean;
	}

	interface Timestamp {
		value: string;
		changed: boolean;
	}

	export let options: Options;
	export let currentLocalTime: Date;

	const { alias, formattedList, typeFrom, fromTimeZone, typeTo, toTimeZone, userTimeZoneId } =
		options;

	let timeout: number;

	const from: {
		timeZone: TimeZone;
		datetime: Datetime;
		timestamp: Timestamp;
	} = {
		timeZone: {
			value: null,
			suggestion: null,
			suggestionLoading: false,
		},
		datetime: {
			value: null,
			changed: $page.url.searchParams.get(`${alias}[from][date_time]`) ? true : false,
		},
		timestamp: {
			value: null,
			changed: $page.url.searchParams.get(`${alias}[from][timestamp]`) ? true : false,
		},
	};

	if (typeFrom === "timeZone") {
		from.timeZone.value =
			fromTimeZone === "utc"
				? "UTC"
				: $page.url.searchParams.get(`${alias}[from][time_zone]`)
				? decodeURIComponent($page.url.searchParams.get(`${alias}[from][time_zone]`))
				: userTimeZoneId;
		from.datetime.value = $page.url.searchParams.get(`${alias}[from][date_time]`)
			? decodeURIComponent($page.url.searchParams.get(`${alias}[from][date_time]`))
			: formatDateForInput(currentLocalTime);
	} else {
		from.timestamp.value = $page.url.searchParams.get(`${alias}[from][timestamp]`)
			? decodeURIComponent($page.url.searchParams.get(`${alias}[from][timestamp]`))
			: "0";
	}

	const to = {
		timeZone: {
			value:
				toTimeZone === "utc"
					? "UTC"
					: $page.url.searchParams.get(`${alias}[to][time_zone]`)
					? decodeURIComponent($page.url.searchParams.get(`${alias}[to][time_zone]`))
					: "",
			suggestion: null,
			suggestionLoading: false,
		} as TimeZone,
	};

	$: fromValue =
		typeFrom === "timestamp"
			? from.timestamp.changed
				? from.timestamp.value
				: currentLocalTime.getTime().toString()
			: from.datetime.value;
	$: fromDatetimeFormatted = from.datetime.changed
		? fromValue
		: formatDateForInput(currentLocalTime);
	$: userChangedFromTimeZone =
		from.timeZone.value && userTimeZoneId ? from.timeZone.value !== userTimeZoneId : false;
	$: fromDatetimeTimeZoneObject = getDateObjectForGivenDatetimeAndTimeZone(
		fromDatetimeFormatted,
		from.timeZone.value
	);
	$: fromDatetimeObject = from.timeZone.value
		? getDatetimeObject(from.timeZone.value, fromDatetimeTimeZoneObject)
		: null;
	$: toDatetimeObject = to.timeZone.value
		? getDatetimeObject(
				to.timeZone.value,
				typeFrom === "timestamp" ? fromValue : fromDatetimeTimeZoneObject
		  )
		: null;
	$: differenceInHours =
		fromDatetimeObject && toDatetimeObject
			? getTimeZonesDifference(fromDatetimeObject, toDatetimeObject)
			: null;
	$: timeZoneResult = toDatetimeObject ? toDatetimeObject.toLocaleString() : "-";
	$: timestampResult = fromDatetimeTimeZoneObject ? fromDatetimeTimeZoneObject.getTime() : "-";

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

	function setToTimeZone(value: string) {
		const lowercaseValue = value.toLowerCase();

		to.timeZone.suggestion = null;

		if (value.length === 0) return;

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

	function resetFromTimeZone() {
		from.timeZone.value = userTimeZoneId;
	}
</script>

<FromTo action={`#${alias}`}>
	<svelte:fragment slot="from">
		<input type="hidden" name="type" value={alias} />
		<Grid>
			<svelte:fragment slot="1">
				{#if typeFrom === "timeZone"}
					{#if fromTimeZone === "custom"}
						<Input
							label={i18n.time.labels.timeZone}
							id={`${alias}_from_time_zone`}
							name={`${alias}[from][time_zone]`}
							type="text"
							hasResetButton={true}
							placeholder={i18n.time.placeholders.timeZone.from}
							list="time-zones"
							resetButtonIsVisible={userChangedFromTimeZone}
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
					{:else}
						<Result label={i18n.time.labels.timeZone} result="UTC" />
					{/if}
				{:else}
					<Input
						label={i18n.time.labels.unixTimestamp}
						id={`${alias}_from_timestamp`}
						name={`${alias}[from][timestamp]`}
						type="number"
						hasResetButton={true}
						resetButtonIsVisible={from.timestamp.changed}
						placeholder={i18n.time.placeholders.unixTimestamp}
						value={fromValue}
						toggleLabel={i18n.time.toggle.timestamp}
						on:toggleReset={({ detail: checked }) => {
							from.timestamp.changed = !checked;
							from.timestamp.value = fromValue;
						}}
						on:input={({ detail }) => {
							from.timestamp.value = detail;
							from.timestamp.changed = true;
						}}
						on:focus={() => {
							from.timestamp.changed = true;
							from.timestamp.value = fromValue;
						}}
					/>
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="2">
				{#if typeFrom !== "timestamp"}
					<Input
						label={i18n.time.labels.dateTime}
						name={`${alias}[from][date_time]`}
						id={`${alias}_to_datetime`}
						type="datetime-local"
						hasResetButton={true}
						resetButtonIsVisible={from.datetime.changed}
						value={fromDatetimeFormatted}
						toggleLabel={i18n.time.toggle.datetime}
						on:toggleReset={({ detail: checked }) => {
							from.datetime.changed = !checked;
							from.datetime.value = fromDatetimeFormatted;
						}}
						on:input={({ detail }) => {
							from.datetime.changed = true;
							from.datetime.value = detail;
						}}
					/>
				{/if}
			</svelte:fragment>
		</Grid>
		{#if toTimeZone !== "custom"}
			<Button />
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="divider">
		{#if differenceInHours && typeFrom === "timeZone" && typeTo === "timeZone"}
			<Difference diff={differenceInHours} />
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="to">
		<Grid>
			<svelte:fragment slot="1">
				{#if typeTo === "timeZone"}
					{#if toTimeZone === "custom"}
						<Input
							label={i18n.time.labels.timeZone}
							name={`${alias}[to][time_zone]`}
							id={`${alias}_to_time_zone`}
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
						<Button />
					{:else}
						<Result label={i18n.time.labels.timeZone} result="UTC" />
					{/if}
				{:else}
					<Result
						label={i18n.time.labels.unixTimestamp}
						result={timestampResult}
						highlight={true}
					/>
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="2">
				{#if typeTo === "timeZone"}
					<Result label={i18n.time.labels.dateTime} result={timeZoneResult} highlight={true} />
				{/if}
			</svelte:fragment>
		</Grid>
	</svelte:fragment>
</FromTo>
