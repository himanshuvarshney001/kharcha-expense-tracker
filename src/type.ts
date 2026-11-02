type Category = "food" | "travel" | "rent" | "shopping" | "other";//type literal
//Making user Defined type
export type Expense = {
    readonly id: number,
    amount: number;
    category: Category;
    note: string;
    date: string;
};
export type newExpences= Omit<Expense, 'id'>;
