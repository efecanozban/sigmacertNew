<script>
	export let showModal;
</script>

{#if showModal}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="backDrop" on:click|self>
		<div class="moodleDiv">
			<slot />
		</div>
	</div>
{/if}

<style>
	.backDrop {
		width: 100%;
		height: 100%;
		position: fixed;
		background-color: rgba(0, 0, 0, 0.8);
	}

	.moodleDiv {
		width: 50%;
		height: 80%;
		margin: auto;
	}
</style>
