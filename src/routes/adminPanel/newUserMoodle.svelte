<script>
	import Moodle from '$lib/moodle.svelte';

	let showNewUserModal = false;
	const newUserButtonClick = () => {
		showNewUserModal = !showNewUserModal;
	};
</script>

<div class="newUser">
	<button id="newUserButton" on:click={newUserButtonClick}>Yeni Kullanıcı Oluştur</button>

	<Moodle showModal={showNewUserModal} on:click={newUserButtonClick}>
		<form id="newUserForm" method="POST" action="/adminPanel">
			<p>Yeni Kullanıcı Oluştur</p>

			<label for="isim">İsim </label><br />
			<input type="text" name="isim" /> <br />

			<label for="soyisim">Soyisim </label><br />
			<input type="text" name="soyisim" /> <br />

			<label for="kullaniciAdi">Kullanıcı Adı </label><br />
			<input type="text" name="kullaniciAdi" /> <br />

			<label for="sifre">Şifre </label><br />
			<input type="text" name="sifre" /> <br />

			<label for="e-mail">E-mail </label><br />
			<input type="text" name="e-mail" /> <br />

			<label for="telefon">Telefon </label><br />
			<input type="text" name="telefon" /> <br />

			<button>Kullanıcı Oluştur</button>
		</form>
	</Moodle>
</div>

<style>
	.newUser {
		width: 100%;
		display: flex;
		justify-content: right;
	}

	#newUserButton {
		width: 15%;
		margin: 20px 3% 0px auto;
	}

	#newUserForm {
		height: 50%;
		position: relative;
		top: 50%;
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
