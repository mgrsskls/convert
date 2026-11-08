<script>
	import { page } from '$app/state';
</script>

{#if page.error?.message}
	<p>{page.error.message}</p>
{/if}
