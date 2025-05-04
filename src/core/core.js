import { axiosGetCategoriesItem, axiosGetItemToCategoriesId } from "../axios/viki.js";
import { saveItemBd } from "../bd/bd.js";

export async function getCategoriesItem() {
    return await axiosGetCategoriesItem();
}

export async function saveItemsCategoriesBd() {
    const categories = await getCategoriesItem();
    for (const categoriesItem of categories) {
        const { data } = await axiosGetItemToCategoriesId(categoriesItem);
        for (const item of data.pageProps.data) {
            await saveItemBd(item);
        }
    }
}