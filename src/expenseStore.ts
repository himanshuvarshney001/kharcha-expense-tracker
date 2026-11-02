import type { Expense, newExpences } from "./type.js";
export default class ExpenseStore{
    private expense: Expense[] = [];
    private nextId: number = 1;
    public budget: number;
    constructor(budget: number) {
        this.budget = budget;
    }
    add(data: newExpences): Expense{
        this.expense.push({ id: this.nextId, ...data });
        return {id:this.nextId++,...data};

    }
    list(): readonly Expense[]{
        return this.expense;
    }
    totalSpent(): number{
        return this.expense.reduce((acc, { amount }) => acc += amount, 0);
    }
    remaining():number
    {
        const total = this.totalSpent();
        return this.budget - total;
    }
    update(id: number, data: Partial<newExpences>): Expense|undefined{
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
    remove(id: number):boolean {
         for (const [i, exp] of this.expense.entries()) {
            if (exp.id === id) {
                this.expense.splice(i,1);
                console.log("deleted successfully");
                return true;
            }
        }
        console.log(`Not found this ${id}`);
        return false;
    }
}
