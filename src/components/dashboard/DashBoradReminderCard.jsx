import React from "react";

function DashBoradReminderCard({ name, date }) {
    return (
        <div className="dashborad-reminder-card">
            <div className="dashboard-remain-card-sub">
                <h2>{name}</h2>
                <p>{date}</p>
            </div>
        </div>
    );
}

export default DashBoradReminderCard;
