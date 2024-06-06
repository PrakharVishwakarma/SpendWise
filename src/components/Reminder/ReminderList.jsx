import React from "react";
import ReminderCard from "./ReminderCard";

function ReminderList({ data, setReminders }) {
    // Check if data is not defined or is not an object or is an empty object
    if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
        return <div className="reminder-list">No reminders to display</div>;
    }

    const handleReminderDelete = (id) => {
        const updateReminders = data.filter((item, index) => {
            return item.id !== id;
        });

        setReminders(updateReminders);
    };

    return (
        <div className="reminder-list">
            {Object.values(data).map((item, index) => (
                <ReminderCard
                    key={item.id}
                    id={item.id}
                    date={item.date}
                    reminderName={item.reminder_name}
                    description={item.description}
                    price={item.price}
                    repeatType={item.repeat}
                    handleReminderDelete={handleReminderDelete}
                />
            ))}
        </div>
    );
}

export default ReminderList;
