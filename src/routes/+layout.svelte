<script>
	import { panelName } from '$lib/store.js';
	import './global.css';
</script>

<header>
	<div class="header">
		<button id="exitButton" onclick="location.href = '/'">Çıkış Yap</button>
		<h1 id="SigmaCertTitle">SİGMACERT</h1>
		<h1 id="PanelTitle">{$panelName}</h1>
	</div>
</header>

<main>
	<slot />
</main>

<style>
	:root {
		--header-shadow-distance: 4px;
		--header-shadow-blur: 12px;
		--header-shadow-intesity: 50;

		--exitButton-shadow-distance: 2px;
		--exitButton-shadow-blur: 6px;
		--exitButton-shadow-intesity: 70;

		--active-shadow-distance: 2px;
		--active-shadow-blur: 6px;
		--active-shadow-intesity: 50;
	}

	.header {
		width: auto;
		height: 12vh;

		display: flex;

		background-image: url('favicon.png');
		background-position: center;
		background-repeat: no-repeat;
		background-size: contain;

		box-shadow: var(--header-shadow-distance) var(--header-shadow-distance)
				var(--header-shadow-blur)
				rgb(
					calc(var(--color-R) - var(--header-shadow-intesity)),
					calc(var(--color-G) - var(--header-shadow-intesity)),
					calc(var(--color-B) - var(--header-shadow-intesity))
				),
			calc(var(--header-shadow-distance) * -1) calc(var(--header-shadow-distance) * -1)
				var(--header-shadow-blur)
				rgb(
					calc(var(--color-R) + var(--header-shadow-intesity)),
					calc(var(--color-G) + var(--header-shadow-intesity)),
					calc(var(--color-B) + var(--header-shadow-intesity))
				);

		text-align: center;
		vertical-align: bottom;
	}

	#exitButton {
		height: 4vh;
		width: 12vw;

		margin: auto 0 auto 4vw;

		border: none;
		border-radius: 1vw;
		background-color: var(--color);

		box-shadow: var(--exitButton-shadow-distance) var(--exitButton-shadow-distance)
				var(--exitButton-shadow-blur)
				rgb(
					calc(var(--color-R) - var(--exitButton-shadow-intesity)),
					calc(var(--color-G) - var(--exitButton-shadow-intesity)),
					calc(var(--color-B) - var(--exitButton-shadow-intesity))
				),
			calc(var(--exitButton-shadow-distance) * -1) calc(var(--exitButton-shadow-distance) * -1)
				var(--exitButton-shadow-blur)
				rgb(
					calc(var(--color-R) + var(--exitButton-shadow-intesity)),
					calc(var(--color-G) + var(--exitButton-shadow-intesity)),
					calc(var(--color-B) + var(--exitButton-shadow-intesity))
				);
	}

	h1 {
		position: absolute;
		color: white;
		transform: translate(-50%, -50%);
		top: 2vh;
		padding: 0;
	}

	#SigmaCertTitle {
		left: 30vw;
		letter-spacing: 3px;
	}

	#PanelTitle {
		left: 75vw;
	}
</style>
