<script>
	export let data;
	export let selectedPersonel;
</script>

<div class="personelStatistics border-l-2 pl-2 border-dashed border-gray-400 grid">
	<p id="title" class="font-bold col-span-2 text-center">{data[selectedPersonel]._personel}</p>

	<p>Toplam Görüşme Sayısı</p>
	<p class="font-bold">{data[selectedPersonel]._total_gorusme_count}</p>

	<p>Olumlu Sonuçlanan Görüşme Sayısı</p>
	<p class="font-bold">{data[selectedPersonel]._gorusme_counts[0]}</p>

	<p>Olumsuz Sonuçlanan Görüşme Sayısı</p>
	<p class="font-bold">{data[selectedPersonel]._gorusme_counts[1]}</p>

	<p>Beklemede Olan Görüşme Sayısı</p>
	<p class="font-bold">{data[selectedPersonel]._gorusme_counts[2]}</p>

	<p>Tekrarlanması Gereken Görüşme Sayısı</p>
	<p class="font-bold">{data[selectedPersonel]._gorusme_counts[3]}</p>
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
