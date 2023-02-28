<script>
	import { onMount } from 'svelte';
	export let selectedPersonelId;

	var newUserMoodle;
	onMount(() => {
		newUserMoodle = document.getElementById('newUserMoodle');
		deleteUserButton = document.getElementById('deleteUserButton');
		document.getElementsByTagName('body')[0].addEventListener('click', function (e) {
			if (e.srcElement.id != 'deleteUserButton') {
				deleteUserWarned = false;
				deleteUserButton.innerHTML = 'Kullanıcı Sil';
				deleteUserButton.style.backgroundColor = 'rgb(209,213,219)';
			}
		});
	});

	let deleteUserButton;
	let deleteUserWarned = false;

	function WarnDeleteUser() {
		if (deleteUserWarned) {
			document.getElementById('deleteUserForm').submit();
			deleteUserWarned = false;
		} else {
			deleteUserWarned = true;
			deleteUserButton.innerHTML = 'Emin Misiniz';
			deleteUserButton.style.backgroundColor = 'red';
		}
	}

	// in order to reduce closing the moodle accidentally, implement a closing warning for moodle
	let moodleClosingWarned = false;

	const toggleNewUserMoodle = () => {
		if (newUserMoodle.classList.contains('hidden')) {
			newUserMoodle.classList.remove('hidden');
			moodleClosingWarned = false;
		} else {
			if (moodleClosingWarned) {
				newUserMoodle.classList.add('hidden');
			} else {
				moodleClosingWarned = true;
			}
		}
	};
</script>

<div class="w-full flex justify-end">
	<!-- Delete User Form -->
	<form id="deleteUserForm" action="/adminPanel?/deleteUser" method="POST">
		<input class="hidden" type="text" name="selectedPersonel" bind:value={selectedPersonelId} />
	</form>

	<!-- Delete User Button -->
	<button
		on:click={WarnDeleteUser}
		class="neomorphic-sm w-[15vw] m-[4vh_3vw_4vh_-1vw] rounded-xl text-white text-lg font-bold"
		id="deleteUserButton">Kullanıcı Sil</button
	>

	<button
		id="newUserButton"
		class="neomorphic-sm w-[15vw] m-[4vh_3vw_4vh_-1vw] rounded-xl text-white text-lg font-bold"
		on:click={toggleNewUserMoodle}>Yeni Kullanıcı Oluştur</button
	>
</div>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="newUserMoodle" class="backdrop hidden" on:click|self={toggleNewUserMoodle}>
	<form
		class="h-[42vh] m-auto w-[30vw] relative top-[30vh] translate-y-[-50%] text-center rounded-xl bg-gray-300"
		id="newUserForm"
		method="POST"
		action="/adminPanel?/addUser"
	>
		<h3 class="col-span-3 text-2xl font-bold text-white m-12 relative top-6">
			Yeni Kullanıcı Oluştur
		</h3>

		<input class="rounded-xl pl-4 w-2/3 mb-4" type="text" name="isim" placeholder="İsim" /><br />

		<input class="rounded-xl pl-4 w-2/3 mb-4" type="text" name="soyisim" placeholder="Soyisim" /><br
		/>

		<input
			class="rounded-xl pl-4 w-2/3 mb-4"
			type="text"
			name="kullaniciAdi"
			placeholder="Kullanıcı Adı"
		/><br />

		<input class="rounded-xl pl-4 w-2/3 mb-4" type="text" name="sifre" placeholder="Şifre" /><br />

		<input class="rounded-xl pl-4 w-2/3 mb-4" type="text" name="e-mail" placeholder="E-mail" /><br
		/>

		<input class="rounded-xl pl-4 w-2/3 mb-4" type="text" name="telefon" placeholder="Telefon" /><br
		/>

		<button class="text-gray-700 font-bold text-lg w-2/3 mt-4 bg-white rounded-xl"
			>Kullanıcı Oluştur</button
		>
	</form>
</div>

<style>
	/*
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
	*/
</style>
