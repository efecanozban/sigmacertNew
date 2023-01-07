<script>
	export let data;
	import { onMount } from 'svelte';
	import ImageMoodle from '$lib/imageMoodle.svelte';

	const tableHeadings = [
		'Görüşülen Firma',
		'Görüşme Tarihi',
		'Görüşme Kanalı',
		'Görüşme Durumu',
		'Yetkili Adı',
		'Yetkili Telefonu',
		'Yetkili E-mail',
		'Verilen Teklif',
		'Dosya',
		'Açıklamalar'
	];

	onMount(() => {
		document.querySelectorAll('.appointmentTableRow').forEach(function (row) {
			row.addEventListener('click', function () {
				if (row.classList.contains('selected')) {
					row.classList.remove('selected');
				} else {
					document.querySelectorAll('.selected').forEach(function (row) {
						row.classList.remove('selected');
					});
					row.classList.add('selected');
				}
			});
		});
	});
</script>

<table>
	<thead>
		<tr>
			{#each tableHeadings as heading}
				<th>{heading}</th>
			{/each}
		</tr>
	</thead>

	<tbody>
		{#each data as row}
			<tr class="appointmentTableRow">
				<td>{row.firma}</td>
				<td
					>{`${row.tarih.getDate()} / ${row.tarih.getMonth() + 1} / ${row.tarih.getFullYear()}`}</td
				>
				<td>{row.gorusme_kanali}</td>
				<td>{row.durum}</td>
				<td>{row.yetkili}</td>
				<td>{row.yetkili_telefon}</td>
				<td>{row.yetkili_email}</td>
				<td>{row.verilen_teklif}</td>
				{#if `${row.icerik}`.slice(-9) != 'undefined'}
					<ImageMoodle imagePath={row.icerik} />
				{:else}
					<td />
				{/if}
				<td>{row.aciklamalar}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	:root {
		--tableRow-shadow-distance: 1px;
		--tableRow-shadow-blur: 2px;
		--tableRow-shadow-intesity: 50;
	}

	table {
		width: 80vw;
		height: 65vh;
		margin: 4vh auto;
		border-radius: 16px;
	}

	tr {
		height: 3em;
		white-space: nowrap;
		border-radius: 12px;

		box-shadow: inset var(--tableRow-shadow-distance) var(--tableRow-shadow-distance)
				var(--tableRow-shadow-blur)
				rgb(
					calc(var(--color-R) - var(--tableRow-shadow-intesity)),
					calc(var(--color-G) - var(--tableRow-shadow-intesity)),
					calc(var(--color-B) - var(--tableRow-shadow-intesity))
				),
			inset calc(var(--tableRow-shadow-distance) * -1) calc(var(--tableRow-shadow-distance) * -1)
				var(--tableRow-shadow-blur)
				rgb(
					calc(var(--color-R) + var(--tableRow-shadow-intesity)),
					calc(var(--color-G) + var(--tableRow-shadow-intesity)),
					calc(var(--color-B) + var(--tableRow-shadow-intesity))
				);
	}
</style>
