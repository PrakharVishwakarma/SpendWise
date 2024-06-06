import React, { useState, useEffect } from "react";
import TagBasedExpense from "./dashboard/TagBasedExpense";
import TotalOverview from "./dashboard/TotalOverview";
import DashBoardReminder from "./dashboard/DashBoardReminder";
import ExpenseAddForm from "./dashboard/ExpenseAddForm";
import useAuthentication from "../hooks/useAuthentication";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function formatDate(date) {
    const formattedDate = new Date(date);

    const options = {
        weekday: "long", // "Monday"
        day: "numeric", // "22"
        month: "long", // "April"
        year: "numeric", // "2024"
    };
    return formattedDate.toLocaleDateString("en-GB", options);
}

function setStatus(status) {
    if (status === "increase" || status === "no change") {
        return "GrDescend";
    } else {
        return "GrAscend";
    }
}

function DashBoard() {
    const { token, url } = useAuthentication();
    const [name, setName] = useState("");
    const currentDate = formatDate(new Date());
    const [monthly, setMonthly] = useState(0);
    const [yearly, setYearly] = useState(0);

    const [housing, setHousing] = useState(0);
    const [housingComparison, setHousingComparison] = useState(null);

    const [transportation, setTransportation] = useState(0);
    const [transportationComparison, setTransportationComparison] =
        useState(null);

    const [food, setFood] = useState(0);
    const [foodComparison, setFoodComparison] = useState(null);

    const [healthCare, setHealthCare] = useState(0);
    const [healthCareComparison, setHealthCareComparison] = useState(null);

    const [personalCare, setPersonalCare] = useState(0);
    const [personalCareComparison, setPersonalCareComparison] = useState(null);

    const [debt, setDebt] = useState(0);
    const [debtComparison, setDebtComparison] = useState(null);

    const [entertainment, setEntertainment] = useState(0);
    const [entertainmentComparison, setEntertainmentComparison] =
        useState(null);

    const [lend, setLend] = useState(0);
    const [lendComparison, setLendComparison] = useState(null);

    const [miscellaneous, setMiscellaneous] = useState(0);
    const [miscellaneousComparison, setMiscellaneousComparison] =
        useState(null);

    useEffect(() => {
        async function handleName() {
            try {
                const response = await axios({
                    url: url + "/tag_based_expenses",
                    method: "GET",
                    headers: {
                        authorization: "Bearer " + token,
                    },
                });
                const monthly_expenses = response.data.current_month_expenses;
                const comparison = response.data.comparison;
                setHousing(monthly_expenses.Housing);
                setTransportation(monthly_expenses.Transportation);
                setFood(monthly_expenses.Food);
                setHealthCare(monthly_expenses["Health Care"]);
                setPersonalCare(monthly_expenses["Personal Care"]);
                setDebt(monthly_expenses.Debt);
                setLend(monthly_expenses.Lend);
                setEntertainment(monthly_expenses.Entertainment);
                setMiscellaneous(monthly_expenses.Miscellaneous);

                setHousingComparison(setStatus(comparison.Housing));
                setTransportationComparison(
                    setStatus(comparison.Transportation)
                );
                setFoodComparison(setStatus(comparison.Food));
                setHealthCareComparison(setStatus(comparison["Health Care"]));
                setPersonalCareComparison(
                    setStatus(comparison["Personal Care"])
                );
                setDebtComparison(setStatus(comparison.Debt));
                setLendComparison(setStatus(comparison.Lend));
                setEntertainmentComparison(setStatus(comparison.Entertainment));
                setMiscellaneousComparison(setStatus(comparison.Miscellaneous));
            } catch (err) {
                console.error("Error fetching name:", err);
            }
        }

        handleName();
    }, [token, url]);

    useEffect(() => {
        async function handleName() {
            try {
                const response = await axios({
                    url: url + "/get_failed_emails",
                    method: "GET",
                    headers: {
                        authorization: "Bearer " + token,
                    },
                });
                if (response.data.error_logs) {
                    toast(
                        "Failed to send reminder messages to " +
                            response.data.error_logs
                    );
                } else {
                }
            } catch (err) {
                console.error("Error fetching name:", err);
            }
        }

        handleName();
    }, [token, url]);

    useEffect(() => {
        async function handleName() {
            try {
                const response = await axios({
                    url: url + "/name",
                    method: "GET",
                    headers: {
                        authorization: "Bearer " + token,
                    },
                });
                setName(response.data.name);
            } catch (err) {
                console.error("Error fetching name:", err);
            }
        }

        handleName();
    }, [token, url]);

    useEffect(() => {
        async function handleName() {
            try {
                const response = await axios({
                    url: url + "/total_expense",
                    method: "GET",
                    headers: {
                        authorization: "Bearer " + token,
                    },
                });
                setMonthly(response.data.monthly);
                setYearly(response.data.yearly);
            } catch (err) {
                console.error("Error fetching name:", err);
            }
        }

        handleName();
    }, [token, url]);

    const tagBasedData = {
        housing,
        setHousing,
        housingComparison,
        transportation,
        setTransportation,
        transportationComparison,
        food,
        setFood,
        foodComparison,
        healthCare,
        setHealthCare,
        healthCareComparison,
        personalCare,
        setPersonalCare,
        personalCareComparison,
        debtComparison,
        debt,
        setDebt,
        entertainmentComparison,
        entertainment,
        setEntertainment,
        lendComparison,
        lend,
        setLend,
        miscellaneousComparison,
        miscellaneous,
        setMiscellaneous,
    };

    return (
        <div className="main-dashboard-container">
            <div className="main-dashboard-hello">Hello, {name}👋</div>
            <div className="main-dashboard-date">{currentDate}</div>
            <div className="main-dashboard-display-div">
                <div className="sub-dashboard">
                    <TotalOverview monthly={monthly} yearly={yearly} />
                    <TagBasedExpense {...tagBasedData} />
                </div>
                <div className="sub-dashboard">
                    <DashBoardReminder />
                    <ExpenseAddForm
                        monthly={monthly}
                        setMonthly={setMonthly}
                        yearly={yearly}
                        setYearly={setYearly}
                        {...tagBasedData}
                    />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default DashBoard;
