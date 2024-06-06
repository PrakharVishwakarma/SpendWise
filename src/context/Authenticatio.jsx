import { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const url = "https://following-matty-anaition-af103e26.koyeb.app/"; // "http://127.0.0.1:5000";

    function getToken() {
        const userToken = localStorage.getItem("token");
        return userToken;
    }

    const [token, setToken] = useState(getToken());

    function saveToken(userToken) {
        localStorage.setItem("token", userToken);
        setToken(userToken);
    }

    function removeToken() {
        localStorage.removeItem("token");
        localStorage.clear();
        setToken(null);
    }

    const valueToShare = {
        url,
        token,
        setToken,
        getToken,
        saveToken,
        removeToken,
    };

    return (
        <AuthContext.Provider value={valueToShare}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };
export default AuthContext;
