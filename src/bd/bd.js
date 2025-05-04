import { Client } from 'pg'

const bd = new Client({
    user: 'postgres',
    password: '1',
    host: 'localhost',
    port: 5334,
    database: 'stalcraft',
})

return bd;

export async function saveItemBd(item) {
    const text = "INSERT INTO users(id, name, category) VALUES($1, $2)";
    const values = [item.exbo_id, item.name.lines.ru, item.category]
    await client.query(text, values);
}