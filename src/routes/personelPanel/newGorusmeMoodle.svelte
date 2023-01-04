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
			<p>Yeni Görüşme Kaydı Oluştur</p>
			<label for="gorusulenFirma">Görüşülen Firma</label> <br />
			<input type="text" name="gorusulenFirma" /> <br />

			Görüşme Kanalı <br /><select name="gorusmeKanalı">
				{#each gorusmeDurumları as gorusmeDurumu}
					<option value={gorusmeDurumu.id}>{gorusmeDurumu.isim}</option>
				{/each}
			</select><br />

			Görüşme Durumu <br /><select name="gorusmeDurumu">
				{#each gorusmeKanalları as gorusmeKanalı}
					<option value={gorusmeKanalı.id}>{gorusmeKanalı.isim}</option>
				{/each}
			</select><br />

			<label for="verilenTeklif">Verilen Teklif</label><br />
			<input type="text" name="verilenTeklif" /> <br />

			<input type="file" name="file" on:change={readFileContent} /> <br />

			<label for="gorusulenYetkili">Görüşülen Yetkili</label><br />
			<input type="text" name="gorusulenYetkili" /> <br />

			<label for="yetkiliTelefon">Yetkili Telefon</label><br />
			<input type="text" name="yetkiliTelefon" /> <br />

			<label for="yetkiliEMail">Yetkili E-Mail</label><br />
			<input type="text" name="yetkiliEMail" /> <br />

			<label for="aciklamalar">Açıklamalar</label><br />
			<input type="text" name="aciklamalar" /> <br />

			<input type="text" name="icerik" value={fileContent} style="display: none;" /> <br />

			<button>Görüşme Kaydı Oluştur</button>
		</form>
	</Moodle>
</div>

<style>
	#newUserForm {
		position: relative;
		height: 60vh;
		top: 40%;
		transform: translateY(-50%);
		display: block;
		background-color: rgb(255, 255, 255);
		border-radius: 5%;
	}

	#newUserForm p {
		position: relative;
		top: 10px;
		text-align: center;
		font-size: 1.4em;
	}

	#newUserForm input {
		margin: 10px 20px;
	}

	#newUserForm button {
		position: absolute;
		bottom: 20px;
		right: 30px;
	}
</style>
