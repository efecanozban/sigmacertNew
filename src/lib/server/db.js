import { SECRET_POSTGRES_URL } from '$env/static/private';
import pkg from 'pg';
const { Client } = pkg;
import { v4 as uuidv4 } from "uuid"

async function GetQuery(querry) {
    const client = new Client(SECRET_POSTGRES_URL);
    await client.connect();
    let res = await client.query(querry);
    await client.end();
    return res.rows
}

export async function CheckUser(username, password) {
    const user = await GetQuery(`select * from users where username = '${username}' and password = '${password}'`)
    if (user == "") {
        return { success: false, user: null }
    }
    return { success: true, user: user }
}

export async function CreateSession(user) {
    const sessionID = uuidv4()
    await GetQuery(`insert into sessions (id, user_id) values ('${sessionID}', ${user[0].id})`)
    return sessionID
}

export async function getUserFromSession(sessionId) {
    return GetQuery(`select * from users where id = (select user_id from sessions where id = '${sessionId}') `)
}

export async function DeleteSession(sessionId) {
    return GetQuery(`delete from sessions where id = '${sessionId}'`)
}

export async function GetGorusmeler(userId) {
    return GetQuery(`select concat(personel.isim,' ', personel.soyisim) as personel, gorusmeler.firma, gorusmeler.tarih, gorusmeler.yetkili,
                     gorusmeler.yetkili_telefon, gorusmeler.yetkili_email, gorusmeler.verilen_teklif, iletisim_yolu.isim as gorusme_kanali,
                     durum.isim as durum, dosya.icerik, gorusmeler.aciklamalar ,gorusmeler.id from gorusmeler 
                     left join personel on gorusmeler.personel_id = personel.id 
                     left join iletisim_yolu on gorusmeler.iletisim_yolu_id = iletisim_yolu.id 
                     left join durum on durum.id = gorusmeler.durum_id 
                     left join dosya on dosya.id = gorusmeler.dosya_id
                    where personel_id = ${userId}`
    )
}

export async function GetGorusmeKanallari() {
    return GetQuery(`select * from iletisim_yolu`)
}

export async function GetGorusmeDurumlari() {
    return GetQuery(`select * from durum`)
}

export async function InsertGorusme(userId,
    gorusulen_firma, gorusme_kanali, gorusme_durumu, imageText, gorusulen_yetkili,
    yetkili_telefon, yetkili_email, verilen_teklif, aciklamalar) {
    return GetQuery(
        `call insert_gorusme(
            ${userId}, 
            '${gorusulen_firma}',
            ${gorusme_kanali}, 
            ${gorusme_durumu}, 
            '${imageText}', 
            '${gorusulen_yetkili}',
            '${yetkili_telefon}',
            '${yetkili_email}',
            '${verilen_teklif}',
            '${aciklamalar}')`
    )
}

export async function DeleteGorusme(gorusme_id) {
    return GetQuery(`delete from gorusmeler where id = ${gorusme_id}`)
}

export async function UpdateGorusmeWithPicture(userId,
    gorusulen_firma, gorusme_kanali, gorusme_durumu, image_text, gorusulen_yetkili,
    yetkili_telefon, yetkili_email, verilen_teklif, aciklamalar, gorusme_id) {
    return GetQuery(`
        call update_gorusme_with_picture(
            ${userId},
            '${gorusulen_firma}',
            ${gorusme_kanali},
            ${gorusme_durumu},
            '${image_text}',
            '${gorusulen_yetkili}',
            '${yetkili_telefon}',
            '${yetkili_email}',
            '${verilen_teklif}',
            '${aciklamalar}',
            ${gorusme_id})`
    )
}

export async function UpdateGorusme(userId,
    gorusulen_firma, gorusme_kanali, gorusme_durumu, gorusulen_yetkili,
    yetkili_telefon, yetkili_email, verilen_teklif, aciklamalar, gorusme_id) {
    return GetQuery(`
        call update_gorusme(
            ${userId},
            '${gorusulen_firma}',
            ${gorusme_kanali},
            ${gorusme_durumu},
            '${gorusulen_yetkili}',
            '${yetkili_telefon}',
            '${yetkili_email}',
            '${verilen_teklif}',
            '${aciklamalar}',
            ${gorusme_id})`
    )
}
export async function GetAppointments() {
    return GetQuery(`select concat(personel.isim,' ', personel.soyisim) as personel,
    gorusmeler.firma, gorusmeler.tarih, gorusmeler.yetkili, gorusmeler.yetkili_telefon, 
    gorusmeler.yetkili_email,gorusmeler.verilen_teklif, iletisim_yolu.isim as gorusme_kanali,
    durum.isim as durum, dosya.icerik, gorusmeler.aciklamalar, gorusmeler.id from gorusmeler 
    left join personel on gorusmeler.personel_id = personel.id 
    left join iletisim_yolu on gorusmeler.iletisim_yolu_id = iletisim_yolu.id 
    left join durum on durum.id = gorusmeler.durum_id 
    left join dosya on dosya.id = gorusmeler.dosya_id`)
}

export async function GetStatistics() {
    return GetQuery(`select * from get_personel_statistics()`)
}

export async function GetStatisticsStatus() {
    return GetQuery(`select * from get_all_gorusme_counts()`)
}

export async function InsertUser(isim, soyisim, eMail, telefon, kullaniciAdi, sifre) {
    return GetQuery(
        `insert into personel (isim, soyisim, e_mail, telefon)
    values(
        '${isim}',
        '${soyisim}',
        '${eMail}',
        '${telefon}'
    );
    
    insert into users (username,password,type,personel_id)
    values (
        '${kullaniciAdi}',
        '${sifre}',
        'P', 
        (select id from personel where 
             isim = '${isim}' and
            soyisim = '${soyisim}'
            ))`)
}

export async function DeleteUser(selectedPersonel) {
    return GetQuery(`delete from users where personel_id = ${selectedPersonel};
    delete from  personel where id = ${selectedPersonel};`)
}