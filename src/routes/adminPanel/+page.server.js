import { SECRET_PERSONEL_TABLE_QUERRY, SECRET_PERSONEL_STATISTICS_QUERRY, SECRET_PERSONEL_STATISTICS_ALL_QUERRY } from '$env/static/private'
import * as db from '$lib/server/database';

export async function load() {
    return {
        appointments: await db.getQuerry(SECRET_PERSONEL_TABLE_QUERRY),
        statistics: await db.getQuerry(SECRET_PERSONEL_STATISTICS_QUERRY),
        statistics_status: await db.getQuerry(SECRET_PERSONEL_STATISTICS_ALL_QUERRY)
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData()
        console.log(data.get("sifre"))
        const querry = `insert into personel (isim, soyisim, telefon, e_mail)
        values(
            '${data.get("isim")}',
            '${data.get("soyisim")}',
            '${data.get("e-mail")}',
            '${data.get("telefon")}'
            
        );
        
        insert into users (username,password,type,personel_id)
        values (
            
            '${data.get("kullaniciAdi")}',
            '${data.get("sifre")}',
            'P', 
            (select id from personel where 
                 isim = '${data.get("isim")}' and
                soyisim = 'vs'
                ))`
        await db.getQuerry(querry);
    }
};
