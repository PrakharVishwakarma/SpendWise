import React, { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthentication from "../../hooks/useAuthentication";
import axios from "axios";

const tags = [
    { value: "Housing", label: "Housing" },
    { value: "Transportation", label: "Transportation" },
    { value: "Food", label: "Food" },
    { value: "Health Care", label: "Health Care" },
    { value: "Personal Care", label: "Personal Care" },
    { value: "Debt", label: "Debt" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Lend", label: "Lend" },
    { value: "Miscellaneous", label: "Miscellaneous" },
];

function ExpenseUpdateForm({ expense, handleExpenseUpdate }) {
    const [name, setName] = useState(expense.name || "");
    const [price, setPrice] = useState(expense.price || "");
    const [description, setDescription] = useState(expense.description || "");
    const [selectedOption, setSelectedOption] = useState(
        tags.find((tag) => tag.value === expense.tag) || null
    );
    const [selectedDate, setSelectedDate] = useState(
        expense.date ? new Date(expense.date) : null
    );

    const { token, url } = useAuthentication();

    useEffect(() => {
        setName(expense.name || "");
        setPrice(expense.price || "");
        setDescription(expense.description || "");
        setSelectedOption(
            tags.find((tag) => tag.value === expense.tag) || null
        );
        setSelectedDate(expense.date ? new Date(expense.date) : null);
    }, [expense]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios({
            url: url + "/update_expense",
            method: "POST",
            headers: {
                authorization: "Bearer " + token,
            },
            data: {
                id: expense.id,
                expense_name: name,
                price: price,
                tag: selectedOption.value,
                date: selectedDate.toISOString().slice(0, 10),
                description: description,
            },
        })
            .then((res) => {
                if (res.data.error) {
                    toast(res.data.error);
                } else {
                    handleExpenseUpdate({
                        id: expense.id,
                        expense_name: name,
                        price: price,
                        tag: selectedOption.value,
                        date: selectedDate.toISOString().slice(0, 10),
                        description: description,
                    });
                }
            })
            .catch((err) => {
                toast("Error Adding Expense");
            });
    };

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="expense-form dashboard-second-container dashboard-border-radius">
            <ToastContainer />
            <form className="expense-add-form" onSubmit={handleSubmit}>
                <div className="expense-form-field">
                    <input
                        type="text"
                        placeholder="Expense Name"
                        name="expenseName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="expense-form-field">
                    <input
                        type="number"
                        placeholder="Price"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="expense-form-field">
                    <Select
                        value={selectedOption}
                        onChange={handleChange}
                        options={tags}
                        placeholder="Select a tag"
                        className="select-tag"
                    />
                </div>

                <div className="expense-form-field">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Date"
                        className="date-picker"
                    />
                </div>

                <div className="expense-form-field">
                    <textarea
                        placeholder="Description of the payment"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="add-expense-button expense-form-field"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ExpenseUpdateForm;
