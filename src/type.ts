export type Category = "food" | "travel" | "rent" | "shopping" | "other";//type literal
//Making user Defined type
export type Expense = {
    readonly id: number,
    amount: number;
    category: Category;
    note: string;
    date: string;
};
export type categoryType = Partial<Record<Category, number>>;
export type newExpences= Omit<Expense, 'id'>;
