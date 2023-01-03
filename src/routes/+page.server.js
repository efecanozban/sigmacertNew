import { env } from '$env/dynamic/private'
import * as db from '$lib/server/database';
import { fail, redirect } from '@sveltejs/kit';

const users = await db.getQuerry(env.USERS_QUERRY)


/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData()
        if (checkUser(data)) {

        }
    }
};

function checkUser(data) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == data.get("kullaniciAdi") && users[i].password == data.get("sifre")) {
            if (users[i].type == 'M') { throw redirect(303, '/adminPanel'); }
            else if (users[i].type == 'P') { throw redirect(303, '/personelPanel'); }
        }
    }
}