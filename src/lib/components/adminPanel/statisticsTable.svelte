<script>
	import { onMount } from 'svelte';
	export let data;
	export let selectedPersonel;
	export let selectedPersonelId;
	const tableHeadings = ['Personel', 'Görüşme Sayısı', 'Görüşme Oranı (%)'];

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
				selectedPersonelId = row.childNodes[6].id;

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

<table class=" border-r-2 border-dashed border-gray-400 border-separate block bg-white">
	<thead>
		<tr class=" leading-4">
			{#each tableHeadings as heading}
				<th class="font-normal text-[#383B74] pb-12">{heading}</th>
			{/each}
		</tr>

		<tr class="space" />
	</thead>

	<tbody>
		{#each data as row, i}
			<tr class="statisticsTableRow leading-8" id={i}>
				<td class="text-[#383B74] staticsTableCell whitespace-nowrap font-bold">{row._personel}</td>
				<td class="text-[#383B74] staticsTableCell whitespace-nowrap font-bold">{row._count}</td>
				<td class="text-[#383B74] staticsTableCell whitespace-nowrap font-bold"
					>{appointmentPercentages[i]}</td
				>
				<td style="display: none;" id={row._personel_id} />
			</tr>

			<tr class="space" />
		{/each}
	</tbody>
</table>

<style>
	td,
	th {
		padding: 2px 12px;
	}

	tr:not(:only-of-type):hover {
		height: 4em;
		background-color: rgba(0, 0, 0, 0.15);
	}
</style>
