<script>
	import { onMount } from 'svelte';
	import { formatPhoneNumber } from '$lib/utils/stringModifiers.js';

	// data consist of gorusmeler, gorusme_kanallari, gorusme_durumlari
	export let data;
	export var selectedGorusme;

	let gorusmelerTable;

	// moodle that shown when an image icon is clicked
	let imageMoodle;
	function toggleImageMoodle() {
		imageMoodle.classList.contains('hidden')
			? imageMoodle.classList.remove('hidden')
			: imageMoodle.classList.add('hidden');
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
		gorusmelerTable = document.getElementById('gorusmelerTable');
	});

	const tableHeadings = [
		'ID',
		'Firma İsmi',
		'Tarih',
		'Kanal',
		'Durum',
		'Yetkili',
		'Yetkili Tel.',
		'Yetkili E-mail',
		'Verilen Teklif',
		'Dosya',
		'Açıklamalar'
	];
</script>

<!-- svelte-ignore a11y-missing-content -->
<a
	id="downloadContent"
	class="hidden"
	href={selectedGorusme?.getElementsByTagName('img')[0]?.src}
	download
/>

<table id="gorusmelerTable" class="w-[80vw] h-[60vh] m-auto rounded-xl block overflow-scroll">
	<thead>
		<tr>
			{#each tableHeadings as heading}
				<th class=" pr-16 whitespace-nowrap pb-4 text-[#383B74] text-bold text-md">{heading}</th>
			{/each}
		</tr>
	</thead>

	{#each data.gorusmeler as row, i}
		<tr class="gorusmeRow leading-[3rem] whitespace-nowrap  bg-[#ffffff]">
			<td class="rounded-l-md font-light text-sm text-[#9598B7]">{i + 1}</td>
			<td id="firma,{i + 1}" class="font-extrabold text-lg text-[#383B74]">{row.firma}</td>
			<td class="font-light text-sm text-[#9598B7]"
				>{`${row.tarih.getDate()} / ${row.tarih.getMonth() + 1} / ${row.tarih.getFullYear()}`}</td
			>
			<td class="font-light text-sm text-[#9598B7]" id="gorusmeKanali,{i + 1}"
				>{row.gorusme_kanali}</td
			>
			{#if row.durum == 'Olumlu Sonuçlandı'}
				<td class="font-light text-sm text-green-400" id="durum,{i + 1}">{row.durum}</td>
			{:else if row.durum == 'Olumsuz Sonuçlandı'}
				<td class="font-light text-sm text-red-400" id="durum,{i + 1}">{row.durum}</td>
			{:else}
				<td class="font-light text-sm text-yellow-400" id="durum,{i + 1}">{row.durum}</td>
			{/if}
			<td class="font-light text-sm text-[#9598B7]" id="yetkili,{i + 1}">{row.yetkili}</td>
			<td class="font-light text-sm text-[#9598B7]" id="yetkiliTelefon,{i + 1}"
				>{formatPhoneNumber(row.yetkili_telefon)}</td
			>
			<td class="font-light text-sm text-[#9598B7]" id="yetkiliEmail,{i + 1}"
				>{row.yetkili_email}</td
			>
			<td class="font-light text-sm text-[#9598B7]" id="verilenTeklif,{i + 1}"
				>{row.verilen_teklif}</td
			>
			{#if `${row.icerik}`.slice(-9) != 'undefined'}
				<!-- Actual Image -->
				<img class="hidden" id="dosya" src={row.icerik} alt="içerik yok" />
				<!-- The Generic Icon -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<img class="max-h-7" src="imageIcon.png" alt="içerik yok" on:click={toggleImageMoodle} />
			{:else}
				<td />
			{/if}
			<td id="aciklamalar,{i + 1}" class="rounded-r-md">{row.aciklamalar}</td>
			<td class="hidden id">{row.id}</td>
		</tr>

		<tr class="spacer leading-3">&nbsp</tr>
	{/each}
</table>

<!-- Image Moodle -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="imageMoodle" class="backdrop hidden flex justify-center" on:click|self={toggleImageMoodle}>
	<img
		class="h-min max-h-[90vh] absolute left-[50vw] top-[40vh] translate-x-[-50%] translate-y-[-50%]"
		src={selectedGorusme?.getElementsByTagName('img')[0]?.src ?? '#'}
		alt=""
	/>

	<button
		class="absolute top-[5vh] h-12 w-48 text-white text-xl border-dotted border-white border-4 rounded-full whitespace-nowrap text-center"
		on:click={downloadContent}>Fotoğrafı indir</button
	>
</div>

<style>
	td {
		white-space: nowrap;
		font-weight: 600;
		padding-right: 3rem;
	}
</style>
