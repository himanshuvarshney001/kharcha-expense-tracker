import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import expenseStore from "./expenseStore.js";
import type { Category } from "./type.js";

const rl = createInterface({ input: stdin, output: stdout });
let budget: string = await rl.question("Mahine ka budget? ");
while (true) {
    if (
        !Number.isNaN(Number(budget)) &&
        Number(budget) > 0
    )
        break;
    else console.log("Enter valid integer");
    budget = await rl.question("Mahine ka budget? ");
}
const store = new expenseStore(Number(budget));
let chalu = true;
while (chalu) {
    console.log("\n1. Kharcha add karo\n2. List dekho\n3. Report\n4. Exit");
    const choice = await rl.question("Choose karo: ");
    let attempt = 3;
    switch (choice) {
        case "1":
            {
                let category, note, amount, date;
                console.log("Enter category from that (food,rent,shoping,travel,other)");
                category = (await rl.question("Category ?")).toLowerCase() as Category;
                console.log("Enter amount in integer");
                amount = Number(await rl.question("Amount? "));
                note = await rl.question("note?");
                date = await rl.question("date?");

                store.add({ amount, category, note, date });
                if (store.checkBudget() !== "ok") console.log(store.describe());
                break;
            }
        case "2":
            {
                const result = store.list();
                if (result.length === 0) console.log("Abhi koi kharcha nahi hai(store khali hai)");
                else console.log(result);
                break;
            }
        case "3":
            {
                console.log(store.describe());
                console.log(store.totalByCategory());
                break;
            }
        case "4":
            {
                chalu = false;
                break;
            }
        default:
            {
                console.log("Enter correct choice");
                break;
            }
    }
}

rl.close();