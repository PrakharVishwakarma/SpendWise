import React, { useState, useEffect } from "react";
import ReminderForm from "./Reminder/ReminderForm";
import axios from "axios";
import useAuthentication from "../hooks/useAuthentication";
import ReminderList from "./Reminder/ReminderList";
import ReminderFriendForm from "./Reminder/ReminderFriend";
import ReminderToggleButton from "./Reminder/ReminderToggleButton";

function Reminders() {
    const [reminders, setReminders] = useState({});
    const [showReminderFriend, setShowReminderFriend] = useState(true);
    const { token, url } = useAuthentication();

    useEffect(() => {
        const handleSubmit = async (e) => {
            await axios({
                url: url + "/get_reminders",
                method: "GET",
                headers: {
                    authorization: "Bearer " + token,
                },
                data: {},
            })
                .then((res) => {
                    console.log(res.data)
                    setReminders(res.data.reminders);
                })
                .catch((err) => {
                    console.error("Error adding expense:", err);
                });
        };

        handleSubmit();
    }, [token, url]);

    return (
        <div className="main-dashboard-container">
            <div className="reminder-main-container">
                <ReminderToggleButton
                    setShowReminderFriend={setShowReminderFriend}
                    showReminderFriend={showReminderFriend}
                />
                <div className="sub-container-reminder">
                    {showReminderFriend ? (
                        <ReminderForm
                            handleData={setReminders}
                        />
                    ) : (
                        <ReminderFriendForm
                            handleData={setReminders}
                        />
                    )}
                </div>
            </div>
            <ReminderList data={reminders} setReminders={setReminders} />
        </div>
    );
}

export default Reminders;
