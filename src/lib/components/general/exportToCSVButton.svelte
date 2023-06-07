<script>
	import { ExportCSVFromTableData, ExportCSVFromArrayData } from '$lib/utils/ExportFile.js';

	export let data;
	export let dataType;

	console.log(data);

	function ExportToCSV() {
		switch (dataType) {
			case 'TableData':
				ExportCSVFromTableData(data);
				break;

			case 'ArrayData':
				ExportCSVFromArrayData(data);
				break;
		}
	}
</script>

<button
	class="h-[4vh] w-[8vw] ml-[1vw] font-bold rounded-md bg-white text-gray-400 text-lg text-center"
	on:click={ExportToCSV}>CSV İndir</button
>
