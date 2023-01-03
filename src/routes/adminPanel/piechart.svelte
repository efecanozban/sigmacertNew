<script>
    export let data;
    export let appointmentPercentages;
    let colors = [];
    let colorStirngs = [];
    let conicGradientString ="";

    for (let i = colors.length; i < data.length; i++) {
        colors[i] =  `rgb(${Math.random()*160}, ${Math.random()*160}, ${Math.random()*160})`;
    }

    for (let i = 0; i < data.length; i++) {
        colorStirngs[i] = `color: ${colors[i]}`;
        appointmentPercentages[i + 1] += appointmentPercentages[i];
        conicGradientString += `${colors[i]} ${0}, ${colors[i]} ${appointmentPercentages[i]}%`;
        if (i != data.length-1) {conicGradientString += ","};
    }

    conicGradientString = `background: radial-gradient(circle closest-side, transparent 85%,rgb(255, 181, 181) 0), conic-gradient(${conicGradientString})`;


</script>

<figure class="pie-chart" style={conicGradientString}>
	<figcaption>
		{#each data as row,i}
        {row._personel}<span style= {colorStirngs[i]} ></span><br>
        {/each}
	</figcaption>
</figure>

<style>
    .pie-chart {
	margin: 0;
	outline: 2px solid black;
}
.pie-chart figcaption {
	text-align: right;
}

.pie-chart span:after {
	display: inline-block;
	content: "";
	width: 1.5em;
	margin-top: 0.4em;
	margin-right: 0.8em;
	height: 0.8em;
	border-radius: 0.2em;
	background: currentColor;
}
</style>