import { useContext } from "react";
import DashBoardContext from "../context/DashBoardContext";

function useChangeDashBoard() {
    return useContext(DashBoardContext);
}

export default useChangeDashBoard;
