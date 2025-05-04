// node src/main.js

import { saveItemsCategoriesBd } from "./core/core.js";

(async () => {
    console.log(1);    
    await saveItemsCategoriesBd();
})()