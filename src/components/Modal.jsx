import React, { useEffect } from "react";
import ReactDOM from "react-dom";

function Modal({ onClose, onDelete }) {
    useEffect(() => {
        document.body.classList.add("show-overflow");

        return () => {
            document.body.classList.remove("show-overflow");
        }
    }, []);
    
    return ReactDOM.createPortal(
        <div className="modal-container">
            <div onClick={onClose} className="modal-background"></div>
            <div className="modal-main">
                <div className="modal-para">
                    {" "}
                    <p className="warning">ATTENTION</p>
                    <p>Do you really want to close your account?</p>
                </div>

                <div className="modal-buttons">
                    <button
                        onClick={onClose}
                        className="btn secondary-btn setting-button"
                    >
                        Close
                    </button>
                    <button
                        onClick={onDelete}
                        className="btn primary-btn setting-button"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>,
        document.querySelector(".modal-div")
    );
}

export default Modal;
