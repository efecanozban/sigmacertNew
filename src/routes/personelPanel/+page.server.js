import { SECRET_GORUSME_KANALI_QUERRY, SECRET_GORUSME_DURUMU_QUERRY } from '$env/static/private'
import * as db from '$lib/server/database';
import { userID, logedIn } from '$lib/store.js'
import { redirect } from '@sveltejs/kit';

let userId;
userID.subscribe(value => {
    userId = value;
});

let logedin;
logedIn.subscribe(value => {
    logedin = value;
});


export async function load() {
    if (logedin != "p") {
        throw redirect(303, '/')
    }

    const gorusmelerQuerry = `select concat(personel.isim,' ', personel.soyisim) as personel,gorusmeler.firma, gorusmeler.tarih,gorusmeler.yetkili,gorusmeler.yetkili_telefon,gorusmeler.yetkili_email,gorusmeler.verilen_teklif,iletisim_yolu.isim as gorusme_kanali,durum.isim as durum,dosya.icerik,gorusmeler.aciklamalar,gorusmeler.id from gorusmeler left join personel on gorusmeler.personel_id = personel.id left join iletisim_yolu on gorusmeler.iletisim_yolu_id = iletisim_yolu.id left join durum on durum.id = gorusmeler.durum_id left join dosya on dosya.id = gorusmeler.dosya_id where personel_id = ${userId}`;

    return {

        gorusmeler: await db.getQuerry(gorusmelerQuerry),
        gorusmeKanalları: await db.getQuerry(SECRET_GORUSME_KANALI_QUERRY),
        gorusmeDurumları: await db.getQuerry(SECRET_GORUSME_DURUMU_QUERRY)
    }
}


/** @type {import('./$types').Actions} */
export const actions = {
    newGorusme: async ({ request }) => {
        const data = await request.formData()
        const querry = `call insert_gorusme(
            ${userId}, 
            '${data.get("gorusulenFirma")}',
            ${data.get("gorusmeKanalı")}, 
            ${data.get("gorusmeDurumu")}, 
            'data:image/png;base64,${data.get("icerik")}', 
            '${data.get("gorusulenYetkili")}',
            '${data.get("yetkiliTelefon")}',
            '${data.get("yetkiliEMail")}',
            '${data.get("verilenTeklif")}',
            '${data.get("aciklamalar")}')`
        db.getQuerry(querry);
    },

    deleteGorusme: async ({ request }) => {
        const data = await request.formData()
        const querry = `delete from gorusmeler where id = ${data.get("selectedRow")}`
        db.getQuerry(querry)
    },

    updateGorusme: async ({ request }) => {
        const data = await request.formData()

        if (data.get("selectedRow") !== 'undefined') {
            let querry;
            if (data.get("icerik") !== 'undefined') {
                querry = ` call update_gorusme(
                    ${userId}, 
                    '${data.get("gorusulenFirma")}',
                    ${data.get("gorusmeKanalı")}, 
                    ${data.get("gorusmeDurumu")}, 
                    'data:image/png;base64,${data.get("icerik")}', 
                    '${data.get("gorusulenYetkili")}',
                    '${data.get("yetkiliTelefon")}',
                    '${data.get("yetkiliEMail")}',
                    '${data.get("verilenTeklif")}',
                    '${data.get("aciklamalar")}',
                    ${data.get("selectedRow")}
                )`
            }

            else {
                querry = ` call update_gorusme(
                    ${userId}, 
                    '${data.get("gorusulenFirma")}',
                    ${data.get("gorusmeKanalı")}, 
                    ${data.get("gorusmeDurumu")}, 
                    '${data.get("gorusulenYetkili")}',
                    '${data.get("yetkiliTelefon")}',
                    '${data.get("yetkiliEMail")}',
                    '${data.get("verilenTeklif")}',
                    '${data.get("aciklamalar")}',
                    ${data.get("selectedRow")}
                )`
            }

            db.getQuerry(querry)
        }
    }
};
