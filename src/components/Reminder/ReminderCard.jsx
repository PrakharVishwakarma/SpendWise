import React from "react";
import { MdDelete } from "react-icons/md";
import useAuthentication from "../../hooks/useAuthentication";
import axios from "axios";

function ReminderCard({
    date,
    reminderName,
    price,
    repeatType,
    id,
    handleReminderDelete,
}) {
    const { token, url } = useAuthentication();

    // Function to format date in "23 May, 2024" format
    const formatDate = (inputDate) => {
        if (!inputDate) return "No date";

        const options = {
            day: "numeric",
            month: "long",
            year: "numeric",
        };
        return new Date(inputDate).toLocaleDateString("en-GB", options);
    };

    const handleDelete = async () => {
        try {
            await axios({
                url: url + "/delete_reminders",
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                },
                data: { id: id },
            })
            console.log("Reminder Deleted Successfully");
            handleReminderDelete(id);
        } catch (error) {
            console.log("Error occured while Deleting the Reminder.");
        }
    };

    return (
        <div className="reminder-card-main">
            <div className="reminder-card">
                <div className="remainder-card-sub">
                    <h3>{reminderName}</h3>
                    <p>{formatDate(date)}</p>
                    <h4>{repeatType}</h4>
                </div>
                <div className="reminder-card-icons">
                    <h2 className="reminder-card-price">{price}</h2>
                    <MdDelete
                        className="reminder-card-icon"
                        onClick={handleDelete}
                    />
                </div>
            </div>
        </div>
    );
}

export default ReminderCard;
