<script>
	import { applyAction, enhance } from '$app/forms';
	import { panelName } from '$lib/store';
	panelName.set('Giriş Paneli');
</script>

<div class="mainContainer">
	<form id="authenticationForm" method="POST" action="./">
		<label for="kullaniciAdi">Kullanıcı Adı </label><br />
		<input type="text" name="kullaniciAdi" /> <br /><br />
		<label for="sifre">Şifre </label><br />
		<input type="text" name="sifre" /> <br /><br />
		<button>Giriş Yap</button>
	</form>
</div>

<style>
	.mainContainer {
		position: absolute;
		width: 100%;
		height: 80%;
	}

	#authenticationForm {
		padding: 20px;
		height: 150px;
		width: 250px;
		position: relative;
		top: 30%;
		margin-left: auto;
		margin-right: auto;
		border: 1px solid;
		display: block;
		border-radius: 5%;
	}

	#authenticationForm input {
		width: 233px;
	}

	#authenticationForm button {
		position: absolute;
		bottom: 20px;
		right: 30px;
		width: 30%;
	}
</style>
