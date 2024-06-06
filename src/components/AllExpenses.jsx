import React, { useState } from "react";
import DateSelector from "./Expenses/DateSelector";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthentication from "../hooks/useAuthentication";
import ExpensesData from "./Expenses/ExpensesData";
import ExpenseUpdateForm from "./Expenses/ExpenseUpdateForm";

function AllExpenses() {
    const [expenses, setExpenses] = useState([]);
    const [expense, setExpense] = useState({});

    const { token, url } = useAuthentication();

    const getData = (selectStartDate, selectEndtDate) => {
        axios({
            url: url + "/get_all_expenses",
            method: "POST",
            headers: {
                authorization: "Bearer " + token,
            },
            data: {
                start_date: selectStartDate,
                end_date: selectEndtDate,
            },
        })
            .then((res) => {
                if (res.data.error) {
                    toast(res.data.error);
                } else {
                    setExpenses(res.data.expenses);
                }
            })
            .catch((error) => {
                toast("Error fetching expenses");
            });
    };

    const handleExpenseDelete = (id) => {
        const updatedExpenses = expenses.filter((item) => {
            return item.id !== id;
        });

        setExpenses(updatedExpenses);
    };

    const handleSetExpense = (exp) => {
        setExpense(exp);
    };

    const handleExpenseUpdate = (exp) => {
        console.log(exp);
        const updatedExpenses = expenses.filter((item) => {
            return item.id !== exp.id;
        });
        setExpenses([ ...updatedExpenses, exp ]);
    };

    return (
        <div className="main-dashboard-container">
            <ToastContainer />
            <div className="date-picker-expenses-selector">
                <DateSelector getData={getData} />
            </div>
            <div className="expenses-data-sub-container">
                <ExpensesData
                    data={expenses}
                    className="expenses-half"
                    handleExpenseDelete={handleExpenseDelete}
                    handleSetExpense={handleSetExpense}
                />
                <ExpenseUpdateForm
                    expense={expense}
                    handleExpenseUpdate={handleExpenseUpdate}
                />
            </div>
        </div>
    );
}

export default AllExpenses;
