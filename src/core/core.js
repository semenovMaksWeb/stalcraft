import { axiosGetCategoriesItem } from "../axios/viki";
import { saveItemBd } from "../bd/bd";

// export async function saveCategoriesItemBd() {
//     const wikiCategoires = await axiosGetCategoriesItem();
// }

export async function getCategoriesItem() {
    return await axiosGetCategoriesItem();
}



export async function saveItemsCategoriesBd() {
    const categories = await getCategoriesItem();
    console.log(categories);    
    for (const categoriesItem of categories.pageProps.data) {
        await saveItemBd(categoriesItem);
    }
}