import React, { useState, useEffect } from "react";
import useAuthentication from "../../hooks/useAuthentication";
import axios from "axios";
import DashBoradReminderCard from "./DashBoradReminderCard";

function DashBoardReminder() {
    const [active, setActive] = useState(false);
    const [reminder, setReminder] = useState([]);
    const { token, url } = useAuthentication();

    useEffect(() => {
        const handleSubmit = async (e) => {
            await axios({
                url: url + "/get_reminder_dashboard",
                method: "GET",
                headers: {
                    authorization: "Bearer " + token,
                },
                data: {},
            })
                .then((res) => {
                    if (res.data.lenght === 1) {
                        setActive(true);
                    } else {
                        setActive(false);
                        setReminder(res.data.data);
                    }
                })
                .catch((err) => {
                    console.error("Error adding expense:", err);
                });
        };

        handleSubmit();
    }, [token, url]);

    return (
        <div>
            <div className="dashboard-reminders dashboard-first-container dashboard-border-radius dashboard-reminder-container">
                {active ? (
                    <h2>Nothing to Show</h2>
                ) : (
                    reminder.map((item) => (
                        <DashBoradReminderCard
                            key={item.id}
                            date={item.date}
                            name={item.reminder_name}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default DashBoardReminder;
