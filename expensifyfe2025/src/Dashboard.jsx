import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
function Dashboard (props) {
    const [currentTab, setCurrentTab] = useState("Dashboard");
    const options = ["Dashboard","Income", "Expense","Logout"];
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
    
    const changeTab = (option) => {
        setCurrentTab(option);
        switch(option) {
            case "Dashboard":
            navigate("/dashboard/dashboardChildComp");
            break;
            case "Income":
            navigate("/dashboard/incomeChildComp");
            break;
            case "Expense":
            navigate("/dashboard/expenseChildComp");
            break; 
            case "Logout":
            navigate("/");
            sessionStorage.setItem("signedIn", "false");
            props.setIsSignedIn(false);
            break;   
        }
        
    }

    return (
        <div className="dashboard-section border border-amber-100 shadow-2xl rounded-tr-2xl p-3.5">
            <div className="flex flex-col">
                <h5>Hi, {props.user}</h5>
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
        </div>
    )
}
export default Dashboard;