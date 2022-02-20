<script>
	import { onDestroy } from "svelte";
	import { page } from "$app/stores";

	import list from "./list.js";
	import TimestampToTimeZone from "./timestamp-to-timezone.svelte";
	import TimestampToUtc from "./timestamp-to-utc.svelte";
	import TimeZoneToTimestamp from "./time-zone-to-timestamp.svelte";
	import TimeZoneToTimeZone from "./time-zone-to-time-zone.svelte";
	import TimeZoneToUtc from "./time-zone-to-utc.svelte";
	import UtcToTimestamp from "./utc-to-timestamp.svelte";
	import UtcToTimeZone from "./utc-to-time-zone.svelte";
	import Accordion from "$lib/components/accordion.svelte";

	let open = $page.url.searchParams.get("type");

	import { getCurrentLocalTime } from "./utils.js";

	const userTimeZoneId = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const formattedList = list.flatMap((entry) => [
		entry.toLowerCase(),
		entry.toLowerCase().replace(/_/g, " "),
	]);

	let currentLocalTime;
	let getCurrentTime = true;

	useCurrentLocalTime();

	function useCurrentLocalTime() {
		if (!getCurrentTime) return;

		currentLocalTime = getCurrentLocalTime();

		if (typeof window !== "undefined") {
			window.requestAnimationFrame(useCurrentLocalTime);
		}
	}

	onDestroy(() => {
		getCurrentTime = false;
	});
</script>

<Accordion open={open === "time-zone-to-time-zone"} id="time-zone-to-time-zone">
	<svelte:fragment slot="title">
		Time Zone <span class="u-hiddenVisually">to</span><span class="Arrow" aria-hidden="true">→</span
		> Time Zone
	</svelte:fragment>
	<svelte:fragment slot="content">
		<TimeZoneToTimeZone
			{userTimeZoneId}
			{currentLocalTime}
			{formattedList}
			alias="time-zone-to-time-zone"
		/>
	</svelte:fragment>
</Accordion>
<Accordion open={open === "utc-to-time-zone"} id="utc-to-time-zone">
	<svelte:fragment slot="title">
		UTC <span class="u-hiddenVisually">to</span><span aria-hidden="true">→</span> Time Zone
	</svelte:fragment>
	<svelte:fragment slot="content">
		<UtcToTimeZone {currentLocalTime} {formattedList} alias="utc-to-time-zone" />
	</svelte:fragment>
</Accordion>
<Accordion open={open === "timestamp-to-time-zone"} id="timestamp-to-time-zone">
	<svelte:fragment slot="title">
		UNIX Timestamp <span class="u-hiddenVisually">to</span><span aria-hidden="true">→</span> Time Zone
	</svelte:fragment>
	<svelte:fragment slot="content">
		<TimestampToTimeZone
			{userTimeZoneId}
			{currentLocalTime}
			{formattedList}
			alias="timestamp-to-time-zone"
		/>
	</svelte:fragment>
</Accordion>
<Accordion open={open === "time-zone-to-utc"} id="time-zone-to-utc">
	<svelte:fragment slot="title">
		Time Zone <span class="u-hiddenVisually">to</span><span aria-hidden="true">→</span> UTC
	</svelte:fragment>
	<svelte:fragment slot="content">
		<TimeZoneToUtc {userTimeZoneId} {currentLocalTime} {formattedList} alias="time-zone-to-utc" />
	</svelte:fragment>
</Accordion>
<Accordion open={open === "timestamp-to-utc"} id="timestamp-to-utc">
	<svelte:fragment slot="title">
		UNIX Timestamp <span class="u-hiddenVisually">to</span><span aria-hidden="true">→</span> UTC
	</svelte:fragment>
	<svelte:fragment slot="content">
		<TimestampToUtc {currentLocalTime} alias="timestamp-to-utc" />
	</svelte:fragment>
</Accordion>
<Accordion open={open === "time-zone-to-timestamp"} id="time-zone-to-timestamp">
	<svelte:fragment slot="title">
		Time Zone <span class="u-hiddenVisually">to</span><span aria-hidden="true">→</span> UNIX Timestamp
	</svelte:fragment>
	<svelte:fragment slot="content">
		<TimeZoneToTimestamp
			{userTimeZoneId}
			{currentLocalTime}
			{formattedList}
			alias="time-zone-to-timestamp"
		/>
	</svelte:fragment>
</Accordion>
<Accordion open={open === "utc-to-timestamp"} id="utc-to-timestamp">
	<svelte:fragment slot="title">
		UTC <span class="u-hiddenVisually">to</span><span aria-hidden="true">→</span> UNIX Timestamp
	</svelte:fragment>
	<svelte:fragment slot="content">
		<UtcToTimestamp {currentLocalTime} alias="utc-to-timestamp" />
	</svelte:fragment>
</Accordion>

<datalist id="time-zones">
	{#each list as timeZone}
		<option value={timeZone}>
			{timeZone
				.split("/")
				.reverse()
				.map((entry) => entry.replace(/_/g, " "))
				.join(", ")}
		</option>
	{/each}
</datalist>

<style>
	.Arrow {
		font-weight: 300;
		padding-inline: 1rem;
	}
</style>
