import type { Category, Expense, newExpences, categoryType } from "./type.js";
import type { StoreData, saveFile } from "./type.js";
export default class ExpenseStore {
    private expense: Expense[] = [];
    private nextId: number = 1;
    public budget: number = 0;
    constructor(budget: number) {
        this.budget = budget;
    }
    static fromData(data: StoreData): ExpenseStore {
        const s = new ExpenseStore(data.budget);
        s.expense = [...data.expences];
        s.nextId = Math.max(0, ...s.expense.map(({ id }) => id)) + 1;
        return s;
    }
    add(data: newExpences): Expense | undefined {
        if (data.amount <= 0) {
            throw new Error("Enter valid Amount");
        }
        this.expense.push({ id: this.nextId, ...data });
        return { id: this.nextId++, ...data };
    }
    list(): readonly Expense[] {
        return this.expense;
    }
    totalSpent(): number {
        return this.expense.reduce((acc, { amount }) => (acc += amount), 0);
    }
    remaining(): number {
        const total = this.totalSpent();
        return this.budget - total;
    }
    update(id: number, data: Partial<newExpences>): Expense | undefined {
        for (const [i, exp] of this.expense.entries()) {
            if (exp.id === id) {
                this.expense[i] = { ...exp, ...data };
                console.log("Update successfully");
                return this.expense[i];
            }
        }
        console.log(`Not found this ${id}`);
        return undefined;
    }
    remove(id: number): boolean {
        for (const [i, exp] of this.expense.entries()) {
            if (exp.id === id) {
                this.expense.splice(i, 1);
                console.log("deleted successfully");
                return true;
            }
        }
        console.log(`Not found this ${id}`);
        return false;
    }
    checkBudget(): "ok" | "warning" | "over" {
        const spent: number = this.totalSpent();
        if (spent > this.budget) return "over";
        else if (spent >= Math.floor(this.budget * 0.8)) return "warning";
        else return "ok";
    }
    describe(): string {
        const message = this.checkBudget();
        switch (message) {
            case "ok":
                return `sab theek hai budget ₹${this.remaining()} maje lo`;
            case "warning":
                return `Dhayan do bas sirf itna bacha hai budget ₹${this.remaining()}`;
            default:
                return `Budget se budget ₹${Math.abs(this.remaining())} zyaada!`;
        }
    }
    totalByCategory(): Partial<Record<Category, number>> {
        const dabba: categoryType = {};
        return this.expense.reduce((acc, exp) => {
            acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
            return acc;
        }, dabba);
    }
    toData(): StoreData {
        return { budget: this.budget, expences: [...this.expense] };
    }
}
