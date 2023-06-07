<script>
	import NewUserMoodle from '$lib/components/adminPanel/newUserMoodle.svelte';
	import AppointmentTable from '$lib/components/adminPanel/appointmentsTable.svelte';
	import StatisticsTable from '$lib/components/adminPanel/statisticsTable.svelte';
	import Piechart from '$lib/components/adminPanel/piechart.svelte';
	import StatisticsChart from '$lib/components/adminPanel/statisticsChart.svelte';

	export let data;
	let selectedPersonel = 0;
	let selectedPersonelId = '';
	let appointmentPercentages = [];
</script>

<NewUserMoodle bind:selectedPersonelId />

<div
	class="grid w-[80vw] h-[40vh] m-auto grid-cols-[330px_4fr_360px] gap-[1vw] neomorphic-sm rounded-xl pt-2 bg-white"
>
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
