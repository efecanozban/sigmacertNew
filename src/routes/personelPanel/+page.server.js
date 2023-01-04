import { env } from '$env/dynamic/private'
import * as db from '$lib/server/database';
import { userID, fileContent } from '$lib/store.js'

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
    default: async ({ request }) => {
        let newFileContent;
        const data = await request.formData()
        const querry = `call insert_gorusme(
            ${userId}, 
            '${data.get("gorusulenFirma")}',
            ${data.get("gorusmeKanalı")}, 
            ${data.get("gorusmeDurumu")}, 
            ${newFileContent}, 
            '${data.get("gorusulenYetkili")}',
            '${data.get("yetkiliTelefon")}',
            '${data.get("yetkiliEMail")}',
            '${data.get("verilenTeklif")}',
            '${data.get("aciklamalar")}')`
        console.log(newFileContent)
    }
};
