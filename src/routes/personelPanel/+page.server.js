import { env } from '$env/dynamic/private'
import * as db from '$lib/server/database';
import { userID } from '$lib/store.js'

let userId;
userID.subscribe(value => {
    userId = value;
});


export async function load() {
    return {
        gorusmeler: await db.getQuerry(env.PERSONEL_TABLE_QUERRY),
        gorusmeKanalları: await db.getQuerry(env.GORUSME_KANALI_QUERRY),
        gorusmeDurumları: await db.getQuerry(env.GORUSME_DURUMU_QUERRY)
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
