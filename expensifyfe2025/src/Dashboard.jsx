import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChangePassword } from "./ResusableMethodsAndModals";
import axios from "axios";
import Swal from "sweetalert2";

function Dashboard (props) {
    const [currentTab, setCurrentTab] = useState("Dashboard");
    const [openChangePassWindow, setOpenChangePassWindow] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const options = [
        "🧭 Dashboard",
        "💰 View Income Sources",
        "💸 View Expense Sources",
        "🔒 Change Password",
        "🚪 Logout"
    ];

    const navigate = useNavigate();
    const location = useLocation();

     useEffect(() => {
        if (location.pathname.includes("incomeChildComp")) {
            setCurrentTab("Income");
        } else if (location.pathname.includes("expenseChildComp")) {
            setCurrentTab("Expense");
        } else if (location.pathname.includes("dashboardChildComp")) {
            setCurrentTab("Dashboard");
        }
    }, [location.pathname]);

    const handleClose = () => {
        setOpenChangePassWindow(false);
    }

    const handleResetPasswords = () => {
        setCurrentPassword("");
        setNewPassword("");
    }

    const checkCurrentPassword = async () =>{
        try {
            const resp = await axios.get("http://localhost:9090/expensify-login-api/checkCurrentPassword",{params:{password:currentPassword,userName:props.user}});
            return resp.data;
        } catch(error) {
            console.log("Error checking current password", error);
        }
    } 

    const handlePasswordChange = async (event) => {
        event.preventDefault();
        if (currentPassword.trim().length === 0 || newPassword.trim().length === 0) {
            Swal.fire({
                title: 'Error!',
                text: "Password field/field(s) empty!",
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }
            })
            return;
        }
        if(await checkCurrentPassword() === false) {
            Swal.fire({
                title: 'Error!',
                text: "Your current password is not matching!",
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }
            })
            return;
        }
        const passwordChangeRequestBody = {
            currentPassword: currentPassword,
            newPassword: newPassword,
            userName:props.user
        };
        try {
            await axios.post("http://localhost:9090/expensify-login-api/changePasswords", passwordChangeRequestBody);
            Swal.fire({
                title: 'Success!',
                text: "Password changed!",
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }
            }).then((result)=> {
                if(result.isConfirmed) {
                    handleResetPasswords();
                    handleClose();
                }
            })
        } catch (error) {
            console.log("Error changing the passwords", error);
        }
    }
    
    const changeTab = (option) => {
        setCurrentTab(option);
        switch(option) {
            case "🧭 Dashboard":
            navigate("/dashboard/dashboardChildComp");
            break;
            case "💰 View Income Sources":
            navigate("/dashboard/incomeChildComp");
            break;
            case "💸 View Expense Sources":
            navigate("/dashboard/expenseChildComp");
            break;
            case "🔒 Change Password":
            setOpenChangePassWindow(true);
            break;         
            case "🚪 Logout":
            navigate("/");
            sessionStorage.setItem("signedIn", "false");
            props.setIsSignedIn(false);
            break;   
        }
        
    }

    return (
        <div className="dashboard-section border border-amber-100 shadow-2xl rounded-tr-2xl p-3.5">
            <div className="flex flex-col">
                <h5>Hi, <span className="font-black">{props.user}</span></h5>
                <div className="dashboard-options">
                    {
                        options.map((option) =>
                            <p className={`font-bold ${currentTab === option ? "current-tab-bg-color" : ""}`} onClick={()=>changeTab(option)}>
                                {option}
                            </p>
                        )
                    }
                </div>
            </div>
            <ChangePassword 
            show={openChangePassWindow}
            title="Change Password"
            onClose={handleClose}
            currentPassword={currentPassword}
            newPassword={newPassword}
            setCurrentPassword={setCurrentPassword}
            setNewPassword={setNewPassword}
            handlePasswordChange={handlePasswordChange}
            handleResetPasswords={handleResetPasswords}
            />
        </div>
    )
}
export default Dashboard;