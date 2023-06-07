<script>
	export let data;
	let { firma } = data;
</script>

<header>
	<div
		class="w-full h-[12vh] bg-grey-300 bg-[url('favicon.png')] bg-center bg-no-repeat  bg-[length:16vh_auto] neomorphic-sm text-white text-xl font-semibold"
	>
		<form action="/?/logout" method="post" class="inline-block relative left-12 top-1/3">
			<button class=" w-[12vw] h-[4vh] neomorphic-sm rounded-3xl">Çıkış Yap</button>
		</form>

		<h1 class="inline-block relative left-[15vw] top-1/3 text-white text-3xl font-bold h-[4vh]">
			Panel Name
		</h1>
		<h1 class="inline-block relative left-[50vw] top-1/3 text-white text-3xl font-bold h-[4vh]">
			{firma[0].name.toUpperCase()}
		</h1>
	</div>
</header>

<main>
	<slot />
</main>
