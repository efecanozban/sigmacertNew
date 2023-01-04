<script>
	import Table from './table.svelte';
	import NewGorusmeMoodle from './newGorusmeMoodle.svelte';
	import UpdateGorusmeMoodle from './updateGorusmeMoodle.svelte';
	import { panelName } from '$lib/store';
	panelName.set('Personel Paneli');
	export let data;

	let showNewGorusmeModal = false;
	let showUpdateGorusmeModal = false;
	let showDeleteGorusmeModal = false;
</script>

<NewGorusmeMoodle
	bind:showModal={showNewGorusmeModal}
	gorusmeDurumları={data.gorusmeDurumları}
	gorusmeKanalları={data.gorusmeKanalları}
/>
<UpdateGorusmeMoodle bind:showModal={showUpdateGorusmeModal} />

<div class="appointmentTable">
	<Table {data} />
</div>

<div class="appointmentsTableButtons">
	<button
		class="appointmentsTableButton"
		on:click={() => {
			showDeleteGorusmeModal = true;
		}}>Görüşmeyi Sil</button
	>
	<button
		class="appointmentsTableButton"
		on:click={function () {
			showUpdateGorusmeModal = true;
		}}>Görüşmeyi Düzenle</button
	>
	<button
		class="appointmentsTableButton"
		on:click={function () {
			showNewGorusmeModal = true;
		}}>Yeni Görüşme Kaydı Oluştur</button
	>
</div>

<style>
	.appointmentTable {
		margin-top: 3%;
		display: flex;
		justify-content: center;
		height: 70vh;
	}

	.appointmentsTableButtons {
		display: flex;
		justify-content: center;
		margin-top: 2%;
	}

	.appointmentsTableButton {
		height: 30px;
		width: 300px;
		margin: auto 20px;
	}
</style>
