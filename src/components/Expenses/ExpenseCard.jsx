import React from "react";
import { MdDelete } from "react-icons/md";
import useAuthentication from "../../hooks/useAuthentication";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ExpenseCard({
    id,
    name,
    price,
    tag,
    description,
    date,
    handleExpenseDelete,
    handleSetExpense,
}) {
    const formattedDate = new Date(date);
    const { token, url } = useAuthentication();

    const options = {
        day: "2-digit",
        month: "long",
        year: "numeric",
    };

    const formattedDateString = formattedDate.toLocaleDateString(
        "en-US",
        options
    );

    const handleDelete = async () => {
        try {
            axios({
                url: url + "/delete_expense",
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                },
                data: { id: id },
            }).then((res) => {
                if (res.data.error) {
                    toast(res.data.error);
                } else {
                    toast("Expense deleted successfully");
                    handleExpenseDelete(id);
                }
            });
        } catch (error) {
            console.log("Error occurred while deleting the reminder.");
        }
    };

    const handleClick = () => {
        const expenseData = {
            id,
            name,
            price,
            tag,
            description,
            date,
        };
        handleSetExpense(expenseData);
    };

    return (
        <div className="expense-card-container" onClick={handleClick}>
            <div className="expense-card-name">{name}</div>
            <div className="expense-card-date">{formattedDateString}</div>
            <div className="expenses-card-menu">
                <div className="expense-card-price">{price}</div>
                <MdDelete
                    className="reminder-card-icon"
                    onClick={handleDelete}
                />
            </div>
            <ToastContainer />
        </div>
    );
}

export default ExpenseCard;
