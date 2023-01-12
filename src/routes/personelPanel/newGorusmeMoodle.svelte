<script>
	import Moodle from '$lib/moodle.svelte';

	export let showModal = false;
	export let gorusmeKanalları;
	export let gorusmeDurumları;

	const newGoursmeButtonClick = () => {
		showModal = !showModal;
	};

	let fileContent;

	function readFileContent(e) {
		var file = e.target.files[0];
		var reader = new FileReader();
		reader.readAsBinaryString(file);

		reader.onload = (readerEvent) => {
			fileContent = btoa(readerEvent.target.result);
		};
	}
</script>

<div>
	<Moodle {showModal} on:click={newGoursmeButtonClick}>
		<form id="newUserForm" action="/personelPanel?/newGorusme" method="POST">
			<h3>Yeni Görüşme Kaydı Oluştur</h3>

			<label for="gorusulenFirma">Görüşülen Firma</label>
			<input type="text" name="gorusulenFirma" /> <br />

			<label>Görüşme Kanalı</label>
			<select name="gorusmeKanalı">
				{#each gorusmeKanalları as gorusmeKanalı}
					<option value={gorusmeKanalı.id}>{gorusmeKanalı.isim}</option>
				{/each}
			</select><br />

			<label>Görüşme Durumu</label>
			<select name="gorusmeDurumu">
				{#each gorusmeDurumları as gorusmeDurumu}
					<option value={gorusmeDurumu.id}>{gorusmeDurumu.isim}</option>
				{/each}
			</select><br />

			<label for="verilenTeklif">Verilen Teklif</label>
			<input type="text" name="verilenTeklif" /> <br />

			<label for="file">Dosya</label>
			<input type="file" name="file" on:change={readFileContent} /> <br />

			<label for="gorusulenYetkili">Görüşülen Yetkili</label>
			<input type="text" name="gorusulenYetkili" /> <br />

			<label for="yetkiliTelefon">Yetkili Telefon</label>
			<input type="text" name="yetkiliTelefon" /> <br />

			<label for="yetkiliEMail">Yetkili E-Mail</label>
			<input type="text" name="yetkiliEMail" /> <br />

			<label for="aciklamalar">Açıklamalar</label>
			<textarea type="text" name="aciklamalar" /> <br />

			<input type="text" name="icerik" value={fileContent} style="display: none;" />

			<button>Görüşme Kaydı Oluştur</button>
		</form>
	</Moodle>
</div>

<style>
	:root {
		--newGorusmeInput-shadow-distance: 2px;
		--newGorusmeInput-shadow-blur: 6px;
		--newGorusmeInput-shadow-intesity: 50;

		--newGorusmeButton-shadow-distance: 2px;
		--newGorusmeButton-shadow-blur: 6px;
		--newGorusmeButton-shadow-intesity: 50;
	}

	#newUserForm {
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

	#newUserForm input:not(:nth-child(15)),
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

	#newUserForm button {
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
