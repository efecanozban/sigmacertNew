<script>
	import GorusmelerTable from '$lib/components/personelPanel/gorusmelerTable.svelte';
	import NewGorusmeMoodle from '$lib/components/personelPanel/newGorusmeMoodle.svelte';
	import UpdateGorusmeMoodle from '$lib/components/personelPanel/updateGorusmeMoodle.svelte';
	// data consist of gorusmeler, gorusme_kanallari, gorusme_durumlari
	export let data;

	// currently selected gorusme on the gorusmeler table
	let selectedGorusme;
</script>

<div class="flex justify-center m-[6vh]">
	<button
		class="h-[4vh] w-[20vw] font-bold ml-[2vw] mr-[2vw] rounded-xl text-white text-2xl neomorphic-sm"
		on:click={function () {
			if (selectedGorusme) {
				document.getElementById('updateGorusmeMoodle').classList.remove('hidden');
			} else {
				alert('Lütfen önce düzenlemek istediğiniz görüşmeyi seçiniz');
			}
		}}>Görüşmeyi Düzenle</button
	>
	<button
		class="h-[4vh] w-[20vw] font-bold ml-[2vw] mr-[2vw] rounded-xl text-white text-2xl neomorphic-sm"
		on:click={function () {
			document.getElementById('newGorusmeMoodle').classList.remove('hidden');
		}}>Yeni Görüşme Kaydı Oluştur</button
	>
</div>

<NewGorusmeMoodle
	gorusmeDurumlari={data.gorusmeDurumlari}
	gorusmeKanallari={data.gorusmeKanallari}
/>

<UpdateGorusmeMoodle
	gorusmeDurumlari={data.gorusmeDurumlari}
	gorusmeKanallari={data.gorusmeKanallari}
	{selectedGorusme}
/>

<GorusmelerTable {data} bind:selectedGorusme />
