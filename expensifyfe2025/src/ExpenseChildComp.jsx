import React from "react";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ExpenseChart, AddExpense } from "./ResusableMethodsAndModals";
import axios from "axios";
import Swal from "sweetalert2";
import Delete from'/DeleteImage.png';
import Edit from'/Edit.png';
import { deleteEntry } from "./ResusableMethodsAndModals";
import { EditSection,DownloadSection } from "./ResusableMethodsAndModals";
function ExpenseChildComp(props) {
    const [isAddExpenseClicked, setIsAddExpenseClicked] = useState(false);
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [emoji, setEmoji] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [date, setDate] = useState("");
    const [expenseDetails, setExpenseDetails] = useState([]);
    const [expenseDetailsForVisualization, setExpenseDetailsForVisualization] = useState([]);
    const [editableId, setEditableId] = useState(-1);
    const [isEditExpenseClicked, setIsEditExpenseClicked] = useState(false);
    const [openDownloadWindow, setOpenDownloadWindow] = useState(false);
    const [fileName, setFileName] = useState("");
    const [isDateChecked, setIsDateChecked] = useState(false);

    const handleFileName = (evt) => {
        setFileName(evt.target.value);
    }

    const handleDate = () => {
        setIsDateChecked(!isDateChecked);
    }

    const resetDownloadData = () => {
        setFileName("");
        setIsDateChecked(false);
    }

    const handleDownloadClose = () => {
        setOpenDownloadWindow(false);
    }
    const getExpenseDetails = async () => {
        try {
            const resp = await axios.get("http://localhost:9090/expensify-expense-api/getExpenseDetails",{params:{userName:props.user}});
            setExpenseDetails(resp.data);
            const filteredData = resp.data.map(({date,amount})=>({date,amount}));
           setExpenseDetailsForVisualization(filteredData);
        } catch(error) {
            console.log("error fetching expense details", error);
        }
    }

    useEffect(()=> {
        getExpenseDetails();
    },[]);

    const handleExpense = async (evt) => {
        evt.preventDefault();
        const expenseRequestBody = {
            userName: props.user,
            source: category,
            amount: Number(amount),
            date: date,
            emoji: emoji.trim()
        };
        try {
            await axios.post("http://localhost:9090/expensify-expense-api/expenseSaving", expenseRequestBody);
            Swal.fire({
                title: 'Success!',
                text: "Expense values saved!",
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    handleResetExpenseValues();
                    handleClose();
                    getExpenseDetails();
                }
            });
        } catch (error) {
            console.log("Error adding the expense detail", error);
        }
    }

     const handleEditExpense = (id) => {
        const editablePart = expenseDetails.filter((data)=> data.id === id);
        setEditableId(id);
        setIsEditExpenseClicked(true);
        setCategory(editablePart[0]?.source);
        setEmoji(editablePart[0]?.emoji);
        setAmount(editablePart[0]?.amount);
        setDate(editablePart[0]?.date);
    }

    const handleEdit = async (evt) => {
        evt.preventDefault();
        const editExpenseRequestBody = {
            userName:props.user,
            source: category,
            amount: Number(amount),
            date: date,
            emoji: emoji.trim(),
            id:editableId
        };
        try {
            await axios.post("http://localhost:9090/expensify-expense-api/editEntry", editExpenseRequestBody);
              Swal.fire({
                title: 'Success!',
                text: "Expense values updated!",
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    onCloseEdit();
                    getExpenseDetails();
                    handleResetExpenseValues();
                }
            });
        } catch(error) {
            console.log("Error updating the income", error);
        }
    }

    const handleResetExpenseValues = () => {
        setCategory("");
        setAmount("");
        setEmoji("");
        setDate("");
        setEditableId(-1);
    }

    const handlePrediction = () => {

    }
    const onCloseEdit = () => {
        setIsEditExpenseClicked(false);
    }

     const handleDownload = async () => {
        const filteredExpenseData = expenseDetails.map(item => ({
            source: item.source,
            amount: item.amount,
            date: item.date,
            userName: item.userName,
        }));

        const downloadRequestBody = {
            userName: props.user,
            expenseData: filteredExpenseData,
            fileName: fileName,
            isDateChecked: isDateChecked,
        };

        try {
            const resp = await axios.post(
                "http://127.0.0.1:5000/downloadExpenseData",
                downloadRequestBody,
                { responseType: "blob" } // critical for binary download
            );

            // Create blob
            const blob = new Blob([resp.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");

            // ✅ FE-level filename logic
            let suggestedFileName = fileName?.trim().replace(/\s+/g, "_") || `${props.user}_income_data`;

            if (isDateChecked) {
                const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
                suggestedFileName = `${suggestedFileName}_${today}.csv`;
            } else {
                suggestedFileName = `${suggestedFileName}.csv`;
            }

            a.href = url;
            a.download = suggestedFileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setOpenDownloadWindow(false);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error handling the download", error);
        }
    };

    const handleDownloadModal = () => {
        setOpenDownloadWindow(true);
    }

    const handleClose = () => {
        setIsAddExpenseClicked(false);
    }

    const handleExpenseModal = () => {
        setIsAddExpenseClicked(true);
    }

    const onEmojiClick = (emojiData, event) => {
    setEmoji(emojiData.emoji);
    setShowEmojiPicker(false);
    };

    return (
        
        <div>
            <div className="bg-white rounded-2xl p-6 shadow-md income-line-chart">

                <h2 className="text-left">Expense Overview</h2>
                <p className="text-left">Track your spending trends over time and gain insights</p>
                <div className="flex gap-2.5">
                    <Button className="income-btn-alignment predict-btn" onClick={() => handlePrediction()}>+ Predict</Button>
                    <Button className="income-btn-alignment" onClick={() => handleExpenseModal()}>+ Add Expense</Button>
                </div>
                <ExpenseChart
                expenseData={expenseDetailsForVisualization}
                />

                <AddExpense show={isAddExpenseClicked}
                    onClose={handleClose}
                    title="Add Expense"
                    source={category}
                    amount={amount}
                    date={date}
                    emoji={emoji}
                    setSource={setCategory}
                    setAmount={setAmount}
                    setDate={setDate}
                    setEmoji={setEmoji}
                    setShowEmojiPicker={setShowEmojiPicker}
                    showEmojiPicker={showEmojiPicker}
                    onEmojiClick={onEmojiClick}
                    handleExpense={handleExpense}
                    handleResetExpenseValues={handleResetExpenseValues}
                />

                <EditSection
                    isEditClicked={isEditExpenseClicked}
                    onCloseEdit={onCloseEdit}
                    title="Edit Expenses"
                    source={category}
                    amount={amount}
                    date={date}
                    emoji={emoji}
                    setSource={setCategory}
                    setAmount={setAmount}
                    setDate={setDate}
                    setEmoji={setEmoji}
                    setShowEmojiPicker={setShowEmojiPicker}
                    showEmojiPicker={showEmojiPicker}
                    onEmojiClick={onEmojiClick}
                    handleEdit={handleEdit}
                    handleResetValues={handleResetExpenseValues}
                />

                <DownloadSection
                    show={openDownloadWindow}
                    onClose={handleDownloadClose}
                    title="Download Expense Data"
                    handleFileName={handleFileName}
                    fileName={fileName}
                    isDateChecked={isDateChecked}
                    handleDate={handleDate}
                    resetDownloadData={resetDownloadData}
                    handleDownload={handleDownload}
                />
            </div>
            <div className="income-grid bg-white rounded-2xl p-6 shadow-md">
                <h2 className="text-left">Expense Sources</h2>
                <Button className="income-btn-alignment" onClick={()=>handleDownloadModal()}>
                    🡇&nbsp;Download
                </Button>
                <div className="grid grid-cols-3 gap-3">
                   {
                    expenseDetails.map((item)=> (
                       <div className="flex income-div-alignment gap-6 justify-center items-center hover:rounded-xl hover:bg-gray-100 pt-1.5 cursor-pointer">

                        <div className="emoji-section rounded-full bg-gray-300">
                            { item.emoji ? item.emoji: <span className="font-medium">NA</span>}
                        </div>
                        <div className="flex flex-col">
                        <h6>{item.source}</h6>
                        <h6>{item.date}</h6>
                        </div>
                        <div className="bg-red-300 !text-red-600 income-expense rounded-md">
                            - Rs:{item.amount}
                        </div>
                            <img src={Edit} className="h-9 cursor-pointer" onClick={() => handleEditExpense(item.id)} />
                            <img src={Delete} className="h-7 cursor-pointer" onClick={() => deleteEntry("expense", item.id, getExpenseDetails)} />
                        </div>
                    ))
                   } 
                </div>
            </div>
        </div>
       
    )
    
} export default ExpenseChildComp;