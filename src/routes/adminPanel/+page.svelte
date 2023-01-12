<script>
	import NewUserMoodle from './newUserMoodle.svelte';
	import AppointmentTable from './appointmentsTable.svelte';
	import StatisticsTable from './statisticsTable.svelte';
	import Piechart from './piechart.svelte';
	import StatisticsChart from './statisticsChart.svelte';
	import { panelName } from '$lib/store';
	panelName.set('Yönetici Paneli');
	export let data;
	let selectedPersonel = 0;
	let selectedPersonelId = '';
	let appointmentPercentages = [];
</script>

<NewUserMoodle bind:selectedPersonelId />

<div class="statisticsDiv">
	<StatisticsTable
		data={data.statistics}
		bind:selectedPersonel
		bind:appointmentPercentages
		bind:selectedPersonelId
	/>
	<Piechart data={data.statistics} bind:appointmentPercentages />
	<StatisticsChart data={data.statistics_status} bind:selectedPersonel />
</div>

<AppointmentTable data={data.appointments} />

<style>
	.statisticsDiv {
		display: grid;
		width: 80vw;
		margin: auto;
		grid-template-columns: 330px 4fr 360px;
		grid-gap: 1vw;
	}
</style>
