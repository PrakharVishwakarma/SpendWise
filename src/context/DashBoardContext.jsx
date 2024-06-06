import React, { createContext, useState } from "react";

const DashBoardContext = createContext();

function ChangeDashboardProvider({ children }) {
    const [changed, setChanged] = useState(false);

    const valuesToShare = {
        changed,
        setChanged,
    };

    return (
        <DashBoardContext.Provider value={valuesToShare}>
            {children}
        </DashBoardContext.Provider>
    );
}

export { ChangeDashboardProvider };
export default DashBoardContext;
