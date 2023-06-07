<script>
	export let data;
	export let selectedPersonel;
</script>

<div class="personelStatistics border-l-2 pl-2 border-dashed border-gray-400 grid">
	<p id="title" class="text-[#383B74] font-bold col-span-2 text-center text-lg">
		{data[selectedPersonel]._personel}
	</p>

	<p class="text-[#383B74]">Toplam Görüşme Sayısı</p>
	<p class="font-bold text-[#383B74]">{data[selectedPersonel]._total_gorusme_count}</p>

	<p class="text-green-400">Olumlu Sonuçlanan Görüşme Sayısı</p>
	<p class="font-bold text-green-400">{data[selectedPersonel]._gorusme_counts[0]}</p>

	<p class="text-red-400">Olumsuz Sonuçlanan Görüşme Sayısı</p>
	<p class="font-bold text-red-400">{data[selectedPersonel]._gorusme_counts[1]}</p>

	<p class="text-yellow-400">Beklemede Olan Görüşme Sayısı</p>
	<p class="font-bold text-yellow-400">{data[selectedPersonel]._gorusme_counts[2]}</p>

	<p class="text-yellow-400">Tekrarlanması Gereken Görüşme Sayısı</p>
	<p class="font-bold  text-yellow-400">{data[selectedPersonel]._gorusme_counts[3]}</p>
</div>

<style>
	.personelStatistics {
		display: grid;
		grid-template-rows: repeat(6, 15%);
		grid-template-columns: 80% auto;
	}

	p {
		white-space: nowrap;
	}
</style>
