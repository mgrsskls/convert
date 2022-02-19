<script lang="ts">
	import i18n from "$lib/i18n.js";
	import Grid from "$lib/components/grid.svelte";
	import FromTo from "$lib/components/from-to.svelte";
	import Input from "$lib/components/input.svelte";
	import Result from "$lib/components/result.svelte";

	export let currentLocalTime: Date;

	const from: {
		value: string;
		changed: boolean;
	} = {
		value: "0",
		changed: false,
	};

	$: fromValue = from.changed ? from.value : currentLocalTime.getTime().toString();
	$: date = convertToDateObject(fromValue);
	$: to =
		typeof date === "string"
			? date
			: Intl.DateTimeFormat(["en-GB"], {
					timeZone: "UTC",
					year: "numeric",
					month: "numeric",
					day: "numeric",
					hour: "numeric",
					minute: "numeric",
			  }).format(date);
	$: formattedResult = to ? to.toLocaleString() : "-";

	function convertToDateObject(from: string) {
		if (!from) return "";

		try {
			return new Date(parseInt(from, 10));
		} catch (e) {
			return "Invalid date";
		}
	}
</script>

<FromTo>
	<svelte:fragment slot="from">
		<Input
			label={i18n.time.labels.unixTimestamp}
			id="timestamp-to-utc_from"
			type="number"
			hasResetButton={true}
			resetButtonIsVisible={from.changed}
			value={fromValue}
			placeholder={i18n.time.placeholders.unixTimestamp}
			toggleLabel={i18n.time.toggle.timestamp}
			on:input={({ detail }) => {
				from.changed = true;
				from.value = detail;
			}}
			on:focus={() => {
				from.changed = true;
				from.value = fromValue;
			}}
			on:toggleReset={({ detail: checked }) => {
				from.changed = !checked;
				from.value = fromValue;
			}}
		/>
	</svelte:fragment>
	<svelte:fragment slot="to">
		<Grid>
			<svelte:fragment slot="1">
				<Result label={i18n.time.labels.timeZone} result="UTC" />
			</svelte:fragment>
			<svelte:fragment slot="2">
				<Result label={i18n.time.labels.dateTime} result={formattedResult} highlight={true} />
			</svelte:fragment>
		</Grid>
	</svelte:fragment>
</FromTo>
