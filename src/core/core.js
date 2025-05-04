import { axiosGetCategoriesItem, axiosGetItemBarterToId, axiosGetItemToCategoriesId } from "../axios/viki.js";
import { getItemBarterId, getItemBd, resetBarterToItem, saveItemAndBarterBd, saveItemBarterBd, saveItemBd, updateItemBd } from "../bd/bd.js";

export async function getCategoriesItem() {
    return await axiosGetCategoriesItem();
}

// Получить все предметы с Wiki
export async function saveItemsCategoriesBd() {
    const categories = await getCategoriesItem();
    for (const categoriesItem of categories) {
        const data = await axiosGetItemToCategoriesId(categoriesItem);
        for (const item of data.pageProps.data) {
            await saveItemBd(item);
        }
    }
}


// сохранить информацию об бартере
export async function saveInfoBarterItem(barterList) {
    if (!barterList) {
        return;
    }

    for (const barterItem of barterList) {
        const itemBdList = await getItemBarterId(barterItem.exbo_id);
        if (!itemBdList[0]) {
            await saveItemBarterBd(barterItem);
        }
    }
}


// Сохранить информацию об предмете
export async function saveItemsInfo() {
    const itemList = await getItemBd();
    await resetBarterToItem();
    for (const item of itemList) {
        try {
            // Пропуск если предмет когда то был не бартерным
            console.log(item.is_barter);
            if (item.is_barter === false) {
                console.log("Без бартера в БД", item);
                continue;
            }

            const itemBarter = await axiosGetItemBarterToId(item.id);

            const barterItemList = itemBarter?.recipes[0]?.otherItems;
            await saveInfoBarterItem(barterItemList);

            // Сохранить связи бартер с предметом
            for (const barterItem of barterItemList) {

                const itemToBd = {
                    id_item: itemBarter.exbo_id,
                    id_barter: barterItem.exbo_id,
                    count: barterItem.amount
                }

                await saveItemAndBarterBd(itemToBd);
            }

            // Обновить более подробную инфу об предмете
            const itemUpdated = {
                id: itemBarter.exbo_id,
                baza: itemBarter.settlementTitles?.[0].ru,
                money: itemBarter.recipes?.[0]?.money,
                preItemId: itemBarter?.recipes[0]?.item?.exbo_id,
                is_barter: true,
            }

            await updateItemBd(itemUpdated);
            console.log("Завершено успешно!", item);


        } catch (e) {
            console.log(e);
            const itemUpdated = {
                id: item.id,
                baza: null,
                money: null,
                preItemId: null,
                is_barter: false,
            }
            await updateItemBd(itemUpdated);
            console.log("Без бартера", item);
        }
    }
}

// Определения бартера рекурсией 
// пока что не учитываются предметы, которые не требуются для крафта следующих стволов (их нет)
export async function getBarterAll() {
    const itemList = await getItemBd();
    for (const item of itemList) {
        item.count = 0;
    }

    function checkResurc(item, check = false) {
        const itemParent = itemList.find((e) => e.preitemid == item.id);
        if (!itemParent && item.preitemid && item.is_barter || check) {
            if (!check) {
                console.log(item.name);
            }
            const preItem = itemList.find((e) => e.id == item.preitemid);
            if (preItem) {
                preItem.count += 1;
                checkResurc(preItem, true);
            }
        }



    }

    for (const item of itemList) {
        checkResurc(item);
    }

    const objectGet = [];
    for (const item of itemList) {
        if (item.is_barter) {
            objectGet.push({ name: item.name, count: item.count })
        }
    }
    console.log(JSON.stringify(objectGet));

}