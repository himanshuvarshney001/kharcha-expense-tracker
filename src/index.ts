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

