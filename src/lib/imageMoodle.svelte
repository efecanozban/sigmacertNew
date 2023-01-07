<script>
	import Moodle from './moodle.svelte';
	export let imagePath;
	let showImageMoodle = false;

	function imageMoodleClicked() {
		showImageMoodle = !showImageMoodle;
	}
</script>

<div on:click={imageMoodleClicked}>
	<img id="icon" src="imageIcon.png" alt="içerik yok" />
</div>

<Moodle showModal={showImageMoodle} on:click={imageMoodleClicked}>
	<img src={imagePath} alt="içerik yok" /></Moodle
>

<style>
	#icon {
		max-height: 40px;
		width: auto;
	}

	image {
	}
</style>
