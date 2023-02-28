<script>
	export let data;
	import { onMount } from 'svelte';

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

	let imageMoodle;
	function toggleImageMoodle() {
		imageMoodle.classList.contains('hidden')
			? imageMoodle.classList.remove('hidden')
			: imageMoodle.classList.add('hidden');
	}

	let selectedGorusme;
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

	onMount(() => {
		document.querySelectorAll('.appointmentTableRow').forEach(function (row) {
			row.addEventListener('click', function () {
				if (row.classList.contains('selected')) {
					row.classList.remove('selected');
					deleteGorusmeButton.classList.add('hidden');
					deleteGorusmeWarned = false;
				} else {
					document.querySelectorAll('.selected').forEach(function (row) {
						row.classList.remove('selected');
					});
					row.classList.add('selected');
					selectedGorusme = row;
					deleteGorusmeWarned = false;
					deleteGorusmeButton.innerHTML = 'Görüşmeyi Sil';
					deleteGorusmeButton.classList.remove('hidden');
					deleteGorusmeButton.style.top =
						(row.getBoundingClientRect().top + window.scrollY).toString() + 'px';
				}
			});
		});

		// find imageMoodle
		imageMoodle = document.getElementById('imageMoodle');
		// find deleteGorusmeButton
		deleteGorusmeButton = document.getElementById('deleteGorusmeButton');
	});
</script>

<table class="w-[80vw] h-[60vh] mt-[4vh] m-auto rounded-xl block overflow-scroll">
	<thead>
		<tr class="neomorphic-sm-inset rounded-xl">
			{#each tableHeadings as heading}
				<th class="font-normal pr-16 pb-2">{heading}</th>
			{/each}
		</tr>
	</thead>

	<tbody>
		{#each data as row, i}
			<tr
				class="appointmentTableRow leading-7 whitespace-nowrap rounded-xl neomorphic-sm-inset hover:bg-black hover:bg-opacity-20 hover:leading-[4rem] "
			>
				<td>{i + 1}</td>
				<td>{row.personel}</td>
				<td>{row.firma}</td>
				<td
					>{`${row.tarih.getDate()} / ${row.tarih.getMonth() + 1} / ${row.tarih.getFullYear()}`}</td
				>
				<td>{row.gorusme_kanali}</td>
				<td>{row.durum}</td>
				<td>{row.yetkili}</td>
				<td>{row.yetkili_telefon}</td>
				<td>{row.yetkili_email}</td>
				<td>{row.verilen_teklif}</td>
				{#if `${row.icerik}`.slice(-9) != 'undefined'}
					<!-- Actual Image -->
					<img class="hidden" id="dosya" src={row.icerik} alt="içerik yok" />
					<!-- The Generic Icon -->
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<img class="max-h-7" src="imageIcon.png" alt="içerik yok" on:click={toggleImageMoodle} />
				{:else}
					<td />
				{/if}
				<td>{row.aciklamalar}</td>
				<td class="hidden id">{row.id}</td>
			</tr>
		{/each}
	</tbody>
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
	<a
		class="absolute top-[5vh] h-12 w-48 text-white text-xl border-dotted border-white border-4 rounded-full whitespace-nowrap text-center"
		href={selectedGorusme?.getElementsByTagName('img')[0].src}
		download>Fotoğrafı indir</a
	>

	<img
		class="h-min max-h-[90vh] absolute left-[50vw] top-[40vh] translate-x-[-50%] translate-y-[-50%]"
		src={selectedGorusme?.getElementsByTagName('img')[0]?.src ?? ''}
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
