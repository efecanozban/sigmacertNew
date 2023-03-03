import { CheckUser, CreateSession, DeleteSession } from '$lib/server/db.js'
import { redirect } from '@sveltejs/kit';

let sessionId;

export async function load({ cookies }) {
    sessionId = cookies.get("sessionId")
}

/** @type {import('./$types').Actions} */
export const actions = {
    // login action
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const username = data.get('kullaniciAdi');
        const password = data.get('sifre');
        // check if user is exists on db
        const res = await CheckUser(username, password);

        // if user exists, set a cookie with unique session id
        if (res.success) {
            cookies.set('sessionId', await CreateSession(res.user), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: false,
                maxAge: 60 * 60 * 24 * 30
            });
            switch (res.user[0].type) {
                case 'M':
                    throw redirect(303, "/adminPanel")
                    break;
                case 'P':
                    throw redirect(303, "/personelPanel")
                    break;
            }
        }

        // if there is no such user return an error message
        else {
            return { success: false, message: "no such user exists" };
        }
    },

    // logout action
    logout: async ({ cookies }) => {
        // delete the session both on cookies and db
        await DeleteSession(sessionId);
        cookies.delete('sessionId');
    }
}
