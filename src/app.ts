import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import expenseStore from "./expenseStore.js";
import { CATEGORIES, isCategory } from "./type.js";
import type { Category } from "./type.js";
import type { saveFile } from "./type.js";
import { writeFile,readFile } from "node:fs/promises"


const users = new Map<string, expenseStore>();
async function save(): Promise<void> {
    const data: saveFile = {};
    for (const [key, value] of users) {
        data[key] = value.toData();
    }
    const text = JSON.stringify(data, null, 2);
    await writeFile("expenses.json", text);
}

async function load(): Promise<void>{
    let text: string;
    try {
        text = await readFile('expenses.json', "utf-8");
    } catch {
        return;
    }
    const data = JSON.parse(text) as saveFile;
    for (const [key, value] of Object.entries(data)) {
        users.set(key,expenseStore.fromData(value));
    }
}
async function askNumber(sawaal: string, attempts: number = 3): Promise<number | undefined> {
    for (let i = 1; i <= attempts; i++) {
        const n = Number(await rl.question(sawaal));
        if (!Number.isNaN(n) && n > 0) return n;
        console.log(`Galat number. ${attempts - i} try bache`);
    }
    return undefined;   // saare try khatam
}
async function askCategory(attempts: number = 3): Promise<Category | undefined> {
    for (let i = 1; i <= attempts; i++) {
        const jawab = (await rl.question(`Category (${CATEGORIES.join("/")})? `)).trim().toLowerCase();
        if (isCategory(jawab)) return jawab;   // yahan TS jaanta hai: jawab ek Category hai
        console.log(`"${jawab}" koi category nahi hai. ${attempts - i} try bache`);
    }
    return undefined;
}
let currentUser = "";
let store: expenseStore;
const rl = createInterface({ input: stdin, output: stdout });
await load();
let user = await rl.question("Enter user name? ");
let found = users.get(user);
if (found) {
    console.log("Welcome back");
    currentUser = user;
    store = found;
}
else {
    let budget = await askNumber("Enter budget in integer?");
    if (!budget) {
        rl.close();
        process.exit(1);
    }
    store = new expenseStore(budget);
    users.set(user, store);
    currentUser = user;
}
let chalu = true;
while (chalu) {
    console.log("\n0. Switch user\n1. Kharcha add karo\n2. List dekho\n3. Report\n4. Show current user\n5. Exit");
    const choice = await rl.question("Choose karo: ");
    switch (choice) {
        case "0": {
            console.log("User badlo=");
            user = await rl.question("Enter user name? ");
            found = users.get(user);
            if (found) {
                console.log("Welcome back");
                currentUser = user;
                store = found;
            }
            else {
                let budget = await askNumber("Enter amount budget?");
                if (!budget) {
                    console.log("user nahi bana");
                    break;
                }
                store = new expenseStore(Number(budget));
                users.set(user, store);
                currentUser = user;
            }
            break;
        }
        case "1":
            {
                let category, note, amount, date;
                category = await askCategory();
                if (!category) {
                    console.log("category nahi mili Kharcha cancel ")
                    break;
                }
                amount = await askNumber("Enter amount in integer?");
                if (!amount) {
                    console.log("Not enter valid amount to kharch cancel ");
                    break;
                }

                note = await rl.question("note? ");
                date = await rl.question("date? ");
                store.add({ amount, category, note, date });
                if (store.checkBudget() !== "ok") console.log(store.describe());
                break;
            }
        case "2":
            {
                const result = store.list();
                if (result.length === 0) console.log("Abhi koi kharcha nahi hai(store khali hai)");
                else console.table(result);
                break;
            }
        case "3":
            {
                console.log(store.describe());
                console.log(store.totalByCategory());
                break;
            }
        case "5": {
            await save();
            console.log("Data save ho gaya. Bye!");
            chalu = false;
            break;
        }
        case "4": {
            console.log("user is " + currentUser);
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