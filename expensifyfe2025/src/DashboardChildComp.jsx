import React from "react";
import Logo from '/projectLogo.png';
import TotalBalance from '/totalBalance.png';
import TotalExpense from '/totalExpense.png';
import TotalIncome from '/totalIncome.png';
function DashboardChildComp() {


    return (
        <div className="dashboardComp-section">
         <div className="flex justify-center items-center gap-7">
            <div className="overview border border-amber-50 rounded-tr-2xl rounded-b-2xl shadow-2xl flex">
            <img src={TotalBalance} />
            <div className="flex flex-col p-4.5">
               <p className="font-bold text-gray-800 text-lg tracking-wide mb-2">Total Balance</p>
               <h2>0</h2> 
            </div>
            </div>
            {/* <div className="overview border border-amber-50 rounded-tr-2xl rounded-b-2xl shadow-2xl flex">
                 <img src={TotalIncome} />
            <div className="flex flex-col p-4.5">
               <p className="font-bold text-gray-800 text-lg tracking-wide mb-2">Total Income</p>
               <h2>0</h2> 
            </div>
            </div> */}

             <div className="overview border border-amber-50 rounded-tr-2xl rounded-b-2xl shadow-2xl flex">
                 <img src={TotalIncome} />
            <div className="flex flex-col p-4.5">
               <p className="font-bold text-gray-800 text-lg tracking-wide mb-2">Total Income</p>
               <h2>0</h2> 
            </div>

            </div>

             <div className="overview border border-amber-50 rounded-tr-2xl rounded-b-2xl shadow-2xl flex">
                 <img src={TotalExpense} />
            <div className="flex flex-col p-4.5">
               <p className="font-bold text-gray-800 text-lg tracking-wide mb-2">Total Expenses</p>
               <h2>0</h2> 
            </div>

            </div>

            </div>   
        </div>
    )
} export default DashboardChildComp;