import React from "react";
import ExpenseCard from "./ExpenseCard";

function ExpensesData({ data, handleExpenseDelete, handleSetExpense }) {
    const expenses = data.map((expense) => (
        <ExpenseCard
            key={expense.id}
            id={expense.id}
            name={expense.expense_name}
            price={expense.price}
            tag={expense.tag}
            description={expense.description}
            date={expense.date}
            handleExpenseDelete={handleExpenseDelete}
            handleSetExpense={handleSetExpense}
        />
    ));
    return <div className="expenses-half expenses-data-list">{expenses}</div>;
}

export default ExpensesData;
