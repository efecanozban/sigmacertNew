<script>
	import { onMount } from 'svelte';
	import { formatPhoneNumber } from '$lib/utils/stringModifiers.js';
	import TableFilter from '$lib/components/general/tableFilter.svelte';
	import ExportToCsvButton from '$lib/components/general/exportToCSVButton.svelte';
	// data consist of gorusmeler, gorusme_kanallari, gorusme_durumlari
	export let data;
	export var selectedGorusme;

	let gorusmelerTable;
	let gorusmelerTableRows = [];

	// moodle that shown when an image icon is clicked
	let imageMoodle;
	function toggleImageMoodle() {
		imageMoodle.classList.contains('hidden')
			? imageMoodle.classList.remove('hidden')
			: imageMoodle.classList.add('hidden');
	}

	onMount(() => {
		// store the selected gorusme when any row of gorusmeler table is clicked

		document.querySelectorAll('.gorusmeRow').forEach(function (row) {
			row.addEventListener('click', function () {
				selectedGorusme = row;

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

		// find imageMoodle
		imageMoodle = document.getElementById('imageMoodle');
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

		console.log(gorusmelerTableRows);
	});

	const tableHeadings = [
		'Satır No.',
		'Görüşülen Firma',
		'Görüşme Tarihi',
		'Görüşme Kanalı',
		'Görüşme Durumu',
		'Yetkili Adı',
		'Yetkili Telefonu',
		'Yetkili E-mail',
		'Verilen Teklif',
		'Dosya',
		'Açıklamalar'
	];
</script>

<div class="flex w-[79vw] m-auto mt-[4vh] mb-[2vh] justify-between">
	<ExportToCsvButton data={gorusmelerTableRows} dataType="ArrayData" />
	<TableFilter filterTable={gorusmelerTable} />
</div>

<table
	id="gorusmelerTable"
	class="w-[80vw] h-[60vh] m-auto rounded-xl neomorphic-sm block overflow-scroll"
>
	<thead>
		<tr>
			{#each tableHeadings as heading}
				<th class="font-normal pr-16">{heading}</th>
			{/each}
		</tr>
	</thead>

	{#each data.gorusmeler as row, i}
		<tr
			class="gorusmeRow leading-7 whitespace-nowrap rounded neomorphic-sm-inset hover:bg-black hover:bg-opacity-20 hover:leading-[4rem] "
		>
			<td>{i + 1}</td>
			<td id="firma,{i + 1}">{row.firma}</td>
			<td>{`${row.tarih.getDate()} / ${row.tarih.getMonth() + 1} / ${row.tarih.getFullYear()}`}</td>
			<td id="gorusmeKanali,{i + 1}">{row.gorusme_kanali}</td>
			<td id="durum,{i + 1}">{row.durum}</td>
			<td id="yetkili,{i + 1}">{row.yetkili}</td>
			<td id="yetkiliTelefon,{i + 1}">{formatPhoneNumber(row.yetkili_telefon)}</td>
			<td id="yetkiliEmail,{i + 1}">{row.yetkili_email}</td>
			<td id="verilenTeklif,{i + 1}">{row.verilen_teklif}</td>
			{#if `${row.icerik}`.slice(-9) != 'undefined'}
				<!-- Actual Image -->
				<img class="hidden" id="dosya" src={row.icerik} alt="içerik yok" />
				<!-- The Generic Icon -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<img class="max-h-7" src="imageIcon.png" alt="içerik yok" on:click={toggleImageMoodle} />
			{:else}
				<td />
			{/if}
			<td id="aciklamalar,{i + 1}">{row.aciklamalar}</td>
			<td class="hidden id">{row.id}</td>
		</tr>
	{/each}
</table>

<!-- Image Moodle -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="imageMoodle" class="backdrop hidden flex justify-center" on:click|self={toggleImageMoodle}>
	<a
		class="absolute top-[5vh] h-12 w-48 text-white text-xl border-dotted border-white border-4 rounded-full whitespace-nowrap text-center"
		href={selectedGorusme?.getElementsByTagName('img')[0]?.src ?? '#'}
		download>Fotoğrafı indir</a
	>

	<img
		class="h-min max-h-[90vh] absolute left-[50vw] top-[40vh] translate-x-[-50%] translate-y-[-50%]"
		src={selectedGorusme?.getElementsByTagName('img')[0]?.src ?? '#'}
		alt=""
	/>
</div>

<style>
	td {
		white-space: nowrap;
		font-weight: 600;
		padding-right: 3rem;
	}
</style>
