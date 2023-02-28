import { GetAppointments, GetStatistics, GetStatisticsStatus, InsertUser, DeleteUser, DeleteGorusme } from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';

export async function load() {
    return {
        appointments: GetAppointments(),
        statistics: await GetStatistics(),
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
