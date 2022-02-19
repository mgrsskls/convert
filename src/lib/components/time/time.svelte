<script>
	import { onMount, onDestroy } from "svelte";
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

	let open;

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

	onMount(() => {
		open = $page.url.searchParams.get("type");
	});

	onDestroy(() => {
		getCurrentTime = false;
	});
</script>

<Accordion open={open === "time-zone-to-time-zone"}>
	<svelte:fragment slot="title">
		Time Zone <span class="u-hiddenVisually">to</span><span class="Arrow" aria-hidden="true">→</span
		> Time Zone
	</svelte:fragment>
	<svelte:fragment slot="content">
		<TimeZoneToTimeZone {userTimeZoneId} {currentLocalTime} {formattedList} />
	</svelte:fragment>
</Accordion>
<Accordion open={open === "time-zone-to-utc"}>
	<svelte:fragment slot="title">
		Time Zone <span class="u-hiddenVisually">to</span><span aria-hidden="true">→</span> UTC
	</svelte:fragment>
	<svelte:fragment slot="content">
		<TimeZoneToUtc {userTimeZoneId} {currentLocalTime} {formattedList} />
	</svelte:fragment>
</Accordion>
<Accordion open={open === "time-zone-to-timestamp"}>
	<svelte:fragment slot="title">
		Time Zone <span class="u-hiddenVisually">to</span><span aria-hidden="true">→</span> UNIX Timestamp
	</svelte:fragment>
	<svelte:fragment slot="content">
		<TimeZoneToTimestamp {userTimeZoneId} {currentLocalTime} {formattedList} />
	</svelte:fragment>
</Accordion>
<Accordion open={open === "utc-to-time-zone"}>
	<svelte:fragment slot="title">
		UTC <span class="u-hiddenVisually">to</span><span aria-hidden="true">→</span> Time Zone
	</svelte:fragment>
	<svelte:fragment slot="content">
		<UtcToTimeZone {currentLocalTime} {formattedList} />
	</svelte:fragment>
</Accordion>
<Accordion open={open === "utc-to-timestamp"}>
	<svelte:fragment slot="title">
		UTC <span class="u-hiddenVisually">to</span><span aria-hidden="true">→</span> UNIX Timestamp
	</svelte:fragment>
	<svelte:fragment slot="content">
		<UtcToTimestamp {currentLocalTime} />
	</svelte:fragment>
</Accordion>
<Accordion open={open === "timestamp-to-time-zone"}>
	<svelte:fragment slot="title">
		UNIX Timestamp <span class="u-hiddenVisually">to</span><span aria-hidden="true">→</span> Time Zone
	</svelte:fragment>
	<svelte:fragment slot="content">
		<TimestampToTimeZone {userTimeZoneId} {currentLocalTime} {formattedList} />
	</svelte:fragment>
</Accordion>
<Accordion open={open === "timestamp-to-utc"}>
	<svelte:fragment slot="title">
		UNIX Timestamp <span class="u-hiddenVisually">to</span><span aria-hidden="true">→</span> UTC
	</svelte:fragment>
	<svelte:fragment slot="content">
		<TimestampToUtc {currentLocalTime} />
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
