import React from "react";
import Logo from '/projectLogo.png';
import TotalBalance from '/totalBalance.png';
import TotalExpense from '/totalExpense.png';
import TotalIncome from '/totalIncome.png';
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { PieChartData } from "./ResusableMethodsAndModals";
import { IncomeBarChart } from "./ResusableMethodsAndModals";
import BalanceIcon from '/RupeesIcon.png';
import { SetUserBudget } from "./ResusableMethodsAndModals";
import { useBudget } from "./BudgetContext";
function DashboardChildComp(props) {
   const [balance, setBalance] = useState("");
   const [incomeAmount, setIncomeAmount] = useState("");
   const [expenseAmount, setExpenseAmount] = useState("");
   const [incomeList, setIncomeList] = useState([]);
   const [expenseList, setExpenseList] = useState([]);
   const [incomeListAllData, setIncomeListAllData] = useState([]);
   const { budget, updateBudget, setBudget } = useBudget();
   const [isBudgetClicked, setIsBudgetClicked] = useState(false);
   // const [budgetAmount, setBudgetAmount] = useState("");
   useEffect(() => {
      getExpenseDetails();
      getIncomeDetailsAllInfo();
      getIncomeAndExpenseDetails();
      getIncomeDetailsAllInfoForTable();
      getBudget();
   }, []);

   const handleBudget = () => {
      setIsBudgetClicked(true);
   }

   const getBudget = async () => {
      try {
         const resp = await axios.get("http://localhost:9090/expensify-dashboard-api/fetchBudget", { params: { userName: props.user } });
         setBudget(resp.data);
      } catch (error) {
         console.log("Error fetching budget details", error);
      }
   }

   const getIncomeAndExpenseDetails = async () => {
      try {
         const resp = await axios.get("http://localhost:9090/expensify-dashboard-api/fetchOtherDetails", { params: { userName: props.user } });
         let diff = resp.data["Income Amount"] - resp.data["Expense Amount"];
         setBalance(diff);
         setExpenseAmount(resp.data["Expense Amount"]);
         setIncomeAmount(resp.data["Income Amount"]);
      } catch (error) {
         console.log("Error fetching expense and income details", error);
      }
   }

   const getDataLastMonth = (arr) => {
      const today = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);

      const filter = arr.filter((item) => {
         const curr = new Date(item.Date);
         return curr >= thirtyDaysAgo && curr <= today;
      }
      )
      setIncomeList(filter);
   }

   const getIncomeDetailsAllInfo = async () => {
      try {
         const resp = await axios.get("http://localhost:9090/expensify-income-api/fetchIncomeDetails", { params: { userName: props.user } });
         const result = Object.entries(resp.data).map(([date, amount]) => ({
            Date: date,
            Amount: amount
         }));
         getDataLastMonth(result);
      } catch (error) {
         console.log("error fetching the details", error);
      }
   }

   const getIncomeDetailsAllInfoForTable = async () => {
      try {
         const resp = await axios.get("http://localhost:9090/expensify-income-api/fetchAllIncomeDetails", { params: { userName: props.user } });
         console.log(resp.data);
         setIncomeListAllData(resp.data);
      } catch (error) {
         console.log("error fetching the details", error);
      }
   }

   const getExpenseDetails = async () => {
      try {
         const resp = await axios.get("http://localhost:9090/expensify-expense-api/getExpenseDetails", { params: { userName: props.user } });
         //  setExpenseList(resp.data);
         filterExpenseData(resp.data);
      } catch (error) {
         console.log("error fetching expense details", error);
      }
   }

   const filterExpenseData = (arr) => {
      const data = arr.slice(0, 5);
      setExpenseList(data);
   }

   useEffect(() => {
      changeBackgroundColorForBudget();
   }, [budget]);

   const changeBackgroundColorForBudget = () => {
      const budgetCss = document.querySelector(".budget-inner-css");
      const budgetPercentage = (budget / 10000) * 100;
      if (budgetPercentage < 10) {
         budgetCss.style.backgroundColor = "";
      }
      else if (budgetPercentage < 50) {
         budgetCss.style.backgroundColor = "yellow";
      }
      else if (budgetPercentage < 75) {
         budgetCss.style.backgroundColor = "red";
      }

      else {
         budgetCss.style.backgroundColor = "green";
      }
   }

   const resetBudgetAmount = () => {
      setBudget(0);
   }
   const handleBudgetAmount = (evt) => {
      setBudget(evt.target.value);
   }

   const handleBudgetAPI = async () => {
      updateBudget(budget);
      const budgetPayload = {
         userName: props.user,
         budget: budget
      }
      try {
         const resp = await axios.post("http://localhost:9090/expensify-dashboard-api/saveBudgetDetails", budgetPayload);
         console.log(resp.data);
         if (resp.data == "Budget set successfully") {
            Swal.fire({
               icon: "success",
               title: "Budget set successfully",
               showConfirmButton: false,
               timer: 1500
            });
         }
      } catch (error) {
         console.log("error setting the budget", error);
      }
   }


   return (
      <div className="dashboardComp-section">
         <div className="flex justify-center items-center gap-7">

            <div className="overview border border-amber-50 rounded-tr-2xl rounded-b-2xl shadow-2xl flex">
               <img src={TotalBalance} />
               <div className="flex flex-col p-4.5">
                  <p className="font-bold text-gray-800 text-lg tracking-wide mb-2">Total Balance</p>
                  <h2>Rs: {balance < 10000 ? <span className="text-red-700">{balance}</span> : balance}</h2>
               </div>
            </div>

            <div className="overview border border-amber-50 rounded-tr-2xl rounded-b-2xl shadow-2xl flex">
               <img src={TotalIncome} />
               <div className="flex flex-col p-4.5">
                  <p className="font-bold text-gray-800 text-lg tracking-wide mb-2">Total Income</p>
                  <h2>Rs: {incomeAmount >= 100000 ? <span className="text-green-700">{incomeAmount}</span> : incomeAmount}</h2>
               </div>

            </div>

            <div className="overview border border-amber-50 rounded-tr-2xl rounded-b-2xl shadow-2xl flex">
               <img src={TotalExpense} />
               <div className="flex flex-col p-4.5">
                  <p className="font-bold text-gray-800 text-lg tracking-wide mb-2">Total Expenses</p>
                  <h2>Rs: {expenseAmount >= 100000 ? <span className="text-red-700">{expenseAmount}</span> : expenseAmount}</h2>
               </div>

            </div>

         </div>

         <div className="shadow-2xl rounded-xl pie-chart-css">
            <div className="flex">
               <div className="flex flex-col gap-6">
                  <h4 className="text-center">Monthly Budget</h4>
                  <div className="flex gap-2">
                     <img src={BalanceIcon} className="h-10" />
                     <h2>Rs: {budget}</h2>

                  </div>
                  <div className="budget-css">
                     <div className="budget-inner-css">

                     </div>
                  </div>
                  <Button className="budget-btn-alignment" onClick={() => handleBudget()}>Set Budget</Button>
                  <SetUserBudget
                     show={isBudgetClicked}
                     onClose={() => setIsBudgetClicked(false)}
                     title="Set Budget"
                     budget={budget}
                     handleBudget={handleBudgetAmount}
                     resetBudget={resetBudgetAmount}
                     handleBudgetAPI={handleBudgetAPI}

                  />
               </div>
               <div>
                  <h4 className="text-center">Income Overview</h4>
                  <PieChartData balance={balance}
                     incomeAmount={incomeAmount}
                     expenseAmount={expenseAmount} />
               </div>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-9">
            <div className="text-left expense-dashboard-section shadow-2xl p-3.5 rounded-xl">
               <h4 className="mb-2 font-semibold">Incomes</h4>
               <p className="opacity-70 font-medium">You are viewing your recent income sources </p>
               {
                  incomeListAllData.map((item) => (
                     <div className="flex income-div-alignment gap-6 justify-center items-center hover:rounded-xl hover:bg-gray-100 pt-1.5 cursor-pointer">

                        <div className="emoji-section rounded-full bg-gray-300 !pl-2.5">
                           {item.emoji ? item.emoji : <span className="font-medium">NA</span>}
                        </div>
                        <div className="flex flex-col">
                           <h6 className="source-css" title={item.source}>{item.source}</h6>
                           <h6 title={item.date}>{item.date}</h6>
                        </div>
                        <div className="bg-green-200 income-expense rounded-md">
                           + Rs:{item.amount}
                        </div>
                     </div>
                  ))
               }
            </div>

            <div className="text-center expense-dashboard-section shadow-2xl p-3.5 rounded-xl">
               <h4 className="mb-2 font-semibold text-center">Income Summary</h4>
               <IncomeBarChart incomeData={incomeList} />
            </div>

            <div className="text-left expense-dashboard-section shadow-2xl p-3.5 rounded-xl flex flex-col justify-center items-center">
               <h4 className="mb-2 font-semibold !text-left">Expense Overview</h4>
               <PieChartData
                  balance={balance}
                  incomeAmount={incomeAmount}
                  expenseAmount={expenseAmount}
               />
            </div>

            <div className="text-left expense-dashboard-section shadow-2xl p-3.5 rounded-xl">
               <h4 className="mb-2 font-semibold">Expenses</h4>
               <p className="opacity-70 font-medium">You are viewing your recent expense sources.</p>
               {expenseList.map((item) => (
                  <div className="flex income-div-alignment gap-6 justify-center items-center hover:rounded-xl hover:bg-gray-100 pt-1.5 p-2.5 cursor-pointer">

                     <div className="emoji-section rounded-full bg-gray-300 !pl-2.5">
                        {item.emoji ? item.emoji : <span className="font-medium">NA</span>}
                     </div>
                     <div className="flex flex-col">
                        <h6 className="source-css" title={item.source}>{item.source}</h6>
                        <h6 title={item.date}>{item.date}</h6>
                     </div>
                     <div className="bg-red-300 !text-red-600 income-expense rounded-md !pl-1 ">
                        - Rs:{item.amount}
                     </div>
                  </div>
               ))}

            </div>
         </div>

      </div>
   )
} export default DashboardChildComp;