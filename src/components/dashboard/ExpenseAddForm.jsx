import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import useAuthentication from "../../hooks/useAuthentication";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

function ExpenseAddForm({
    handleForm,
    monthly,
    setMonthly,
    yearly,
    setYearly,
    housing,
    setHousing,
    transportation,
    setTransportation,
    food,
    setFood,
    healthCare,
    setHealthCare,
    personalCare,
    setPersonalCare,
    personalCareComparison,
    debt,
    setDebt,
    entertainment,
    setEntertainment,
    lend,
    setLend,
    miscellaneous,
    setMiscellaneous,
}) {
    function tagBasedDataUpdate() {
        if (selectedOption.label === "Housing") {
            setHousing(parseInt(housing) + parseInt(price));
        }
        if (selectedOption.label === "Transportation") {
            setTransportation(parseInt(transportation) + parseInt(price));
        }
        if (selectedOption.label === "Food") {
            setFood(parseInt(food) + parseInt(price));
        }
        if (selectedOption.label === "Health Care") {
            setHealthCare(parseInt(healthCare) + parseInt(price));
        }
        if (selectedOption.label === "Personal Care") {
            setPersonalCare(parseInt(transportation) + parseInt(price));
        }
        if (selectedOption.label === "Debt") {
            setDebt(parseInt(debt) + parseInt(price));
        }
        if (selectedOption.label === "Entertainment") {
            setEntertainment(parseInt(entertainment) + parseInt(price));
        }
        if (selectedOption.label === "Lend") {
            setLend(parseInt(lend) + parseInt(price));
        }
        if (selectedOption.label === "Miscellaneous") {
            setMiscellaneous(parseInt(miscellaneous) + parseInt(price));
        }
    }
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { token, url } = useAuthentication();

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios({
            url: url + "/add_expense",
            method: "POST",
            headers: {
                authorization: "Bearer " + token,
            },
            data: {
                expense_name: name,
                price: price,
                tag: selectedOption.value,
                date: selectedDate.toISOString().slice(0, 10),
                description: description,
            },
        })
            .then((res) => {
                setMonthly(parseInt(monthly) + parseInt(price));
                setYearly(parseInt(yearly) + parseInt(price));
                tagBasedDataUpdate();
                toast("Expense Added Successfully");
            })
            .catch((err) => {
                toast("Error Adding Expense");
            });
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

export default ExpenseAddForm;
