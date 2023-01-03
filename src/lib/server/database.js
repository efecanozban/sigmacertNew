import {env} from '$env/dynamic/private';
import {Client} from 'pg';

export async function getQuerry(querry) {
    const client = new Client(env.POSTGRES_URL);
    await client.connect();
    let res = await client.query(querry);
    await client.end();
    return  res.rows
}