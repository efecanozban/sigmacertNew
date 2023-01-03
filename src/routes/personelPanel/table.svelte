<script>
	export let data;
	import { formatPhoneNumber } from '$lib/stringModifiers.js';
	const tableHeadings = [
		'Görüşülen Firma',
		'Görüşme Tarihi',
		'Görüşme Kanalı',
		' Görüşme Sonucu',
		'Yetkili Adı',
		'Yetkili Telefonu',
		'Yetkili E-mail',
		'Verilen Teklif',
		'İlgili Dosya',
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
		{#each data.querry as row}
			<tr>
				<td>{row.firma}</td>
				<td>{`${row.tarih.getDate()} / ${row.tarih.getMonth()} / ${row.tarih.getFullYear()}`}</td>
				<td>{row.gorusme_kanali}</td>
				<td>{row.durum}</td>
				<td>{row.yetkili}</td>
				<td>{formatPhoneNumber(row.yetkili_telefon)}</td>
				<td>{row.yetkili_email}</td>
				<td>{row.verilen_teklif}</td>
				<img src={row.icerik} alt="icerik" />
				<td>{row.aciklamalar}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		border-collapse: collapse;
		width: 80%;
		height: 100%;
		margin-left: auto;
		margin-right: auto;
	}

	tr:not(:only-of-type):hover {
		line-height: 4em;
		background-color: rgba(0, 0, 0, 0.2);
	}

	th {
		width: fit-content;
		white-space: nowrap;
		border: 1px solid black;
	}

	td {
		border: 1px solid black;
		white-space: nowrap;
		padding: 2px 12px;
	}

	img {
		width: 100%;
		height: auto;
	}

	img:hover {
		width: initial;
		height: initial;
	}
</style>
