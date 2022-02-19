<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				description: error.message,
			},
			stuff: {
				title: status,
			},
		};
	}
</script>

<script lang="ts">
	export let description: string;
</script>

<p>{description}</p>
