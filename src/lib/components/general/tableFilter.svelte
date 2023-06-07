<script>
	import { onMount } from 'svelte';

	export let filterTable;
	let filterText;

	let filterInput;
	let filterButton;

	onMount(() => {
		filterInput = document.getElementById('filterInput');
		filterButton = document.getElementById('filterButton');
	});

	function toggleFilterMode() {
		if (filterInput.classList.contains('hidden')) {
			filterButton.classList.add('hidden');
			filterInput.classList.remove('hidden');
		} else {
			filterButton.classList.remove('hidden');
			filterInput.classList.add('hidden');
		}
	}

	function filterAppointments() {
		[...filterTable.getElementsByTagName('tr')].forEach((row, i) => {
			if (i != 0 && !row.classList.contains('spacer')) {
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

		toggleFilterMode();
	}
</script>

<button
	id="filterButton"
	class="h-[4vh] w-[8vw] ml-[1vw] bg-white rounded-md text-[#9598B7] font-bold text-lg"
	on:click={toggleFilterMode}>Filtrele</button
>

<form on:submit|preventDefault={filterAppointments}>
	<div class="hidden  ml-[1vw] pl-2" id="filterInput">
		<input
			class="h-[4vh] w-[4vw] bg-white rounded-md text-grey-50 text-lg"
			type="text"
			name="appointmentFilter"
			bind:value={filterText}
		/>
		<button
			class="h-[4vh] w-[3.5vw] bg-white rounded-md ml-[0.5vw] text-gray-400 font-bold text-lg"
		>
			Filtrele
		</button>
	</div>
</form>
