<script>
	import { ExportCSVFromTableData, ExportCSVFromArrayData } from '$lib/utils/ExportFile.js';

	export let data;
	export let dataType;

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

<button class="neomorphic-sm pl-4 pr-4 font-bold text-white text-center" on:click={ExportToCSV}
	>Tabloyu CSV formatında indir</button
>
