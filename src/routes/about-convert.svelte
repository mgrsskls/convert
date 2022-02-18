<script>
	import Layout from "../components/layout.svelte";
	import i18n from "../i18n.js";
</script>

<Layout title={i18n.about.title}>
	<dl>
		<div>
			<dt>{i18n.about.createdBy}</dt>
			<dd>
				<a href="https://www.mgrossklaus.de" target="_blank" rel="noopener">Michael Großklaus</a>
			</dd>
		</div>
		<div>
			<dt>{i18n.about.repository}</dt>
			<dd>
				<a href="https://github.com/mgrsskls/convert" target="_blank" rel="noopener"
					>https://github.com/mgrsskls/convert</a
				>
			</dd>
		</div>
		<div>
			<dt>{i18n.about.builtWith}</dt>
			<dd>
				<ul>
					<li><a href="https://kit.svelte.dev/" target="_blank" rel="noopener">Svelte Kit</a></li>
					<li><a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a></li>
				</ul>
			</dd>
		</div>
		<div>
			<dt>{i18n.about.hosting}</dt>
			<dd>
				<a href="https://www.netlify.com/" target="_blank" rel="noopener">Netlify</a>
			</dd>
		</div>
		<div>
			<dt>{i18n.about.apis}</dt>
			<dd>
				<ul>
					<li>
						{i18n.about.apiCurrencies}
						<a href="https://www.freecurrencyapi.net/" target="_blank" rel="noopener"
							>https://www.freecurrencyapi.net/</a
						>
					</li>
					<li>
						{i18n.about.apiTimeZones}
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
			<dt>{i18n.about.tracking}</dt>
			<dd>Nothing. Niente. Nada. Nichts.</dd>
		</div>
	</dl>
</Layout>

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
