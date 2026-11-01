# Kharcha

A small command-line expense tracker written in TypeScript. Set a monthly budget, add your expenses, and see how much you have left.

This is a 2-day learning project. It has no UI and no external libraries: everything runs in the terminal with Node.js, and the goal is to practise core TypeScript concepts on something real.

## Features

- Set a monthly budget
- Add, list, update and remove expenses
- See total spent and remaining balance
- Get a budget status: `ok`, `warning` (80% or more spent) or `over`
- See totals per category (food, travel, rent, shopping, other)
- List the biggest expenses

## Tech stack

- TypeScript 7
- Node.js (no other dependencies)

## Getting started

### Prerequisites

- Node.js 18 or newer (`node -v` to check)

### Install

```bash
cd KharchaProjectTS
npm install
```

### Run

```bash
npm run dev
```

### Scripts

| Command | What it does |
|---|---|
| `npm run build` | Type-checks and compiles `src/` into `dist/` |
| `npm start` | Runs the compiled app (`node dist/index.js`) |
| `npm run dev` | Build, then run |
| `npm run watch` | Recompiles on every save |

## Project structure

```
KharchaProjectTS/
├── package.json
├── tsconfig.json
├── src/
│   ├── types.ts    # Category, Expense, NewExpense, BudgetStatus
│   ├── store.ts    # ExpenseStore class: add, list, update, remove, totals
│   ├── report.ts   # budget status, category totals, top expenses
│   └── index.ts    # entry point: sample data and output
└── dist/           # compiled JavaScript (generated, do not edit)
```

## Data model

```ts
type Category = "food" | "travel" | "rent" | "shopping" | "other";

interface Expense {
  readonly id: number;
  amount: number;      // in rupees
  category: Category;
  note: string;
  date: string;        // "YYYY-MM-DD"
}

type NewExpense = Omit<Expense, "id">;   // the store assigns the id
```

## Usage

```ts
const store = new ExpenseStore(5000);   // monthly budget in ₹

store.add({ amount: 300, category: "food", note: "Mess dinner", date: "2026-11-01" });
store.add({ amount: 600, category: "travel", note: "Train ticket", date: "2026-11-02" });

console.log("Spent:", store.totalSpent());   // 900
console.log("Left:", store.remaining());     // 4100
```

## Budget status rules

| Condition | Status | Example (budget ₹5000) |
|---|---|---|
| Less than 80% spent | `ok` | ₹1900 spent, ₹3100 left |
| 80% or more spent | `warning` | ₹4200 spent, ₹800 left |
| More than the budget | `over` | ₹5600 spent, ₹600 over |


## TypeScript concepts practised

| Concept | Where |
|---|---|
| Literal union types | `Category` |
| Interfaces and `readonly` | `Expense` |
| `Omit`, `Partial`, `Record` | `NewExpense`, `update()`, category totals |
| Classes, `private`, parameter properties | `ExpenseStore` |
| Handling `T \| undefined` | finding an expense by id |
| Discriminated unions and `never` checks | `BudgetStatus` |
| Generics | `topN<T>` |
| ES modules and `import type` | imports between files |
| `async`/`await` and type guards | bonus: JSON save/load |
