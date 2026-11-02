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
}}