<script>
	import Moodle from '$lib/moodle.svelte';
	export let selectedPersonelId;

	let showNewUserModal = false;

	const newUserButtonClick = () => {
		showNewUserModal = !showNewUserModal;
	};
</script>

<div class="newUser">
	<form id="deleteUserForm" action="/adminPanel?/deleteUser" method="POST" style="display:none">
		<input type="text" name="selectedPersonel" bind:value={selectedPersonelId} />
	</form>

	<button
		id="deleteUserButton"
		on:click={() => {
			let deleteForm = document.getElementById('deleteUserForm');
			deleteForm.submit();
		}}>Kullanıcı Sil</button
	>

	<button id="newUserButton" on:click={newUserButtonClick}>Yeni Kullanıcı Oluştur</button>

	<Moodle showModal={showNewUserModal} on:click={newUserButtonClick}>
		<form id="newUserForm" method="POST" action="/adminPanel?/addUser">
			<h3>Yeni Kullanıcı Oluştur</h3>

			<label for="isim">İsim </label>
			<input type="text" name="isim" /><br />

			<label for="soyisim">Soyisim </label>
			<input type="text" name="soyisim" /><br />

			<label for="kullaniciAdi">Kullanıcı Adı </label>
			<input type="text" name="kullaniciAdi" /><br />

			<label for="sifre">Şifre </label>
			<input type="text" name="sifre" /><br />

			<label for="e-mail">E-mail </label>
			<input type="text" name="e-mail" /><br />

			<label for="telefon">Telefon </label>
			<input type="text" name="telefon" /><br />

			<button>Kullanıcı Oluştur</button>
		</form>
	</Moodle>
</div>

<style>
	:root {
		--newUserButton-shadow-distance: 2px;
		--newUserButton-shadow-blur: 4px;
		--newUserButton-shadow-intesity: 50;

		--newUserMoodle-shadow-distance: 6px;
		--newUserMoodle-shadow-blur: 12px;
		--newUserMoodle-shadow-intesity: 70;

		--newUserInput-shadow-distance: 2px;
		--newUserInput-shadow-blur: 4px;
		--newUserInput-shadow-intesity: 50;
	}

	.newUser {
		width: 100vw;
		display: flex;
		justify-content: right;
	}

	#deleteUserButton,
	#newUserButton {
		width: 15vw;
		margin: 4vh 3vw 4vh -1vw;
		border: none;
		border-radius: 12px;
		background-color: var(--color);

		box-shadow: var(--newUserButton-shadow-distance) var(--newUserButton-shadow-distance)
				var(--newUserButton-shadow-blur)
				rgb(
					calc(var(--color-R) - var(--newUserButton-shadow-intesity)),
					calc(var(--color-G) - var(--newUserButton-shadow-intesity)),
					calc(var(--color-B) - var(--newUserButton-shadow-intesity))
				),
			calc(var(--newUserButton-shadow-distance) * -1)
				calc(var(--newUserButton-shadow-distance) * -1) var(--newUserButton-shadow-blur)
				rgb(
					calc(var(--color-R) + var(--newUserButton-shadow-intesity)),
					calc(var(--color-G) + var(--newUserButton-shadow-intesity)),
					calc(var(--color-B) + var(--newUserButton-shadow-intesity))
				);
	}

	#newUserForm {
		height: 60vh;
		margin: auto;
		width: 50vw;
		position: relative;
		top: 30%;
		transform: translateY(-50%);
		display: grid;
		grid-template-rows: 15% 12% 12% 12% 12% 12% 12%;
		grid-template-columns: 25% 60% auto;
		text-align: center;
		background-color: var(--color);
		border-radius: 5%;

		box-shadow: inset var(--newUserMoodle-shadow-distance) var(--newUserMoodle-shadow-distance)
				var(--newUserMoodle-shadow-blur)
				rgb(
					calc(var(--color-R) - var(--newUserMoodle-shadow-intesity)),
					calc(var(--color-G) - var(--newUserMoodle-shadow-intesity)),
					calc(var(--color-B) - var(--newUserMoodle-shadow-intesity))
				),
			inset calc(var(--newUserMoodle-shadow-distance) * -1)
				calc(var(--newUserMoodle-shadow-distance) * -1) var(--newUserMoodle-shadow-blur)
				rgb(
					calc(var(--color-R) + var(--newUserMoodle-shadow-intesity)),
					calc(var(--color-G) + var(--newUserMoodle-shadow-intesity)),
					calc(var(--color-B) + var(--newUserMoodle-shadow-intesity))
				);
	}

	#newUserForm h3 {
		grid-column-start: 1;
		grid-column-end: 4;
	}

	#newUserForm label {
		margin: auto auto auto auto;
	}

	#newUserForm input {
		margin: 10px 20px;
		border: none;
		border-radius: 12px;
		background-color: var(--color);

		box-shadow: inset var(--newUserInput-shadow-distance) var(--newUserInput-shadow-distance)
				var(--newUserInput-shadow-blur)
				rgb(
					calc(var(--color-R) - var(--newUserInput-shadow-intesity)),
					calc(var(--color-G) - var(--newUserInput-shadow-intesity)),
					calc(var(--color-B) - var(--newUserInput-shadow-intesity))
				),
			inset calc(var(--newUserInput-shadow-distance) * -1)
				calc(var(--newUserInput-shadow-distance) * -1) var(--newUserInput-shadow-blur)
				rgb(
					calc(var(--color-R) + var(--newUserInput-shadow-intesity)),
					calc(var(--color-G) + var(--newUserInput-shadow-intesity)),
					calc(var(--color-B) + var(--newUserInput-shadow-intesity))
				);
	}

	#newUserForm button {
		position: absolute;
		bottom: 2.5vh;
		right: 3vw;
		border-radius: 12px;
		border: none;
		width: 12vw;
		background-color: var(--color);

		box-shadow: var(--newUserInput-shadow-distance) var(--newUserInput-shadow-distance)
				var(--newUserInput-shadow-blur)
				rgb(
					calc(var(--color-R) - var(--newUserInput-shadow-intesity)),
					calc(var(--color-G) - var(--newUserInput-shadow-intesity)),
					calc(var(--color-B) - var(--newUserInput-shadow-intesity))
				),
			calc(var(--newUserInput-shadow-distance) * -1) calc(var(--newUserInput-shadow-distance) * -1)
				var(--newUserInput-shadow-blur)
				rgb(
					calc(var(--color-R) + var(--newUserInput-shadow-intesity)),
					calc(var(--color-G) + var(--newUserInput-shadow-intesity)),
					calc(var(--color-B) + var(--newUserInput-shadow-intesity))
				);
	}
</style>
