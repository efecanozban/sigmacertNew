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
	let appointmentPercentages = [];
</script>

<NewUserMoodle />

<div class="appointmentTableDiv">
	<AppointmentTable data={data.appointments} />
</div>

<div class="statisticsDiv">
	<StatisticsTable data={data.statistics} bind:selectedPersonel bind:appointmentPercentages />
	<Piechart data={data.statistics} bind:appointmentPercentages />
	<StatisticsChart data={data.statistics_status} bind:selectedPersonel />
</div>

<style>
	.appointmentTableDiv {
		margin-top: 2vh;
		display: flex;
		justify-content: center;
		margin-bottom: 30px;
	}
	.statisticsDiv {
		display: grid;
		width: 80%;
		margin-left: auto;
		margin-right: auto;
		grid-template-columns: 25% 49% 22%;
		grid-template-rows: 100%;
		grid-gap: 2%;
	}
</style>
