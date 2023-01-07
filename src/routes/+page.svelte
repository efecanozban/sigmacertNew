<script>
	import { panelName } from '$lib/store';
	panelName.set('Giriş Paneli');
</script>

<form id="authenticationForm" method="POST" action="./">
	<input type="text" name="kullaniciAdi" placeholder="Kullanıcı Adı" /> <br />
	<input type="text" name="sifre" placeholder="Şifre" /> <br />
	<button>Giriş Yap</button>
</form>

<style>
	:root {
		--authenticationForm-shadow-distance: 4px;
		--authenticationForm-shadow-blur: 8px;
		--authenticationForm-shadow-intesity: 40;

		--authenticationInput-shadow-distance: 3px;
		--authenticationInput-shadow-blur: 5px;
		--authenticationInput-shadow-intesity: 50;

		--authenticationButton-shadow-distance: 3px;
		--authenticationButton-shadow-blur: 5px;
		--authenticationButton-shadow-intesity: 50;
	}

	#authenticationForm {
		height: 65vh;
		width: 40vw;
		position: relative;
		top: 10vh;
		margin-left: auto;
		margin-right: auto;
		text-align: center;

		background-image: url('/favicon.png');
		background-size: 40vh auto;
		background-repeat: no-repeat;
		background-position: 50% 0;

		border-radius: 50px;

		box-shadow: var(--authenticationForm-shadow-distance) var(--authenticationForm-shadow-distance)
				var(--authenticationForm-shadow-blur)
				rgb(
					calc(var(--color-R) - var(--authenticationForm-shadow-intesity)),
					calc(var(--color-G) - var(--authenticationForm-shadow-intesity)),
					calc(var(--color-B) - var(--authenticationForm-shadow-intesity))
				),
			calc(var(--authenticationForm-shadow-distance) * -1)
				calc(var(--authenticationForm-shadow-distance) * -1) var(--authenticationForm-shadow-blur)
				rgb(
					calc(var(--color-R) + var(--authenticationForm-shadow-intesity)),
					calc(var(--color-G) + var(--authenticationForm-shadow-intesity)),
					calc(var(--color-B) + var(--authenticationForm-shadow-intesity))
				);
	}

	#authenticationForm input {
		padding-left: 20px;
		position: relative;
		border: none;
		width: 50%;
		height: 5.5%;
		top: 60%;
		margin-bottom: 3%;

		border-radius: 12px;
		background-color: var(--color);

		box-shadow: inset var(--authenticationInput-shadow-distance)
				var(--authenticationInput-shadow-distance) var(--authenticationInput-shadow-blur)
				rgb(
					calc(var(--color-R) - var(--authenticationInput-shadow-intesity)),
					calc(var(--color-G) - var(--authenticationInput-shadow-intesity)),
					calc(var(--color-B) - var(--authenticationInput-shadow-intesity))
				),
			inset calc(var(--authenticationInput-shadow-distance) * -1)
				calc(var(--authenticationInput-shadow-distance) * -1) var(--authenticationInput-shadow-blur)
				rgb(
					calc(var(--color-R) + var(--authenticationInput-shadow-intesity)),
					calc(var(--color-G) + var(--authenticationInput-shadow-intesity)),
					calc(var(--color-B) + var(--authenticationInput-shadow-intesity))
				);
	}

	#authenticationForm button {
		position: relative;
		top: 65%;
		height: 30px;
		width: 50%;

		border: none;
		border-radius: 12px;
		background: var(--color);
		box-shadow: var(--authenticationButton-shadow-distance)
				var(--authenticationButton-shadow-distance) var(--authenticationButton-shadow-blur)
				rgb(
					calc(var(--color-R) - var(--authenticationButton-shadow-intesity)),
					calc(var(--color-G) - var(--authenticationButton-shadow-intesity)),
					calc(var(--color-B) - var(--authenticationButton-shadow-intesity))
				),
			calc(var(--authenticationButton-shadow-distance) * -1)
				calc(var(--authenticationButton-shadow-distance) * -1)
				var(--authenticationButton-shadow-blur)
				rgb(
					calc(var(--color-R) + var(--authenticationButton-shadow-intesity)),
					calc(var(--color-G) + var(--authenticationButton-shadow-intesity)),
					calc(var(--color-B) + var(--authenticationButton-shadow-intesity))
				);
	}
</style>
