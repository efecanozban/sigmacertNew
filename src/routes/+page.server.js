import { SECRET_USERS_QUERRY } from '$env/static/private'
import * as db from '$lib/server/database';
import { fail, redirect } from '@sveltejs/kit';
import { userID, logedIn } from '$lib/store.js'

var users;

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        users = await db.getQuerry(SECRET_USERS_QUERRY)
        const data = await request.formData()
        checkUser(data)
    }
};

function checkUser(data) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == data.get("kullaniciAdi") && users[i].password == data.get("sifre")) {
            if (users[i].type == 'M') {
                logedIn.set("m");
                throw redirect(303, '/adminPanel');
            }
            else if (users[i].type == 'P') {
                logedIn.set("p");
                userID.set(users[i].personel_id)
                throw redirect(303, '/personelPanel');
            }
        }

        else {
            logedIn.set(0);
        }
    }
}