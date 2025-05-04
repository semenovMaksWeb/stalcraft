import axios from "axios";

// Получить категории предметов 
// ХАДРКОД ибо не понятно как брать не все предметы игры
export function axiosGetCategoriesItem() {
    return ["containers", "weapon", "armor", "attachments"]
}

// Получить список предметов по категории
export async function axiosGetItemToCategoriesId(idCategories) {
    return (await axios.get(`https://stalcraft.wiki/_next/data/nbO-jOTBQNgXqpTNtG1Z7/ru/items/weapon.json?category=${idCategories}`)).data;
}

// Получить предмет информацию об бартере
export async function axiosGetItemBarterToId(idItem) {
    return (await axios.get(`https://stalcraft.wiki/api/exbo/item/barter/${idItem}`)).data;
}
