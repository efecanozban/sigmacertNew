<script>
	export let gorusmeKanallari;
	export let gorusmeDurumlari;

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

	function closeNewGorusmeMoodle() {
		if (moodleClosingWarned) {
			document.getElementById('newGorusmeMoodle').classList.add('hidden');
			moodleClosingWarned = false;
		} else {
			moodleClosingWarned = true;
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="newGorusmeMoodle" class="hidden backdrop" on:click|self={closeNewGorusmeMoodle}>
	<form
		class="relative w-[30vw] h-[60vh] top-[40vh] bg-[#F5F7FB] rounded-xl text-center translate-y-[-50%] m-auto"
		id="newUserForm"
		action="/personelPanel?/newGorusme"
		method="POST"
	>
		<h3 class="relative mb-12 top-4 font-bold text-2xl text-white">Yeni Görüşme Kaydı Oluştur</h3>

		<input
			class="rounded-xl pl-4 w-2/3 mb-4"
			type="text"
			name="gorusulenFirma"
			placeholder="Görüşülen Firma"
		/>
		<br />

		<select class="rounded-xl pl-4 w-2/3 mb-4" name="gorusmeKanalı">
			{#each gorusmeKanallari as gorusmeKanali}
				<option value={gorusmeKanali.id}>{gorusmeKanali.isim}</option>
			{/each}
		</select><br />

		<select class="rounded-xl pl-4 w-2/3 mb-4" name="gorusmeDurumu">
			{#each gorusmeDurumlari as gorusmeDurumu}
				<option value={gorusmeDurumu.id}>{gorusmeDurumu.isim}</option>
			{/each}
		</select><br />

		<input
			class="rounded-xl pl-4 w-2/3 mb-4"
			type="text"
			name="verilenTeklif"
			placeholder="Verilen Teklif"
		/> <br />

		<input class="w-2/3 mb-4" type="file" name="file" on:change={readFileContent} />
		<br />

		<input
			class="rounded-xl pl-4 w-2/3 mb-4"
			type="text"
			name="gorusulenYetkili"
			placeholder="Görüşülen Yetkili"
		/> <br />

		<input
			class="rounded-xl pl-4 w-2/3 mb-4"
			type="text"
			name="yetkiliTelefon"
			placeholder="Yetkili Telefon"
		/> <br />

		<input
			class="rounded-xl pl-4 w-2/3 mb-4"
			type="text"
			name="yetkiliEMail"
			placeholder="Yetkili E-Mail"
		/> <br />

		<textarea
			class="rounded-xl pl-4 w-2/3 mb-4"
			rows="3"
			type="text"
			name="aciklamalar"
			placeholder="Açıklamalar"
		/> <br />

		<input type="text" name="icerik" value={fileContent} style="display: none;" />

		<button class="text-gray-700 font-bold text-lg w-2/3 mt-4 bg-white rounded-xl"
			>Görüşme Kaydı Oluştur</button
		>
	</form>
</div>

<style>
	/*
	#newUserForm {
		grid-gap: 3%;
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
	*/
</style>
