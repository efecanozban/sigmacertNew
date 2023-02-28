<script>
	export let data;
	export let appointmentPercentages;
	let colors = [];
	let colorStirngs = [];
	let conicGradientString = '';

	for (let i = colors.length; i < data.length; i++) {
		colors[i] = `rgb(${Math.random() * 160}, ${Math.random() * 160}, ${Math.random() * 160})`;
	}

	for (let i = 0; i < data.length; i++) {
		colorStirngs[i] = `color: ${colors[i]}`;
		appointmentPercentages[i + 1] += appointmentPercentages[i];
		conicGradientString += `${colors[i]} ${0}, ${colors[i]} ${appointmentPercentages[i]}%`;
		if (i != data.length - 1) {
			conicGradientString += ',';
		}
	}

	conicGradientString = `background: radial-gradient(circle closest-side, transparent 75%, rgb(209,213,219) 0), conic-gradient(${conicGradientString})`;
</script>

<figure class="pie-chart" style={conicGradientString}>
	<figcaption>
		{#each data as row, i}
			{row._personel}<span style={colorStirngs[i]} /><br />
		{/each}
	</figcaption>
</figure>

<style>
	:root {
		--pieChart-shadow-distance: 4px;
		--pieChart-shadow-blur: 8px;
		--pieChart-shadow-intesity: 50;
	}

	.pie-chart {
		margin: 0;
		padding: 20px 10px;
		border-radius: 25px;

		box-shadow: inset var(--pieChart-shadow-distance) var(--pieChart-shadow-distance)
				var(--pieChart-shadow-blur)
				rgb(
					calc(var(--color-R) - var(--pieChart-shadow-intesity)),
					calc(var(--color-G) - var(--pieChart-shadow-intesity)),
					calc(var(--color-B) - var(--pieChart-shadow-intesity))
				),
			inset calc(var(--pieChart-shadow-distance) * -1) calc(var(--pieChart-shadow-distance) * -1)
				var(--pieChart-shadow-blur)
				rgb(
					calc(var(--color-R) + var(--pieChart-shadow-intesity)),
					calc(var(--color-G) + var(--pieChart-shadow-intesity)),
					calc(var(--color-B) + var(--pieChart-shadow-intesity))
				);
	}

	.pie-chart figcaption {
		text-align: right;
	}

	.pie-chart span:after {
		margin-left: 0.5vw;
		display: inline-block;
		content: '';
		width: 1.5rem;
		margin-top: 0.5rem;
		margin-right: 0.8rem;
		height: 0.8rem;
		border-radius: 0.2rem;
		background: currentColor;
	}
</style>
