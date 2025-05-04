import axios from "axios";

// Получить категории предметов 
// ХАДРКОД ибо не понятно как брать не все предметы игры
export function axiosGetCategoriesItem() {
    return ["containers", "weapon", "armor", "attachments"]
}

// Получить список предметов по категории
export function axiosGetItemToCategoriesId(idCategories) {
    return axios.get(`https://stalcraft.wiki/_next/data/nbO-jOTBQNgXqpTNtG1Z7/ru/items/weapon.json?category=${uuidCategories}`);
}

// Получить предмет информацию об бартере
export function axiosGetItemBarterToId(idItem) {
    return axios.get(`https://stalcraft.wiki/api/exbo/item/barter/${idItem}`);
}
