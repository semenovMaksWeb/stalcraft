import { Client } from 'pg'


const bd = new Client({
    user: 'postgres',
    password: '1',
    host: 'localhost',
    port: 5432,
    database: 'stalcraft',
})
bd.connect();

//  Сохранить предметы под крафт
export async function saveItemBd(item) {
    try {
        const text = "INSERT INTO item(id, name, category) VALUES($1, $2, $3)";
        const values = [item.exbo_id, item.name.lines.ru, item.category]
        await bd.query(text, values);
    } catch (e) {
        console.error(e);
    }
}

//  Получить все предметы под крафт
export async function getItemBd() {
    try {
        const text = "SELECT * FROM item";
        const values = []
        const res = await bd.query(text, values);
        return res.rows;
    } catch (e) {
        console.error(e);
    }
}

//  Сохранить предметы бартера

//  Получить 1 предмет бартера
export async function getItemBarterId(id) {
    try {
        const text = "SELECT * FROM barter_item WHERE id = $1";
        const values = [id]
        const res = await bd.query(text, values);
        return res.rows;
    } catch (e) {
        console.error(e);
    }
}

//  Сохранить предметы под крафт
export async function saveItemBarterBd(item) {
    try {
        const text = "INSERT INTO barter_item(id, name) VALUES($1, $2)";
        const values = [item.exbo_id, item.lines.ru]
        await bd.query(text, values);
    } catch (e) {
        console.error(e);
    }
}

//  Сохранить связь бартера и предмета с колво
export async function saveItemAndBarterBd(item) {
    try {
        const text = "INSERT INTO barter_count(id_item, id_barter, count) VALUES($1, $2, $3)";
        const values = [item.id_item, item.id_barter, item.count]
        await bd.query(text, values);
    } catch (e) {
        console.error(e);
    }
}

//  Сохранить связь кол-во необходимых бартеров
export async function saveBarterCountItemBd(item) {
    try {
        const text = "INSERT INTO barter_count_item(id_item, count) VALUES($1, $2)";
        const values = [item.id_item, item.count]
        await bd.query(text, values);
    } catch (e) {
        console.error(e);
    }
}

export async function updateItemBd(item) {
    try {
        const text = "UPDATE item SET baza = $1, money = $2, preItemId = $3, is_barter = $4 where id = $5";
        const values = [item.baza, item.money, item.preItemId, item.is_barter, item.id];
        await bd.query(text, values);
    } catch (e) {
        console.error(e);
    }
}

export async function resetBarterToItem() {
    try {
        const text = "DELETE FROM barter_count";
        const values = [];
        await bd.query(text, values);
    } catch (e) {
        console.error(e);
    }
}

export async function resetItemBd() {
    try {
        const text = "DELETE FROM item";
        const values = [];
        await bd.query(text, values);
    } catch (e) {
        console.error(e);
    }
}

export async function resetBarterCountItemBd() {
    try {
        const text = "DELETE FROM barter_count_item";
        const values = [];
        await bd.query(text, values);
    } catch (e) {
        console.error(e);
    }
}