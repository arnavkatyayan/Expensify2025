import React from "react";
import { useState, useEffect } from "react";
import { Form,Button } from "react-bootstrap";
import { ExpenseChart, AddExpense, RecExpense } from "./ResusableMethodsAndModals";
import axios from "axios";
import Swal from "sweetalert2";
import Delete from'/DeleteImage.png';
import Edit from'/Edit.png';
import { deleteEntry } from "./ResusableMethodsAndModals";
import { EditSection, DownloadSection } from "./ResusableMethodsAndModals";
import Select from 'react-select';
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
    const [isRecurenceClicked, setIsRecurenceClicked] = useState(false);
    const [categoryRec, setCategoryRec] = useState("");
    const [amountRec, setAmountRec] = useState("");
    const [emojiRec, setEmojiRec] = useState("");
    const [showEmojiPickerRec, setShowEmojiPickerRec] = useState(false);
    const [dateRec, setDateRec] = useState("");
    const [recurringEditableIds, setRecurringEditableIds] = useState([]);
    const [isRecurring, setIsRecurring] = useState(false);
    const [recurringCheckbox, setRecurringCheckbox] = useState(false);

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
            handleRecurrenceExpenseIDs(resp.data);
            const filteredData = resp.data.map(({date,amount})=>({date,amount}));
           setExpenseDetailsForVisualization(filteredData);
        } catch(error) {
            console.log("error fetching expense details", error);
        }
    }

    const handleRecurrenceExpenseIDs = (data) => {
        const entries = data.filter((param)=>param.isRecurring === true);
        let ids = [];
        for(let i=0;i<entries.length;i++) {
            ids.push(entries[i].id);
        }
        console.log(ids);
        setRecurringEditableIds(ids);
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
            emoji: emoji.trim(),
            isRecurring:false
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

    const handleExpenseRec = async (evt) => {
         evt.preventDefault();
        const expenseRequestBody = {
            userName: props.user,
            source: categoryRec,
            amount: Number(amountRec),
            date: dateRec,
            emoji: emojiRec.trim(),
            isRecurring:true
        };
        try {
            await axios.post("http://localhost:9090/expensify-expense-api/recurringExpenseSaving", expenseRequestBody);
            Swal.fire({
                title: 'Success!',
                text: "Recurring Expense values saved!",
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    handleResetExpenseValuesRec();
                    handleCloseRec();
                    getExpenseDetails();
                }
            });
        } catch (error) {
            console.log("Error adding the expense detail", error);
        }

    }

    const handleResetExpenseValuesRec = () => {
        setCategoryRec("");
        setAmountRec("");
        setEmojiRec("");
        setDateRec("");
    }

     const handleEditExpense = (id) => {
        const editablePart = expenseDetails.filter((data)=> data.id === id);
        setEditableId(id);
        const isPresent = recurringEditableIds.some((ids)=>ids==id);
        if(isPresent) {
            setIsRecurring(true);
        }
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

    const handleCloseRec = () => {
        setIsRecurenceClicked(false);
    }

    const handleExpenseModal = () => {
        setIsAddExpenseClicked(true);
    }

    const handleRecurrenceExpenseModal = () => {
        setIsRecurenceClicked(true);
    }

    const onEmojiClick = (emojiData, event) => {
    setEmoji(emojiData.emoji);
    setShowEmojiPicker(false);
    };

    const onEmojiClickRec = (emojiData) => {
        setEmojiRec(emojiData.emoji);
        setShowEmojiPickerRec(false);
    } 

    const handleRecurringCheckbox = () => {
        setRecurringCheckbox(!recurringCheckbox);
    }

    useEffect(() => {
        const dummyData = [...expenseDetails];
        if (recurringCheckbox) {
            const filteredData = dummyData.filter((data) => data.isRecurring === true);
            setExpenseDetails(filteredData);
        }
        if (!recurringCheckbox) {
            getExpenseDetails();
        }
    }, [recurringCheckbox]);

    return (
        
        <div>
            <div className="bg-white rounded-2xl p-6 shadow-md income-line-chart">

                <h2 className="text-left">Expense Overview</h2>
                <p className="text-left">Track your spending trends over time and gain insights</p>
                <div className="flex gap-2.5">
                    <Button className="income-btn-alignment predict-btn" onClick={()=>handleRecurrenceExpenseModal()}>+Add Reccuring Expense</Button> 
                    {/* <Button className="income-btn-alignment predict-btn" onClick={() => handlePrediction()}>+ Predict</Button> */}
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

                <RecExpense show={isRecurenceClicked}
                    onClose={handleCloseRec}
                    title="Add Recurring Expense"
                    source={categoryRec}
                    amount={amountRec}
                    date={dateRec}
                    emoji={emojiRec}
                    setSource={setCategoryRec}
                    setAmount={setAmountRec}
                    setDate={setDateRec}
                    setEmoji={setEmojiRec}
                    setShowEmojiPicker={setShowEmojiPickerRec}
                    showEmojiPicker={showEmojiPickerRec}
                    onEmojiClick={onEmojiClickRec}
                    handleExpense={handleExpenseRec}
                    handleResetExpenseValues={handleResetExpenseValuesRec}
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
                    isRecurring={isRecurring}
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
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-left m-0">Expense Sources</h2>

                    <div className="flex items-center gap-3">
                        <Form.Check type="checkbox"
                        label="Show recurring entries"
                        checked={recurringCheckbox}
                        onChange={handleRecurringCheckbox}
                        />
                        <Select placeholder="Select Month" className="w-44" />
                        <Button onClick={() => handleDownloadModal()} className="income-btn-alignment-download">
                            🡇&nbsp;Download
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                   {
                    expenseDetails.map((item)=> (
                       <div className="flex income-div-alignment gap-6 justify-center items-center hover:rounded-xl hover:bg-gray-100 pt-1.5 cursor-pointer">

                        <div className="emoji-section rounded-full bg-gray-300">
                            { item.emoji ? item.emoji: <span className="font-medium">NA</span>}
                        </div>
                        <div className="flex flex-col">
                        <h6>{item.source}</h6>
                        {!item.isRecurring ? 
                        <h6>{item.date}</h6>
                           :<h6>(Rec Expense)</h6> }   
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