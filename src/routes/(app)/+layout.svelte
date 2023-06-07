<script>
	export let data;
	let { firma } = data;
</script>

<header>
	<div class="flex justify-between w-full h-[12vh] bg-white text-grey-100 text-xl font-semibold">
		<img src="LateralLogo.png" alt="" class="relative left-[10vw] h-24 top-2" />

		<div class="flex justify-end">
			<form action="/?/logout" method="post" class="pr-8 pt-8">
				<button class=" w-[2vw] h-[4vh] rounded-3xl text-[#9598B7]">
					<img src="logout.svg" alt="" />
				</button>
			</form>

			<h1 class="pr-[10vw] pt-8 text-grey-100 text-3xl font-bold h-[4vh] text-[#9598B7]">
				{firma[0].name.toUpperCase()}
			</h1>
		</div>
	</div>
</header>

<main>
	<slot />
</main>
