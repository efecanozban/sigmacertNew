<script>
	import Moodle from '$lib/moodle.svelte';
	import {
		gorusulenFirma,
		gorusme_Kanali,
		gorusme_Durumu,
		yetkiliAdi,
		yetkiliTelefon,
		yetkiliEmail,
		verilenTeklif,
		aciklamalar
	} from '$lib/store';
	import { noDashPhoneNumber } from '$lib/stringModifiers.js';

	export let showModal = false;
	export let gorusmeKanalları;
	export let gorusmeDurumları;
	export let selectedPersonel;

	let fileContent;

	function readFileContent(e) {
		var file = e.target.files[0];
		var reader = new FileReader();
		reader.readAsBinaryString(file);

		reader.onload = (readerEvent) => {
			fileContent = btoa(readerEvent.target.result);
		};
	}

	const updateGoursmeButtonClick = () => {
		showModal = !showModal;
	};
</script>

<div>
	<Moodle {showModal} on:click={updateGoursmeButtonClick}>
		<form id="updateUserForm" action="/personelPanel?/updateGorusme" method="POST">
			<h3>Görüşme Kaydını Güncelle</h3>

			<label for="gorusulenFirma">Görüşülen Firma </label>
			<input type="text" name="gorusulenFirma" value={$gorusulenFirma} /> <br />

			<label>Görüşme Kanalı</label><select name="gorusmeDurumu">
				{#each gorusmeKanalları as gorusmeKanalı}
					{#if $gorusme_Kanali === gorusmeKanalı.isim}
						<option value={gorusmeKanalı.id} selected>{gorusmeKanalı.isim}</option>
					{:else}
						<option value={gorusmeKanalı.id}>{gorusmeKanalı.isim}</option>
					{/if}
				{/each}
			</select><br />

			<label>Görüşme Durumu</label><select name="gorusmeKanalı">
				{#each gorusmeDurumları as gorusmeDurumu}
					{#if $gorusme_Durumu === gorusmeDurumu.isim}
						<option value={gorusmeDurumu.id} selected>{gorusmeDurumu.isim}</option>
					{:else}
						<option value={gorusmeDurumu.id}>{gorusmeDurumu.isim}</option>
					{/if}
				{/each}
			</select><br />

			<label for="verilenTeklif">Verilen Teklif</label>
			<input type="text" name="verilenTeklif" value={$verilenTeklif} /> <br />

			<label for="file">Dosya</label>
			<input type="file" name="file" on:change={readFileContent} /> <br />

			<label for="gorusulenYetkili">Görüşülen Yetkili</label>
			<input type="text" name="gorusulenYetkili" value={$yetkiliAdi} /> <br />

			<label for="yetkiliTelefon">Yetkili Telefon</label>
			<input type="text" name="yetkiliTelefon" value={noDashPhoneNumber($yetkiliTelefon)} /> <br />

			<label for="yetkiliEMail">Yetkili E-Mail</label>
			<input type="text" name="yetkiliEMail" value={$yetkiliEmail} /> <br />

			<label for="aciklamalar">Açıklamalar</label>
			<textarea type="text" name="aciklamalar" value={$aciklamalar} /> <br />

			<input type="text" name="icerik" value={fileContent} style="display: none;" /> <br />

			<input type="text" name="selectedRow" value={selectedPersonel} style="display: none;" />

			<button>Görüşme Kaydını Güncelle</button>
		</form>
	</Moodle>
</div>

<style>
	:root {
		--updateGorusmeInput-shadow-distance: 2px;
		--updateGorusmeInput-shadow-blur: 6px;
		--updateGorusmeInput-shadow-intesity: 50;

		--updateGorusmeInput-shadow-distance: 2px;
		--updateGorusmeInput-shadow-blur: 6px;
		--updateGorusmeInput-shadow-intesity: 50;
	}

	#updateUserForm {
		position: relative;
		height: 80vh;
		width: 50vw;
		top: 40vh;
		transform: translateY(-50%);
		background-color: rgb(255, 255, 255);
		border-radius: 5%;
		display: grid;
		grid-template-rows: 10% 5% 5% 5% 5% 5% 5% 5% 5% 10% auto;
		grid-template-columns: 25% 60% auto;
		grid-gap: 3%;
		text-align: center;
		background-color: var(--color);
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
</style>
