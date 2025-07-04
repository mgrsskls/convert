<script>
	import { onDestroy } from 'svelte';
	import { page } from '$app/stores';

	import list from './list.js';
	import Accordion from '$lib/components/accordion.svelte';
	import SupportedUnits from '$lib/components/supported-units.svelte';
	import Section from './section.svelte';

	let open = $page.url.searchParams.get('type');

	import { getCurrentLocalTime } from './utils.js';

	const userTimeZoneId = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const formattedList = list.flatMap((entry) => [
		entry.toLowerCase(),
		entry.toLowerCase().replace(/_/g, ' ')
	]);

	let currentLocalTime = $state(new Date());
	let getCurrentTime = true;

	useCurrentLocalTime();

	function useCurrentLocalTime() {
		if (!getCurrentTime) return;

		currentLocalTime = getCurrentLocalTime();

		if (typeof window !== 'undefined') {
			window.requestAnimationFrame(useCurrentLocalTime);
		}
	}

	onDestroy(() => {
		getCurrentTime = false;
	});
</script>

<Accordion open={open === 'time-zone-to-time-zone'} id="time-zone-to-time-zone">
	{#snippet title()}
		Time Zone <span class="u-hiddenVisually">to</span><span class="Arrow" aria-hidden="true">→</span
		> Time Zone
	{/snippet}
	{#snippet content()}
		<Section
			options={{
				alias: 'time-zone-to-time-zone',
				formattedList,
				typeFrom: 'timeZone',
				fromTimeZone: 'custom',
				typeTo: 'timeZone',
				toTimeZone: 'custom',
				userTimeZoneId
			}}
			{currentLocalTime}
		/>
	{/snippet}
</Accordion>
<Accordion open={open === 'utc-to-time-zone'} id="utc-to-time-zone">
	{#snippet title()}
		UTC <span class="u-hiddenVisually">to</span><span class="Arrow" aria-hidden="true">→</span> Time
		Zone
	{/snippet}
	{#snippet content()}
		<Section
			options={{
				alias: 'utc-to-time-zone',
				formattedList,
				typeFrom: 'timeZone',
				fromTimeZone: 'utc',
				typeTo: 'timeZone',
				toTimeZone: 'custom',
				userTimeZoneId
			}}
			{currentLocalTime}
		/>
	{/snippet}
</Accordion>
<Accordion open={open === 'timestamp-to-time-zone'} id="timestamp-to-time-zone">
	{#snippet title()}
		UNIX Timestamp <span class="u-hiddenVisually">to</span><span class="Arrow" aria-hidden="true"
			>→</span
		> Time Zone
	{/snippet}
	{#snippet content()}
		<Section
			options={{
				alias: 'timestamp-to-time-zone',
				formattedList,
				typeFrom: 'timestamp',
				typeTo: 'timeZone',
				toTimeZone: 'custom',
				userTimeZoneId
			}}
			{currentLocalTime}
		/>
	{/snippet}
</Accordion>
<Accordion open={open === 'time-zone-to-utc'} id="time-zone-to-utc">
	{#snippet title()}
		Time Zone <span class="u-hiddenVisually">to</span><span class="Arrow" aria-hidden="true">→</span
		> UTC
	{/snippet}
	{#snippet content()}
		<Section
			options={{
				alias: 'time-zone-to-utc',
				formattedList,
				typeFrom: 'timeZone',
				fromTimeZone: 'custom',
				typeTo: 'timeZone',
				toTimeZone: 'utc',
				userTimeZoneId
			}}
			{currentLocalTime}
		/>
	{/snippet}
</Accordion>
<Accordion open={open === 'timestamp-to-utc'} id="timestamp-to-utc">
	{#snippet title()}
		UNIX Timestamp <span class="u-hiddenVisually">to</span><span class="Arrow" aria-hidden="true"
			>→</span
		> UTC
	{/snippet}
	{#snippet content()}
		<Section
			options={{
				alias: 'timestamp-to-utc',
				formattedList,
				typeFrom: 'timestamp',
				typeTo: 'timeZone',
				toTimeZone: 'utc',
				userTimeZoneId
			}}
			{currentLocalTime}
		/>
	{/snippet}
</Accordion>
<Accordion open={open === 'time-zone-to-timestamp'} id="time-zone-to-timestamp">
	{#snippet title()}
		Time Zone <span class="u-hiddenVisually">to</span><span class="Arrow" aria-hidden="true">→</span
		> UNIX Timestamp
	{/snippet}
	{#snippet content()}
		<Section
			options={{
				alias: 'time-zone-to-timestamp',
				formattedList,
				typeFrom: 'timeZone',
				fromTimeZone: 'custom',
				typeTo: 'timestamp',
				userTimeZoneId
			}}
			{currentLocalTime}
		/>
	{/snippet}
</Accordion>
<Accordion open={open === 'utc-to-timestamp'} id="utc-to-timestamp">
	{#snippet title()}
		UTC <span class="u-hiddenVisually">to</span><span class="Arrow" aria-hidden="true">→</span> UNIX
		Timestamp
	{/snippet}
	{#snippet content()}
		<Section
			options={{
				alias: 'utc-to-timestamp',
				formattedList,
				typeFrom: 'timeZone',
				fromTimeZone: 'utc',
				typeTo: 'timestamp',
				userTimeZoneId
			}}
			{currentLocalTime}
		/>
	{/snippet}
</Accordion>

<SupportedUnits supported={list} title="IANA time zone names" />

<datalist id="time-zones">
	{#each list as timeZone}
		<option value={timeZone}>
			{timeZone
				.split('/')
				.reverse()
				.map((entry) => entry.replace(/_/g, ' '))
				.join(', ')}
		</option>
	{/each}
</datalist>

<style>
	.Arrow {
		font-weight: 300;
		padding-inline: 1rem;
	}
</style>
