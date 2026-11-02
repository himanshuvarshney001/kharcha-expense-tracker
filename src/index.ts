import type { Expense, newExpences } from "./type.js";
import ExpenseStore from "./expenseStore.js";
const exp: Expense = {
    id: 12,
    category: "food",
    amount: 400,
    note: "the taste of food desent",
    date: "2024-11-04",
};

const nexp: newExpences = {  
    category: "travel",
    amount: 4000,
    note: "travelling is good for human",
    date:"2022-09-11",
}

const store = new ExpenseStore(5000);
store.add(nexp);
store.add(nexp);

console.log(store.totalSpent());
console.log(store.remaining());

const a = store.add({ amount: 300, category: "food", note: "Chai", date: "2026-11-02" });
const b = store.add({ amount: 600, category: "travel", note: "Train", date: "2026-11-02" });

console.log(store.update(a.id, { amount: 350 }));   // amount 350 wala object
console.log(store.update(99, { amount: 1 }));       // undefined
console.log(store.remove(b.id));                    // true
console.log(store.remove(b.id));                    // false (pehle hi hat gaya)
console.log(store.list());                          // sirf Chai, 350