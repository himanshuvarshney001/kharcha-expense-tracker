import ExpenseStore from "./expenseStore.js";
import type { newExpences } from "./type.js";

console.log("===== Kharcha Tracker =====\n");

// 1. Mahine ka budget set karo
const store = new ExpenseStore(5000);
console.log(`Budget: ₹${store.budget}\n`);

// 2. Kharche add karo
const kharche: newExpences[] = [
  { amount: 1200, category: "rent", note: "Room ka hissa", date: "2026-11-01" },
  { amount: 250, category: "food", note: "Mess dinner", date: "2026-11-02" },
  { amount: 600, category: "travel", note: "Train ticket", date: "2026-11-03" },
  { amount: 80, category: "food", note: "Chai aur samosa", date: "2026-11-03" },
  { amount: 1500, category: "shopping", note: "Jacket", date: "2026-11-05" },
];

for (const k of kharche) {
  store.add(k);
}

console.log("Saare kharche:");
console.table(store.list());

// 3. Galti sudhaaro: chai ₹80 nahi, ₹60 ki thi
const chai = store.list().find((e) => e.note === "Chai aur samosa");
if (chai) store.update(chai.id, { amount: 60 });

// 4. Jacket wapas kar di
const jacket = store.list().find((e) => e.note === "Jacket");
if (jacket) store.remove(jacket.id);

// 5. Report
console.log("\n----- Report -----");
console.log(`Kharch hua: ₹${store.totalSpent()}`);
console.log(`Bacha:      ₹${store.remaining()}`);
console.log(`Status:     ${store.checkBudget()} (${store.describe()})`);
console.log("Category-wise:", store.totalByCategory());

// 6. Ek bada kharcha aaya: warning dikhao, rokna nahi
store.add({ amount: 2200, category: "other", note: "Laptop repair", date: "2026-11-08" });

if (store.checkBudget() !== "ok") {
  console.log(`\nWarning: ${store.describe()}`);
}
console.log(store.toData());
console.log(store.list());

const copy = ExpenseStore.fromData(store.toData());
copy.add({ amount: 10, category: "food", note: "Test", date: "2026-11-10" });
console.log(copy.list().at(-1)?.id);      // 7

const empty = ExpenseStore.fromData({ budget: 1000, expences: [] });
empty.add({ amount: 10, category: "food", note: "Test", date: "2026-11-10" });
console.log(empty.list()[0]?.id);         // 1