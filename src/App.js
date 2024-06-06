import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUpForm from "./pages/SignUpForm";
import LoginForm from "./pages/LoginForm";
import useAuthentication from "./hooks/useAuthentication";
import DashBoardPage from "./pages/DashBoardPage";
import AnalysisPage from "./pages/AnalysisPage";
import ReminderPage from "./pages/ReminderPage";
import SettingPage from "./pages/SettingPage";
import ForgetPassword from "./pages/ForgetPassword";
import AllExpensesPage from "./pages/AllExpensesPage";
import TalkWIthAI from "./pages/TalkWithAI";

function App() { 
    const { token, getToken } = useAuthentication();

    useEffect(() => {
        getToken();
    }, [token, getToken]);

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<SignUpForm />} />
                    <Route
                        path="/forgetpassword"
                        element={<ForgetPassword />}
                    />
                    <Route
                        path="/"
                        element={
                            token ? (
                                <DashBoardPage />
                            ) : (
                                <Navigate to="/register" />
                            )
                        }
                    />
                    <Route
                        path="/analysis"
                        element={
                            token ? (
                                <AnalysisPage />
                            ) : (
                                <Navigate to="/register" />
                            )
                        }
                    />
                    <Route
                        path="/reminder"
                        element={
                            token ? (
                                <ReminderPage />
                            ) : (
                                <Navigate to="/register" />
                            )
                        }
                    />
                    <Route
                        path="/setting"
                        element={
                            token ? (
                                <SettingPage />
                            ) : (
                                <Navigate to="/register" />
                            )
                        }
                    />
                    <Route
                        path="/expenses"
                        element={
                            token ? (
                                <AllExpensesPage />
                            ) : (
                                <Navigate to="/register" />
                            )
                        }
                    />
                    <Route
                        path="/talkai"
                        element={
                            token ? <TalkWIthAI /> : <Navigate to="/register" />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
