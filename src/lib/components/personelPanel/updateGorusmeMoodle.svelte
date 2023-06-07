<script>
	import { noDashPhoneNumber } from '$lib/utils/stringModifiers.js';

	export let gorusmeKanallari;
	export let gorusmeDurumlari;
	export let selectedGorusme;

	var gorusulenFirma;
	var gorusme_Kanali;
	var gorusme_Durumu;
	var verilenTeklif;
	var yetkiliAdi;
	var yetkiliTelefon;
	var yetkiliEmail;
	var aciklamalar;

	$: rowNumber = selectedGorusme?.childNodes[0].innerHTML;

	$: if (rowNumber) {
		gorusulenFirma = document.getElementById(`firma,${rowNumber}`).innerHTML;
		gorusme_Kanali = document.getElementById(`gorusmeKanali,${rowNumber}`).innerHTML;
		gorusme_Durumu = document.getElementById(`durum,${rowNumber}`).innerHTML;
		verilenTeklif = document.getElementById(`verilenTeklif,${rowNumber}`).innerHTML;
		yetkiliAdi = document.getElementById(`yetkili,${rowNumber}`).innerHTML;
		yetkiliTelefon = document.getElementById(`yetkiliTelefon,${rowNumber}`).innerHTML;
		yetkiliEmail = document.getElementById(`yetkiliEmail,${rowNumber}`).innerHTML;
		aciklamalar = document.getElementById(`aciklamalar,${rowNumber}`).innerHTML;
	}

	let fileContent;

	function readFileContent(e) {
		var file = e.target.files[0];
		var reader = new FileReader();
		reader.readAsBinaryString(file);

		reader.onload = (readerEvent) => {
			fileContent = btoa(readerEvent.target.result);
		};
	}

	// in order to reduce closing the moodle accidentally, implement a closing warning for moodle
	let moodleClosingWarned = false;
	const closeUpdateGoursmeMoodle = () => {
		if (moodleClosingWarned) {
			document.getElementById('updateGorusmeMoodle').classList.add('hidden');
			moodleClosingWarned = false;
		} else {
			moodleClosingWarned = true;
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="hidden backdrop" id="updateGorusmeMoodle" on:click|self={closeUpdateGoursmeMoodle}>
	<form
		class="relative w-[30vw] h-[60vh] top-[40vh] bg-gray-300 rounded-xl text-center translate-y-[-50%] m-auto"
		id="updateUserForm"
		action="/personelPanel?/updateGorusme"
		method="POST"
	>
		<h3 class="relative mb-12 top-4 font-bold text-2xl text-white">Görüşme Kaydını Güncelle</h3>

		<input
			class="rounded-xl pl-4 w-2/3 mb-4"
			type="text"
			name="gorusulenFirma"
			placeholder="Görüşülen Firma"
			value={gorusulenFirma}
		/> <br />

		<select class="rounded-xl pl-4 w-2/3 mb-4" name="gorusmeKanalı">
			{#each gorusmeKanallari as gorusmeKanali}
				{#if gorusme_Kanali === gorusmeKanali.isim}
					<option value={gorusmeKanali.id} selected>{gorusmeKanali.isim}</option>
				{:else}
					<option value={gorusmeKanali.id}>{gorusmeKanali.isim}</option>
				{/if}
			{/each}
		</select><br />

		<select class="rounded-xl pl-4 w-2/3 mb-4" name="gorusmeDurumu">
			{#each gorusmeDurumlari as gorusmeDurumu}
				{#if gorusme_Durumu === gorusmeDurumu.isim}
					<option value={gorusmeDurumu.id} selected>{gorusmeDurumu.isim}</option>
				{:else}
					<option value={gorusmeDurumu.id}>{gorusmeDurumu.isim}</option>
				{/if}
			{/each}
		</select><br />

		<input
			class="rounded-xl pl-4 w-2/3 mb-4"
			type="text"
			name="verilenTeklif"
			placeholder="Verilen Teklif"
			value={verilenTeklif}
		/> <br />

		<input
			class="rounded-xl pl-4 w-2/3 mb-4"
			type="file"
			name="file"
			placeholder="Dosya"
			on:change={readFileContent}
		/> <br />

		<input
			class="rounded-xl pl-4 w-2/3 mb-4"
			type="text"
			name="gorusulenYetkili"
			placeholder="Görüşülen Yetkili"
			value={yetkiliAdi}
		/> <br />

		<input
			class="rounded-xl pl-4 w-2/3 mb-4"
			type="text"
			name="yetkiliTelefon"
			placeholder="Yetkili Telefon"
			value={noDashPhoneNumber(yetkiliTelefon)}
		/> <br />

		<input
			class="rounded-xl pl-4 w-2/3 mb-4"
			type="text"
			name="yetkiliEMail"
			placeholder="Yetkili E-mail"
			value={yetkiliEmail}
		/> <br />

		<textarea
			class="rounded-xl pl-4 w-2/3 mb-4"
			type="text"
			name="aciklamalar"
			placeholder="Açıklamalar"
			value={aciklamalar}
		/> <br />

		<input class="hidden" type="text" name="icerik" value={fileContent} /> <br />

		<input
			class="hidden"
			type="text"
			name="selectedRow"
			value={selectedGorusme?.getElementsByClassName('id')[0].innerHTML}
		/>

		<button class="text-gray-700 font-bold text-lg w-2/3 mt-4 bg-white rounded-xl"
			>Görüşme Kaydını Güncelle</button
		>
	</form>
</div>

<style>
	/*
	#updateUserForm {
		grid-template-rows: 10% 5% 5% 5% 5% 5% 5% 5% 5% 10% auto;
		grid-template-columns: 25% 60% auto;
	}

	h3 {
		grid-column-start: 1;
		grid-column-end: 4;
	}

	#updateUserForm input:not(:nth-child(15)),
	select,
	textarea {
		padding-left: 4%;
		border: none;
		border-radius: 12px;
		background-color: var(--color);

		box-shadow: inset var(--newGorusmeInput-shadow-distance) var(--newGorusmeInput-shadow-distance)
				var(--newGorusmeInput-shadow-blur)
				rgb(
					calc(var(--color-R) - var(--newGorusmeInput-shadow-intesity)),
					calc(var(--color-G) - var(--newGorusmeInput-shadow-intesity)),
					calc(var(--color-B) - var(--newGorusmeInput-shadow-intesity))
				),
			inset calc(var(--newGorusmeInput-shadow-distance) * -1)
				calc(var(--newGorusmeInput-shadow-distance) * -1) var(--newGorusmeInput-shadow-blur)
				rgb(
					calc(var(--color-R) + var(--newGorusmeInput-shadow-intesity)),
					calc(var(--color-G) + var(--newGorusmeInput-shadow-intesity)),
					calc(var(--color-B) + var(--newGorusmeInput-shadow-intesity))
				);
	}

	#updateUserForm button {
		position: absolute;
		bottom: 3vh;
		right: 2vw;
		width: 20vw;
		border: none;
		border-radius: 12px;
		background-color: var(--color);

		box-shadow: var(--newGorusmeButton-shadow-distance) var(--newGorusmeButton-shadow-distance)
				var(--newGorusmeButton-shadow-blur)
				rgb(
					calc(var(--color-R) - var(--newGorusmeButton-shadow-intesity)),
					calc(var(--color-G) - var(--newGorusmeButton-shadow-intesity)),
					calc(var(--color-B) - var(--newGorusmeButton-shadow-intesity))
				),
			calc(var(--newGorusmeButton-shadow-distance) * -1)
				calc(var(--newGorusmeButton-shadow-distance) * -1) var(--newGorusmeButton-shadow-blur)
				rgb(
					calc(var(--color-R) + var(--newGorusmeButton-shadow-intesity)),
					calc(var(--color-G) + var(--newGorusmeButton-shadow-intesity)),
					calc(var(--color-B) + var(--newGorusmeButton-shadow-intesity))
				);
	}
	*/
</style>
