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

	let selectedPersonel;
</script>

<div class="appointmentsTableButtons">
	<form
		id="deleteButtonForm"
		action="/personelPanel?/deleteGorusme"
		method="POST"
		style="display:none"
	>
		<input type="text" name="selectedRow" bind:value={selectedPersonel} />
	</form>

	<button
		class="appointmentsTableButton"
		on:click={() => {
			showDeleteGorusmeModal = true;
			var deleteForm = document.getElementById('deleteButtonForm');
			deleteForm.submit();
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

<NewGorusmeMoodle
	bind:showModal={showNewGorusmeModal}
	gorusmeDurumları={data.gorusmeDurumları}
	gorusmeKanalları={data.gorusmeKanalları}
/>
<UpdateGorusmeMoodle
	bind:showModal={showUpdateGorusmeModal}
	gorusmeDurumları={data.gorusmeDurumları}
	gorusmeKanalları={data.gorusmeKanalları}
	{selectedPersonel}
/>

<Table {data} bind:selectedPersonel />

<style>
	:root {
		--appointmentsTableButton-shadow-distance: 3px;
		--appointmentsTableButton-shadow-blur: 6px;
		--appointmentsTableButton-shadow-intesity: 50;
	}

	.appointmentsTableButtons {
		display: flex;
		justify-content: center;
		margin: 6vh;
	}

	.appointmentsTableButton {
		height: 3ch;
		width: 20vw;
		margin: auto 2vw;
		font-weight: 600;

		border: none;
		border-radius: 12px;
		background: var(--color);
		box-shadow: var(--appointmentsTableButton-shadow-distance)
				var(--appointmentsTableButton-shadow-distance) var(--appointmentsTableButton-shadow-blur)
				rgb(
					calc(var(--color-R) - var(--appointmentsTableButton-shadow-intesity)),
					calc(var(--color-G) - var(--appointmentsTableButton-shadow-intesity)),
					calc(var(--color-B) - var(--appointmentsTableButton-shadow-intesity))
				),
			calc(var(--appointmentsTableButton-shadow-distance) * -1)
				calc(var(--appointmentsTableButton-shadow-distance) * -1)
				var(--appointmentsTableButton-shadow-blur)
				rgb(
					calc(var(--color-R) + var(--appointmentsTableButton-shadow-intesity)),
					calc(var(--color-G) + var(--appointmentsTableButton-shadow-intesity)),
					calc(var(--color-B) + var(--appointmentsTableButton-shadow-intesity))
				);
	}
</style>
