<script>
	import { onMount } from 'svelte';
	export let data;
	export let selectedPersonel;
	const tableHeadings = ['Personel', 'Toplam Görüşme Sayısı', 'Görüşme Oranı (%)'];

	export let appointmentPercentages;
	let sum = 0;

	for (let i = 0; i < data.length; i++) {
		sum += data[i]._count;
		appointmentPercentages[i] = data[i]._count;
	}

	for (let i = 0; i < data.length; i++) {
		appointmentPercentages[i] /= sum;
		appointmentPercentages[i] = Math.round((appointmentPercentages[i] + Number.EPSILON) * 100);
	}

	onMount(() => {
		document.querySelectorAll('.statisticsTableRow').forEach(function (row) {
			row.addEventListener('click', function () {
				selectedPersonel = row.id;

				if (row.classList.contains('selected')) {
					row.classList.remove('selected');
				} else {
					document.querySelectorAll('.selected').forEach(function (row) {
						row.classList.remove('selected');
					});
					row.classList.add('selected');
				}
			});
		});
	});
</script>

<table>
	<thead>
		<tr>
			{#each tableHeadings as heading}
				<th>{heading}</th>
			{/each}
		</tr>
	</thead>

	<tbody>
		{#each data as row, i}
			<tr class="statisticsTableRow" id={i}>
				<td class="staticsTableCell">{row._personel}</td>
				<td class="staticsTableCell">{row._count}</td>
				<td class="staticsTableCell">{appointmentPercentages[i]}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		border-collapse: collapse;
	}

	tr {
		height: 2rem;
	}

	td {
		white-space: nowrap;
	}

	td,
	th {
		padding: 2px 12px;
	}

	tr:not(:only-of-type):hover {
		height: 4em;
		background-color: rgba(0, 0, 0, 0.15);
	}
</style>
