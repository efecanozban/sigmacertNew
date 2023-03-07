<script>
	export let filterTable;
	let filterText;

	function filterAppointments() {
		[...filterTable.getElementsByTagName('tr')].forEach((row, i) => {
			if (i != 0) {
				row.classList.add('hidden');
				[...row.getElementsByTagName('td')].forEach((td) => {
					if (
						!td.classList.contains('Dosya') &&
						!td.classList.contains('hidden') &&
						td.innerText.toLowerCase().includes(filterText.toLowerCase())
					) {
						row.classList.remove('hidden');
					}
				});
			}
		});
	}
</script>

<form class="" on:submit|preventDefault>
	<input
		class="rounded-full pl-4 w-32"
		type="text"
		name="appointmentFilter"
		bind:value={filterText}
	/>
	<button
		class="ml-[1vw] neomorphic-sm text-white font-bold rounded-full w-24 text-center"
		on:click={filterAppointments}>Filtrele</button
	>
</form>
