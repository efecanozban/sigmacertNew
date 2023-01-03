<script>
    export let data;
    export let selectedPersonel;
</script>


<div class="personelStatistics">
    <div style="text-align: center;" class="gridItem" >
        <h2> {data[selectedPersonel]._personel} </h2>
    </div>

    <div class="gridItem">
        <p >Toplam Görüşme Sayısı</p>
        <p>{data[selectedPersonel]._total_gorusme_count}</p>
    </div>
    <div class="gridItem">
        <p>Olumlu Sonuçlanan Görüşme Sayısı</p>
        <p>{data[selectedPersonel]._gorusme_counts[0]}</p>
    </div>
    <div class="gridItem">
        <p>Olumsuz Sonuçlanan Görüşme Sayısı</p>
        <p>{data[selectedPersonel]._gorusme_counts[1]}</p>
    </div>
    <div class="gridItem">
        <p>Beklemede Olan Görüşme Sayısı</p>
        <p>{data[selectedPersonel]._gorusme_counts[2]}</p>
    </div>
    <div class="gridItem">
        <p>Tekrarlanması Gereken Görüşme Sayısı</p>
        <p>{data[selectedPersonel]._gorusme_counts[3]}</p>
    </div>
</div>

<style>
    .personelStatistics{
        border: 2px solid black;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 1/6% 1/6% 1/6% 1/6% 1/6% 1/6%;
    }

    .gridItem{
        display: grid;
        grid-template-columns: 90% 10%;
        margin: 0px 0px;
        border: 1px solid;
    }
</style>