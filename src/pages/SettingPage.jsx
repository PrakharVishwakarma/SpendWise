import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import { FaArrowLeft } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../components/Modal";

function Setting() {
    const [showModal, setShowModal] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const { token, setToken, url } = useAuthentication();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (token) {
    //         navigate("/");
    //     }
    // }, [token, navigate]);

    const handleDelete = async (e) => {
        await axios({
            url: url + "/delete_account",
            method: "GET",
            headers: {
                authorization: "Bearer " + token,
            },
            data: {},
        })
            .then((res) => {
                if (res.data.error) {
                    toast(res.data.erro);
                } else {
                    toast("Account Delete Successful.");
                    setToken(false);
                    localStorage.clear();
                    navigateToRegistration();
                }
            })
            .catch((err) => {
                toast(err);
            });
    };

    useEffect(() => {
        const handleSubmit = async (e) => {
            await axios({
                url: url + "/get_name_phone",
                method: "GET",
                headers: {
                    authorization: "Bearer " + token,
                },
                data: {},
            })
                .then((res) => {
                    setName(res.data.name);
                    setPhone(res.data.phone);
                })
                .catch((err) => {
                    console.error("Error adding expense:", err);
                });
        };

        handleSubmit();
    }, [token, url]);

    const handleRegistration = (e) => {
        e.preventDefault();

        if (!name || !phone) {
            alert("Please fill all fields");
        } else {
            axios({
                url: url + "/change_name_phone",
                method: "POST",
                headers: {
                    authorization: "Bearer " + token,
                },
                data: { name, phone },
            })
                .then((res) => {
                    toast("Phone Number and Name Changed Successfully");
                })
                .catch((err) => {
                    toast("Error Occured While Making the Changes");
                });
        }
    };

    const navigateToRegistration = () => {
        navigate("/");
    };

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <div className="setting-page">
            <ToastContainer />
            <h1>
                <div className="login-page">
                    <button
                        onClick={navigateToRegistration}
                        className="anchor-button"
                    >
                        <FaArrowLeft className="setting-arrow-icon" />
                    </button>
                    Setting
                </div>
            </h1>
            <div>
                <button
                    onClick={() => {
                        setToken(false);
                        localStorage.clear();
                        navigate("/forgetpassword");
                    }}
                    anchor-button
                    className="anchor-button setting-anchor-button"
                >
                    Forget Password
                </button>
            </div>
            <div onSubmit={handleRegistration} className="setting-options">
                <form className="setting-form">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="btn primary-btn setting-button"
                    >
                        Update
                    </button>
                </form>
            </div>
            <button
                onClick={() => {
                    setShowModal(true);
                }}
                anchor-button
                className="setting-anchor-button-danger"
            >
                Delete Account
            </button>
            {showModal && (
                <Modal onClose={handleCloseModal} onDelete={handleDelete} />
            )}
        </div>
    );
}

export default Setting;
