export const CATEGORIES = [
  "food",
  "travel",
  "rent",
  "shopping",
  "other",
] as const;
export type Category = (typeof CATEGORIES)[number];

export function isCategory(s: string): s is Category {
  return CATEGORIES.some((c) => c === s);
}
export type StoreData = {
  budget: number;
  expences: Expense[];
};
export type saveFile = Record<string, StoreData>;

export type Expense = {
  readonly id: number;
  amount: number;
  category: Category;
  note: string;
  date: string;
};
export type categoryType = Partial<Record<Category, number>>;
export type newExpences = Omit<Expense, "id">;
