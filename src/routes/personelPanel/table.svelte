<script>
	import { onMount } from 'svelte';
	import { formatPhoneNumber } from '$lib/stringModifiers.js';
	import ImageMoodle from '$lib/imageMoodle.svelte';
	import {
		gorusulenFirma,
		gorusme_Kanali,
		gorusme_Durumu,
		yetkiliAdi,
		yetkiliTelefon,
		yetkiliEmail,
		verilenTeklif,
		aciklamalar
	} from '$lib/store';
	export let data;
	export var selectedPersonel;

	onMount(() => {
		document.querySelectorAll('.tableRow').forEach(function (row) {
			row.addEventListener('click', function () {
				selectedPersonel = row.id;

				gorusulenFirma.set(row.childNodes[2].innerHTML);
				gorusme_Kanali.set(row.childNodes[6].innerHTML);
				gorusme_Durumu.set(row.childNodes[8].innerHTML);
				yetkiliAdi.set(row.childNodes[10].innerHTML);
				yetkiliTelefon.set(row.childNodes[12].innerHTML);
				yetkiliEmail.set(row.childNodes[14].innerHTML);
				verilenTeklif.set(row.childNodes[16].innerHTML);
				aciklamalar.set(row.childNodes[20].innerHTML);

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

	const tableHeadings = [
		'Satır No.',
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
		{#each data.gorusmeler as row, i}
			<tr class="tableRow" id={row.id}>
				<td>{i}</td>
				<td>{row.firma}</td>
				<td
					>{`${row.tarih.getDate()} / ${row.tarih.getMonth() + 1} / ${row.tarih.getFullYear()}`}</td
				>
				<td>{row.gorusme_kanali}</td>
				<td>{row.durum}</td>
				<td>{row.yetkili}</td>
				<td>{formatPhoneNumber(row.yetkili_telefon)}</td>
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
		--appointmentsTable-shadow-distance: 3px;
		--appointmentsTable-shadow-blur: 6px;
		--appointmentsTable-shadow-intesity: 50;

		--tableRow-shadow-distance: 1px;
		--tableRow-shadow-blur: 2px;
		--tableRow-shadow-intesity: 50;
	}

	table {
		width: 80vw;
		height: 65vh;
		margin-left: auto;
		margin-right: auto;
		border-radius: 8px;
	}

	.tableRow:hover {
		height: 4rem;
		background-color: rgba(0, 0, 0, 0.15);
	}

	tr {
		height: 1.8rem;
		white-space: nowrap;
		border-radius: 8px;

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

	td {
		white-space: nowrap;
	}
</style>
