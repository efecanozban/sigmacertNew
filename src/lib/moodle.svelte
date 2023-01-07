<script>
	export let showModal;
</script>

{#if showModal}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="backDrop" on:click|self>
		<slot />
	</div>
{/if}

<style>
	.backDrop {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.8);
		align-items: center;
		justify-content: center;
		display: flex;
	}
</style>
