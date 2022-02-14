<script>
	import list from "./list.js";
	import TimestampToTimeZone from "./timestamp-to-timezone.svelte";
	import TimestampToUtc from "./timestamp-to-utc.svelte";
	import TimeZoneToTimestamp from "./time-zone-to-timestamp.svelte";
	import TimeZoneToTimeZone from "./time-zone-to-time-zone.svelte";
	import TimeZoneToUtc from "./time-zone-to-utc.svelte";
	import UtcToTimestamp from "./utc-to-timestamp.svelte";
	import UtcToTimeZone from "./utc-to-time-zone.svelte";

	import { getCurrentLocalTime } from "./utils.js";

	const userTimeZoneId = Intl.DateTimeFormat().resolvedOptions().timeZone;

	let currentLocalTime;

	useCurrentLocalTime();

	function useCurrentLocalTime() {
		currentLocalTime = getCurrentLocalTime();

		if (typeof window !== "undefined") {
			window.requestAnimationFrame(useCurrentLocalTime);
		}
	}
</script>

<details>
	<summary
		>Time Zone <span class="u-hiddenVisually">to</span><span aria-hidden="true">→</span> Time Zone</summary
	>
	<TimeZoneToTimeZone {userTimeZoneId} {currentLocalTime} />
</details>
<details>
	<summary
		>Time Zone <span class="u-hiddenVisually">to</span><span aria-hidden="true">→</span> UTC</summary
	>
	<TimeZoneToUtc {userTimeZoneId} {currentLocalTime} />
</details>
<details>
	<summary
		>Time Zone <span class="u-hiddenVisually">to</span><span aria-hidden="true">→</span> UNIX Timestamp</summary
	>
	<TimeZoneToTimestamp {userTimeZoneId} {currentLocalTime} />
</details>
<details>
	<summary
		>UTC <span class="u-hiddenVisually">to</span><span aria-hidden="true">→</span> Time Zone</summary
	>
	<UtcToTimeZone {currentLocalTime} />
</details>
<details>
	<summary
		>UTC <span class="u-hiddenVisually">to</span><span aria-hidden="true">→</span> UNIX Timestamp</summary
	>
	<UtcToTimestamp {currentLocalTime} />
</details>
<details>
	<summary
		>UNIX Timestamp <span class="u-hiddenVisually">to</span><span aria-hidden="true">→</span> Time Zone</summary
	>
	<TimestampToTimeZone {userTimeZoneId} {currentLocalTime} />
</details>
<details>
	<summary
		>UNIX Timestamp <span class="u-hiddenVisually">to</span><span aria-hidden="true">→</span> UTC</summary
	>
	<TimestampToUtc {currentLocalTime} />
</details>

<datalist id="time-zones">
	{#each list as timeZone}
		<option value={timeZone}>{timeZone}</option>
	{/each}
</datalist>

<style>
	details {
		--border: 0.1rem solid var(--color-accent-light);

		border-block-start: var(--border);
	}

	details:last-of-type {
		border-block-end: var(--border);
	}

	summary {
		--font-size: clamp(1.6rem, 2vw, 2.2rem);

		cursor: default;
		font-size: var(--font-size);
		font-weight: 800;
		line-height: 1;
		padding-block: 2rem;
	}

	summary::marker {
		color: var(--color-accent);
	}

	summary span {
		font-weight: 300;
		padding-inline: 1rem;
	}

	:global(details[open] summary + *) {
		padding-block: 2rem 4rem;
	}

	@keyframes moveIn {
		from {
			transform: translateY(2rem);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	:global(.Difference) {
		text-align: center;
		font-weight: 600;
	}

	:global(.Difference span) {
		font-weight: 800;
		line-height: 1;
	}

	@media (max-width: 48em) {
		:global(.Difference span) {
			font-size: 3.2rem;
		}
	}

	@media (min-width: 48.0625em) {
		:global(.Difference span) {
			display: block;
			font-size: 4.8rem;
		}
	}
</style>
