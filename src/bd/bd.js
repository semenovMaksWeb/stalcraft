import { Client } from 'pg'


const bd = new Client({
    user: 'postgres',
    password: '1',
    host: 'localhost',
    port: 5432,
    database: 'stalcraft',
})
bd.connect();

export async function saveItemBd(item) {
    try {

        const text = "INSERT INTO item(id, name, category) VALUES($1, $2, $3)";
        const values = [item.exbo_id, item.name.lines.ru, item.category]
        console.log(text, values);

        const res = await bd.query(text, values);
        console.log(res);
    } catch (e) {
        console.error(e);
    }

}