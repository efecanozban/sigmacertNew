import { getUserFromSession, GetGorusmeler, GetGorusmeKanallari, GetGorusmeDurumlari, InsertGorusme, UpdateGorusme, UpdateGorusmeWithPicture } from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';

let user;

export async function load({ cookies }) {
    user = await getUserFromSession(cookies.get("sessionId"))
    return {
        gorusmeler: await GetGorusmeler(user[0].personel_id),
        gorusmeKanallari: await GetGorusmeKanallari(),
        gorusmeDurumlari: await GetGorusmeDurumlari()
    }
}


/** @type {import('./$types').Actions} */
export const actions = {
    newGorusme: async ({ request }) => {
        const data = await request.formData()

        await InsertGorusme(
            user[0].personel_id,
            data.get("gorusulenFirma"),
            data.get("gorusmeKanalı"),
            data.get("gorusmeDurumu"),
            `data:image/png;base64,${data.get("icerik")}`,
            data.get("gorusulenYetkili"),
            data.get("yetkiliTelefon"),
            data.get("yetkiliEMail"),
            data.get("verilenTeklif"),
            data.get("aciklamalar")
        );
    },

    updateGorusme: async ({ request }) => {
        const data = await request.formData()
        if (data.get("icerik") !== 'undefined') {
            await UpdateGorusmeWithPicture(
                user[0].personel_id,
                data.get("gorusulenFirma"),
                data.get("gorusmeKanalı"),
                data.get("gorusmeDurumu"),
                `data:image/png;base64,${data.get("icerik")}`,
                data.get("gorusulenYetkili"),
                data.get("yetkiliTelefon"),
                data.get("yetkiliEMail"),
                data.get("verilenTeklif"),
                data.get("aciklamalar"),
                data.get("selectedRow")
            )
        }

        else {
            await UpdateGorusme(
                user[0].personel_id,
                data.get("gorusulenFirma"),
                data.get("gorusmeKanalı"),
                data.get("gorusmeDurumu"),
                data.get("gorusulenYetkili"),
                data.get("yetkiliTelefon"),
                data.get("yetkiliEMail"),
                data.get("verilenTeklif"),
                data.get("aciklamalar"),
                data.get("selectedRow")
            )
        }
    }
};

