<script>
	export let data;
	export let selectedPersonel;
</script>

<div class="personelStatistics">
	<p id="title" class="bold">{data[selectedPersonel]._personel}</p>

	<p>Toplam Görüşme Sayısı</p>
	<p class="bold">{data[selectedPersonel]._total_gorusme_count}</p>

	<p>Olumlu Sonuçlanan Görüşme Sayısı</p>
	<p class="bold">{data[selectedPersonel]._gorusme_counts[0]}</p>

	<p>Olumsuz Sonuçlanan Görüşme Sayısı</p>
	<p class="bold">{data[selectedPersonel]._gorusme_counts[1]}</p>

	<p>Beklemede Olan Görüşme Sayısı</p>
	<p class="bold">{data[selectedPersonel]._gorusme_counts[2]}</p>

	<p>Tekrarlanması Gereken Görüşme Sayısı</p>
	<p class="bold">{data[selectedPersonel]._gorusme_counts[3]}</p>
</div>

<style>
	#title {
		grid-column-start: 1;
		grid-column-end: 3;
		text-align: center;
	}

	.personelStatistics {
		display: grid;
		grid-template-rows: 15% 15% 15% 15% 15% 15%;
		grid-template-columns: 80% auto;
	}

	p {
		white-space: nowrap;
	}

	.bold {
		font-weight: 900;
		color: rgb(30, 30, 30);
	}
</style>
