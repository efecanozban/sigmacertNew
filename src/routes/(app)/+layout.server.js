import { getUserFromSession, GetFirmaName } from '$lib/server/db.js';

let user;

export async function load({ cookies }) {
    user = await getUserFromSession(cookies.get("sessionId"))
    return {
        firma: await GetFirmaName(user[0].firma_id)
    }
}