import React from "react";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ExpenseChart, AddExpense } from "./ResusableMethodsAndModals";
import axios from "axios";
import Swal from "sweetalert2";
import Delete from'/DeleteImage.png';
import Edit from'/Edit.png';
import { deleteEntry } from "./ResusableMethodsAndModals";
import { EditSection } from "./ResusableMethodsAndModals";
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
    const onCloseEdit = () => {
        setIsEditExpenseClicked(false);
    }

    const handleDownload = () => {

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
                <Button className="income-btn-alignment" onClick={()=>handleExpenseModal()}>+ Add Expense</Button>
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
                    title="Edit Income"
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
                    handleResetIncomeValues={handleResetExpenseValues}
                />

            </div>
            <div className="income-grid bg-white rounded-2xl p-6 shadow-md">
                <h2 className="text-left">Income Sources</h2>
                <Button className="income-btn-alignment" onClick={()=>handleDownload()}>
                    🡇&nbsp;Download
                </Button>
                <div className="grid grid-cols-3 gap-3">
                   {
                    expenseDetails.map((item)=> (
                       <div className="flex income-div-alignment gap-6 justify-center items-center hover:rounded-xl hover:bg-gray-100 pt-1.5 cursor-pointer">

                        <div className="emoji-section rounded-full bg-gray-300">
                            {item.emoji}
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