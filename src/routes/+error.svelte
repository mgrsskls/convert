<script>
	import { page } from '$app/stores';
</script>

{#if $page.error?.message}
	<p>{$page.error.message}</p>
{/if}
