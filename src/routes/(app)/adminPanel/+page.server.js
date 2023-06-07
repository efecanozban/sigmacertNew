import { GetAppointments, GetStatistics, GetStatisticsStatus, InsertUser, DeleteUser, DeleteGorusme, getUserFromSession } from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';

let user;

export async function load({ cookies }) {
    user = await getUserFromSession(cookies.get("sessionId"))
    return {
        appointments: GetAppointments(user[0].firma_id),
        statistics: await GetStatistics(user[0].firma_id),
        statistics_status: await GetStatisticsStatus()
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    addUser: async ({ request }) => {
        const data = await request.formData()
        await InsertUser(
            data.get("isim"),
            data.get("soyisim"),
            data.get("e-mail"),
            data.get("telefon"),
            data.get("kullaniciAdi"),
            data.get("sifre")
        );
    },

    deleteUser: async ({ request }) => {
        const data = await request.formData()
        if (data.get('selectedPersonel')) {
            await DeleteUser(data.get('selectedPersonel'))
        }
    },

    deleteGorusme: async ({ request }) => {
        const data = await request.formData()
        await DeleteGorusme(data.get("gorusmeId"))
    }
};
