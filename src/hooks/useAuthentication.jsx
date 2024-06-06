import { useContext } from "react";
import AuthContext from "../context/Authenticatio";

function useAuthentication() {
    return  useContext(AuthContext);
}

export default useAuthentication