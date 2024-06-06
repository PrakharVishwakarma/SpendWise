import React from "react";
import { IoPersonSharp } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";

function ReminderToggleButton({ showReminderFriend, setShowReminderFriend }) {
    return (
        <div className="toggle-container">
            <IoPersonSharp
                className={`toggle-icon ${
                    showReminderFriend ? "toggle-icon-background" : ""
                }`}
                onClick={() => {
                    setShowReminderFriend(true);
                }}
            />
            <IoIosPeople
                className={`toggle-icon ${
                    !showReminderFriend ? "toggle-icon-background" : ""
                }`}
                onClick={() => {
                    setShowReminderFriend(false);
                }}
            />
        </div>
    );
}

export default ReminderToggleButton;
