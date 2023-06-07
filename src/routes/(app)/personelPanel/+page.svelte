<script>
	import GorusmelerTable from '$lib/components/personelPanel/gorusmelerTable.svelte';
	import NewGorusmeMoodle from '$lib/components/personelPanel/newGorusmeMoodle.svelte';
	import UpdateGorusmeMoodle from '$lib/components/personelPanel/updateGorusmeMoodle.svelte';
	import ExportToCsvButton from '$lib/components/general/exportToCSVButton.svelte';
	import TableFilter from '$lib/components/general/tableFilter.svelte';

	import { onMount } from 'svelte';

	// data consist of gorusmeler, gorusme_kanallari, gorusme_durumlari
	export let data;
	let gorusmelerTable;
	let gorusmelerTableRows = [];

	// currently selected gorusme on the gorusmeler table
	let selectedGorusme;

	onMount(() => {
		// find gorusmeler table
		gorusmelerTable = document.getElementById('gorusmelerTable');

		[...gorusmelerTable.getElementsByTagName('tr')].forEach(function (row) {
			var dataRow = [];

			[...row.getElementsByTagName('th')].forEach(function (col, colIndex) {
				if (col.innerHTML != 'Dosya' && col.innerHTML != 'id') dataRow.push(col.innerHTML);
			});

			[...row.getElementsByTagName('td')].forEach(function (col, colIndex) {
				if (!col.classList.contains('hidden')) dataRow.push(col.innerHTML);
			});

			gorusmelerTableRows.push(dataRow);
		});
	});
</script>

<div class="flex justify-end mt-[2vw] mb-[2vw] w-[80vw] relative left-[10vw]">
	<ExportToCsvButton
		data={gorusmelerTableRows}
		dataType="ArrayData"
		class="h-[4vh] w-[8vw] font-bold ml-[2vw] rounded-md text-white text-lg"
	/>

	<TableFilter filterTable={gorusmelerTable} />

	<button
		class="h-[4vh] w-[8vw] font-bold ml-[1vw] bg-white rounded-md text-[#9598B7] text-lg"
		on:click={function () {
			console.log(selectedGorusme);
			if (selectedGorusme != null) {
				document.getElementById('updateGorusmeMoodle').classList.remove('hidden');
			} else {
				alert('Lütfen önce düzenlemek istediğiniz görüşmeyi seçiniz.');
			}
		}}
		>Kaydı Düzenle
	</button>

	<button
		class="h-[4vh] w-[8vw] font-bold ml-[1vw] bg-gradient-to-r from-blue-600 to-blue-800 rounded-md text-white text-lg"
		on:click={function () {
			document.getElementById('newGorusmeMoodle').classList.remove('hidden');
		}}>Yeni Kayıt</button
	>
</div>

<NewGorusmeMoodle
	gorusmeDurumlari={data.gorusmeDurumlari}
	gorusmeKanallari={data.gorusmeKanallari}
/>

<UpdateGorusmeMoodle
	gorusmeDurumlari={data.gorusmeDurumlari}
	gorusmeKanallari={data.gorusmeKanallari}
	{selectedGorusme}
/>

<GorusmelerTable {data} bind:selectedGorusme />
