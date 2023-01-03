import {env} from '$env/dynamic/private'
import * as db from '$lib/server/database';

export async function load() {
    return {
        querry: await db.getQuerry(env.PERSONEL_TABLE_QUERRY)
    }
}
