import { SECRET_POSTGRES_URL } from '$env/static/private';
import pkg from 'pg';
const { Client } = pkg;

export async function getQuerry(querry) {
    const client = new Client(SECRET_POSTGRES_URL);
    await client.connect();
    let res = await client.query(querry);
    await client.end();
    return res.rows
}