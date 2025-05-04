// node src/main.js

import { getBarterAll, saveItemsCategoriesBd, saveItemsInfo } from "./core/core.js";

(async () => {
    console.log(1);
    // await saveItemsCategoriesBd();
    // await saveItemsInfo()
    await getBarterAll();
})()