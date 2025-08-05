<script>
	import { page } from '$app/stores';
	import i18n from '$lib/i18n.js';
	import Grid from '$lib/components/grid.svelte';
	import FromTo from '$lib/components/from-to.svelte';
	import Input from '$lib/components/input.svelte';
	import Result from '$lib/components/result.svelte';
	import Difference from './difference.svelte';
	import Button from '$lib/components/button.svelte';
	import {
		formatDateForInput,
		getDateObjectForGivenDatetimeAndTimeZone,
		getDatetimeObject,
		getTimeZonesDifference
	} from './utils.js';

	let { options, currentLocalTime } = $props();

	const { alias, formattedList, typeFrom, fromTimeZone, typeTo, toTimeZone, userTimeZoneId } =
		options;

	const initialFromTimeZone = $page.url.searchParams.get(`${alias}[from][time_zone]`)
		? decodeURIComponent($page.url.searchParams.get(`${alias}[from][time_zone]`))
		: null;
	const initialFromDatetime = $page.url.searchParams.get(`${alias}[from][datetime]`)
		? decodeURIComponent($page.url.searchParams.get(`${alias}[from][datetime]`))
		: null;
	const initialFromTimestamp = $page.url.searchParams.get(`${alias}[from][timestamp]`)
		? decodeURIComponent($page.url.searchParams.get(`${alias}[from][timestamp]`))
		: null;

	const stateFrom = $state({
		timeZone: {
			value: null,
			shouldValidate: initialFromTimeZone ? true : false
		},
		datetime: {
			value: null,
			changed: initialFromDatetime && initialFromDatetime != formatDateForInput(currentLocalTime),
			shouldValidate: initialFromDatetime ? true : false
		},
		timestamp: {
			value: null,
			changed: !!initialFromTimestamp,
			shouldValidate: initialFromTimestamp ? true : false
		}
	});

	if (typeFrom === 'timeZone') {
		stateFrom.timeZone.value =
			fromTimeZone === 'utc' ? 'UTC' : initialFromTimeZone || userTimeZoneId;
		stateFrom.datetime.value = initialFromDatetime || formatDateForInput(currentLocalTime);
	} else {
		stateFrom.timestamp.value = parseInt(initialFromTimestamp, 10);
	}

	const initialToTimeZone = $page.url.searchParams.get(`${alias}[to][time_zone]`)
		? decodeURIComponent($page.url.searchParams.get(`${alias}[to][time_zone]`))
		: null;
	const stateTo = $state({
		timeZone: {
			value:
				toTimeZone === 'utc'
					? 'UTC'
					: $page.url.searchParams.get(`${alias}[to][time_zone]`)
						? decodeURIComponent($page.url.searchParams.get(`${alias}[to][time_zone]`))
						: '',
			shouldValidate: initialToTimeZone ? true : false
		}
	});

	function timestampIsValid(value) {
		return typeof value === 'number';
	}

	function datetimeIsValid(value) {
		return new Date(value).toString() !== 'Invalid Date';
	}

	function timeZoneIsValid(timeZone) {
		return timeZone === 'UTC' || formattedList.includes(timeZone.toLowerCase());
	}

	function setFromTimeZone(value) {
		const lowercaseValue = value.toLowerCase();

		if (value.length === 0) return;

		if (formattedList.filter((entry) => entry.includes(lowercaseValue)).length > 0) {
			if (timeZoneIsValid(value)) {
				stateFrom.timeZone.value = value;
			}
		}
	}

	function setToTimeZone(value) {
		const lowercaseValue = value.toLowerCase();

		if (value.length === 0) return;

		if (formattedList.filter((entry) => entry.includes(lowercaseValue)).length > 0) {
			if (timeZoneIsValid(value)) {
				stateTo.timeZone.value = value;
			}
		}
	}

	function resetFromTimeZone() {
		stateFrom.timeZone.value = userTimeZoneId;
	}
	let fromTimestamp = $derived(
		stateFrom.timestamp.changed ? stateFrom.timestamp.value : currentLocalTime.getTime()
	);
	let fromDatetime = $derived(stateFrom.datetime.value);
	let fromValue = $derived(typeFrom === 'timestamp' ? fromTimestamp : fromDatetime);
	let fromTimeZoneIsValid = $derived(
		stateFrom.timeZone.value ? timeZoneIsValid(stateFrom.timeZone.value) : false
	);
	let fromDatetimeIsValid = $derived(
		typeFrom === 'timestamp' ? timestampIsValid(fromTimestamp) : datetimeIsValid(fromDatetime)
	);
	let toTimeZoneIsValid = $derived(
		stateTo.timeZone.value ? timeZoneIsValid(stateTo.timeZone.value) : false
	);
	let fromDatetimeFormatted = $derived(
		stateFrom.datetime.changed ? fromValue : formatDateForInput(currentLocalTime)
	);
	let userChangedFromTimeZone = $derived(
		stateFrom.timeZone.value && userTimeZoneId ? stateFrom.timeZone.value !== userTimeZoneId : false
	);
	let fromDatetimeTimeZoneObject = $derived(
		fromTimeZoneIsValid && fromDatetimeIsValid
			? getDateObjectForGivenDatetimeAndTimeZone(fromDatetimeFormatted, stateFrom.timeZone.value)
			: null
	);
	let fromDatetimeObject = $derived(
		fromTimeZoneIsValid
			? stateFrom.timeZone.value
				? getDatetimeObject(stateFrom.timeZone.value, fromDatetimeTimeZoneObject)
				: null
			: null
	);
	let toDatetimeObject = $derived(
		toTimeZoneIsValid && stateTo.timeZone.value
			? getDatetimeObject(
					stateTo.timeZone.value,
					typeFrom === 'timestamp'
						? typeof fromValue === 'number'
							? fromValue
							: parseInt(fromValue, 10)
						: fromDatetimeTimeZoneObject
				)
			: null
	);
	let differenceInHours = $derived(
		fromDatetimeObject && toDatetimeObject
			? getTimeZonesDifference(fromDatetimeObject, toDatetimeObject)
			: null
	);
	let timeZoneResult = $derived(toDatetimeObject ? toDatetimeObject.toLocaleString() : '-');
	let timestampResult = $derived(
		fromDatetimeTimeZoneObject ? fromDatetimeTimeZoneObject.getTime() : '-'
	);
</script>

<FromTo action={`#${alias}`}>
	{#snippet from()}
		<input type="hidden" name="type" value={alias} />
		<Grid>
			{#snippet one()}
				{#if typeFrom === 'timeZone'}
					{#if fromTimeZone === 'custom'}
						<Input
							label={i18n.time.labels.timeZone}
							id={`${alias}_from_time_zone`}
							name={`${alias}[from][time_zone]`}
							type="text"
							hasResetButton={true}
							placeholder={i18n.time.placeholders.timeZone.from}
							list="time-zones"
							resetButtonIsVisible={userChangedFromTimeZone}
							value={stateFrom.timeZone.value}
							toggleLabel={i18n.time.toggle.timeZone}
							invalid={stateFrom.timeZone.shouldValidate && !fromTimeZoneIsValid}
							toggleReset={(checked) => {
								if (checked) resetFromTimeZone();
							}}
							input={(value) => {
								setFromTimeZone(value);
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
						resetButtonIsVisible={stateFrom.timestamp.changed}
						placeholder={i18n.time.placeholders.unixTimestamp}
						value={fromValue}
						toggleLabel={i18n.time.toggle.timestamp}
						toggleReset={(checked) => {
							stateFrom.timestamp.changed = !checked;
							stateFrom.timestamp.value =
								typeof fromValue === 'string' ? parseInt(fromValue, 10) : fromValue;
						}}
						input={(value) => {
							stateFrom.timestamp.value = parseInt(value, 10);
							stateFrom.timestamp.changed = true;
						}}
						focus={() => {
							stateFrom.timestamp.changed = true;
							if (fromValue) {
								stateFrom.timestamp.value =
									typeof fromValue === 'string' ? parseInt(fromValue, 10) : fromValue;
							} else {
								stateFrom.timestamp.value = Date.now();
							}
						}}
					/>
				{/if}
			{/snippet}
			{#snippet two()}
				{#if typeFrom !== 'timestamp'}
					<Input
						label={i18n.time.labels.dateTime}
						name={`${alias}[from][datetime]`}
						id={`${alias}_to_datetime`}
						type="datetime-local"
						hasResetButton={true}
						resetButtonIsVisible={stateFrom.datetime.changed}
						value={fromDatetimeFormatted}
						toggleLabel={i18n.time.toggle.datetime}
						toggleReset={(checked) => {
							stateFrom.datetime.changed = !checked;
							stateFrom.datetime.value = fromDatetimeFormatted.toString();
						}}
						input={(value) => {
							stateFrom.datetime.changed = true;
							stateFrom.datetime.value = value;
						}}
					/>
				{/if}
			{/snippet}
		</Grid>
		{#if toTimeZone !== 'custom'}
			<Button />
		{/if}
	{/snippet}
	{#snippet divider()}
		{#if differenceInHours && typeFrom === 'timeZone' && typeTo === 'timeZone'}
			<Difference diff={differenceInHours} />
		{/if}
	{/snippet}
	{#snippet to()}
		<Grid>
			{#snippet one()}
				{#if typeTo === 'timeZone'}
					{#if toTimeZone === 'custom'}
						<Input
							label={i18n.time.labels.timeZone}
							name={`${alias}[to][time_zone]`}
							id={`${alias}_to_time_zone`}
							type="text"
							list="time-zones"
							placeholder={i18n.time.placeholders.timeZone.to}
							value={stateTo.timeZone.value}
							invalid={stateTo.timeZone.shouldValidate && !toTimeZoneIsValid}
							input={(value) => setToTimeZone(value)}
						/>
						<Button />
					{:else}
						<Result label={i18n.time.labels.timeZone} result="UTC" />
					{/if}
				{:else}
					<Result
						label={i18n.time.labels.unixTimestamp}
						result={timestampResult.toString()}
						highlight={true}
					/>
				{/if}
			{/snippet}
			{#snippet two()}
				{#if typeTo === 'timeZone'}
					<Result label={i18n.time.labels.dateTime} result={timeZoneResult} highlight={true} />
				{/if}
			{/snippet}
		</Grid>
	{/snippet}
</FromTo>
