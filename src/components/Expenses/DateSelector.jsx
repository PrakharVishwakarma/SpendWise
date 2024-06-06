import React, { useEffect, useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DateSelector({ getData }) {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    );

    const [selectStartDate, setSelectStartDate] = useState(firstDayOfMonth);
    const [selectEndDate, setSelectEndDate] = useState(currentDate);

    const handleGetData = useCallback(() => {
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };

        if (selectEndDate < selectStartDate) {
            toast("End Date must be bigger than start date");
        } else {
            const startDateFormatted = formatDate(selectStartDate);
            const endDateFormatted = formatDate(selectEndDate);
            getData(startDateFormatted, endDateFormatted);
        }
    }, [selectStartDate, selectEndDate, getData]);

    useEffect(() => {
        handleGetData();
    }, [handleGetData]);

    return (
        <div>
            <div className="get-expenses-form-field dashboard-border-radius">
                <DatePicker
                    selected={selectStartDate}
                    onChange={(date) => {
                        setSelectStartDate(date);
                    }}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select Date"
                    className="date-picker"
                />
                <DatePicker
                    selected={selectEndDate}
                    onChange={(date) => {
                        setSelectEndDate(date);
                    }}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select Date"
                    className="date-picker"
                />
                <button
                    className="get-expenses-button add-expense-button expense-form-field"
                    onClick={handleGetData}
                >
                    Get
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default DateSelector;
