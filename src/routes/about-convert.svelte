<script>
	import i18n from "$lib/i18n.js";

	const copy = i18n["about-convert"];
</script>

<dl>
	<div>
		<dt>{copy.createdBy}</dt>
		<dd>
			<a href="https://www.mgrossklaus.de" target="_blank" rel="noopener">Michael Großklaus</a>
		</dd>
	</div>
	<div>
		<dt>{copy.repository}</dt>
		<dd>
			<a href="https://github.com/mgrsskls/convert" target="_blank" rel="noopener"
				>https://github.com/mgrsskls/convert</a
			>
		</dd>
	</div>
	<div>
		<dt>{copy.builtWith}</dt>
		<dd>
			<ul>
				<li><a href="https://kit.svelte.dev/" target="_blank" rel="noopener">Svelte Kit</a></li>
				<li><a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a></li>
			</ul>
		</dd>
	</div>
	<div>
		<dt>{copy.hosting}</dt>
		<dd>
			<a href="https://www.netlify.com/" target="_blank" rel="noopener">Netlify</a>
		</dd>
	</div>
	<div>
		<dt>{copy.apis}</dt>
		<dd>
			<ul>
				<li>
					{copy.apiCurrencies}
					<a href="https://www.freecurrencyapi.net/" target="_blank" rel="noopener"
						>https://www.freecurrencyapi.net/</a
					>
				</li>
				<li>
					{copy.apiTimeZones}
					<a
						href="https://www.abstractapi.com/time-date-timezone-api"
						target="_blank"
						rel="noopener">https://www.abstractapi.com/time-date-timezone-api</a
					>
				</li>
			</ul>
		</dd>
	</div>
	<div>
		<dt>{copy.tracking}</dt>
		<dd>Nothing. Niente. Nada. Nichts.</dd>
	</div>
</dl>

<style>
	div + div {
		margin-block-start: 1.5em;
	}

	dt {
		font-weight: 800;
		color: var(--color-accent);
	}

	ul {
		margin-inline-start: 1em;
	}
</style>
