<script>
	export let data;
	import { onMount } from 'svelte';
	import TableFilter from '$lib/components/general/tableFilter.svelte';
	import ExportToCsvButton from '$lib/components/general/exportToCSVButton.svelte';
	import { bubble } from 'svelte/internal';

	const tableHeadings = [
		'S. No',
		'Görüşme Yapan Personel',
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

	let appointmentsTable;
	let appointmentTableRows = [];
	data.forEach((row, i) =>
		appointmentTableRows.push({
			index: i + 1,
			personel: row.personel,
			firma: row.firma,
			gorusme_tarihi: `${row.tarih.getDate()} / ${
				row.tarih.getMonth() + 1
			} / ${row.tarih.getFullYear()}`,
			gorusme_kanali: row.gorusme_kanali,
			gorusme_durumu: row.durum,
			yetkili: row.yetkili,
			yetkili_telefonu: row.yetkili_telefon,
			yetkili_email: row.yetkili_email,
			verilen_teklif: row.verilen_teklif,
			dosya: row.icerik,
			aciklamalar: row.aciklamalar,
			id: row.id
		})
	);

	function FillAppointmentsTable(tableSortCriteria = 0, ascending = true) {
		// delete existing children except tr with th's
		while (appointmentsTable.childNodes.length > 1) {
			appointmentsTable.removeChild(appointmentsTable.lastElementChild);
		}

		appointmentTableRows
			.sort((row1, row2) =>
				Object.values(row1)[tableSortCriteria] > Object.values(row2)[tableSortCriteria]
					? ascending
						? 1
						: -1
					: ascending
					? -1
					: 1
			)
			.forEach((row) => {
				let new_tr = document.createElement('tr');
				new_tr.className =
					'appointmentTableRow leading-7 whitespace-nowrap rounded-xl neomorphic-sm-inset hover:bg-black hover:bg-opacity-20 hover:leading-[4rem] ';

				Object.entries(row).forEach((cell) => {
					let new_td = document.createElement('td');

					if (cell[0] != 'dosya') {
						new_td.innerHTML = cell[1];
						new_td.className = 'whitespace-nowrap font-bold pr-8';
						if (cell[0] == 'id') [(new_td.className = 'hidden id')];
					} else {
						let actual_img = document.createElement('img');
						actual_img.id = 'dosya';
						if (cell[1]?.split(',')?.[1] != 'undefined') {
							actual_img.src = `${cell[1]}`;
						}
						actual_img.className = 'hidden';

						let icon_img = document.createElement('img');
						icon_img.src = 'imageIcon.png';
						icon_img.className = 'max-h-7';
						icon_img.addEventListener('click', toggleImageMoodle);

						new_td.appendChild(actual_img);
						new_td.appendChild(icon_img);
						new_td.classList.add('Dosya');
					}

					new_tr.appendChild(new_td);
				});

				new_tr.addEventListener('click', function () {
					if (new_tr.classList.contains('selected')) {
						new_tr.classList.remove('selected');
						deleteGorusmeButton.classList.add('hidden');
						deleteGorusmeWarned = false;
					} else {
						document.querySelectorAll('.selected').forEach(function (row) {
							row.classList.remove('selected');
						});
						new_tr.classList.add('selected');
						selectedGorusme = new_tr;
						deleteGorusmeWarned = false;
						deleteGorusmeButton.innerHTML = 'Görüşmeyi Sil';
						deleteGorusmeButton.classList.remove('hidden');
						deleteGorusmeButton.style.top =
							(new_tr.getBoundingClientRect().top + window.scrollY).toString() + 'px';
					}
				});
				appointmentsTable.appendChild(new_tr);
			});
	}

	let lastSortedColumn = 0;
	let lastSortAscending = true;
	function SortTable(e) {
		let columnId = parseInt(e.srcElement.id[e.srcElement.id.length - 1]);
		if (lastSortedColumn != columnId) FillAppointmentsTable(columnId);
		else {
			FillAppointmentsTable(columnId, !lastSortAscending);
			lastSortAscending = !lastSortAscending;
		}
		lastSortedColumn = columnId;

		document
			.getElementById('appointmentsTableHeaderRow')
			.childNodes.forEach((th) => th.classList.add('font-normal'));
		e.srcElement.classList.remove('font-normal');
		e.srcElement.classList.add('font-bold');
	}

	let imageMoodle;
	function toggleImageMoodle() {
		imageMoodle.classList.contains('hidden')
			? imageMoodle.classList.remove('hidden')
			: imageMoodle.classList.add('hidden');
	}

	let selectedGorusme;
	$: console.log(selectedGorusme);
	let deleteGorusmeButton;
	let deleteGorusmeWarned = false;

	function WarnDeletion() {
		if (deleteGorusmeWarned) {
			document.getElementById('deleteGorusmeForm').submit();
			deleteGorusmeWarned = false;
		} else {
			deleteGorusmeWarned = true;
			deleteGorusmeButton.innerHTML = 'Emin Misiniz';
		}
	}

	function downloadContent() {
		console.log(selectedGorusme?.getElementsByTagName('img')[0].src);
		if (
			selectedGorusme?.getElementsByTagName('img')[0].src.slice(-4) != 'null' &&
			selectedGorusme?.getElementsByTagName('img')[0].src != ''
		) {
			document.getElementById('downloadContent').click();
		} else {
			alert('İndirilecek bir fotoğraf bulunamadı.');
		}
	}

	onMount(() => {
		// find appointmentsTable
		appointmentsTable = document.getElementById('appointmentsTable');
		// find imageMoodle
		imageMoodle = document.getElementById('imageMoodle');
		// find deleteGorusmeButton
		deleteGorusmeButton = document.getElementById('deleteGorusmeButton');
		// fill appointments table programatically
		FillAppointmentsTable(0);
	});
</script>

<!-- svelte-ignore a11y-missing-content -->
<a
	id="downloadContent"
	class="hidden"
	href={selectedGorusme?.getElementsByTagName('img')[0].src}
	download
/>

<!-- Table Filter -->
<div class="flex w-[79vw] m-auto mt-[4vh] mb-[2vh] justify-between ">
	<ExportToCsvButton data={appointmentTableRows} dataType="TableData" />
	<TableFilter filterTable={appointmentsTable} />
</div>

<!-- Appointments Table -->
<table id="appointmentsTable" class="w-[80vw] h-[60vh] m-auto rounded-xl block overflow-scroll">
	<thead>
		<tr id="appointmentsTableHeaderRow" class="neomorphic-sm-inset rounded-xl">
			{#each tableHeadings as heading, i}
				<th id="appointmentsTableHeading,{i}" on:click={SortTable} class="font-normal pr-16 pb-2"
					>{heading}</th
				>
			{/each}
		</tr>
	</thead>
</table>

<!-- Delete Gorusme Button -->
<button
	on:click={WarnDeletion}
	id="deleteGorusmeButton"
	class="hidden w-28 h-6 bg-red-500 absolute left-[90vw] text-sm rounded-xl text-white"
	>Görüşmeyi Sil</button
>

<!-- Delete Gorusme Form -->
<form id="deleteGorusmeForm" action="/adminPanel?/deleteGorusme" method="POST">
	<input
		class="hidden"
		type="text"
		name="gorusmeId"
		value={selectedGorusme?.getElementsByClassName('id')[0]?.innerHTML}
	/>
</form>

<!-- Image Moodle -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="imageMoodle" class="backdrop hidden flex justify-center" on:click|self={toggleImageMoodle}>
	<img
		class="h-min max-h-[90vh] absolute left-[50vw] top-[40vh] translate-x-[-50%] translate-y-[-50%]"
		src={selectedGorusme?.getElementsByTagName('img')[0]?.src ?? ''}
		alt=""
	/>

	<button
		class="absolute top-[5vh] h-12 w-48 text-white text-xl border-dotted border-white border-4 rounded-full whitespace-nowrap text-center"
		on:click={downloadContent}>Fotoğrafı indir</button
	>
</div>
