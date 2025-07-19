import React from "react";
import { IncomeBarChart, AddIncome } from "./ResusableMethodsAndModals";
import { Button } from "react-bootstrap";
import {useState, useEffect} from "react";
import Swal from "sweetalert2";
import axios from "axios";

function IncomeChildComp() {
    const [isAddIncomeClicked, setIsAddIncomeClicked] = useState(false);
    const [source, setSource] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [emoji, setEmoji] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [incomeData, setIncomeDate] = useState([]);
    
    const handleAddIncome = () => {
        setIsAddIncomeClicked(true);
    }
    
    const onEmojiClick = (emojiData, event) => {
    setEmoji(emojiData.emoji);
    setShowEmojiPicker(false);
    };

    const handleIncome = async (evt) => {
      evt.preventDefault();
        const incomeRequestBody = {
            userName:"arnavk",
            source: source,
            amount: Number(amount),
            date: date,
            emoji: emoji.trim()
        };
        try {
            await axios.post("http://localhost:9090/expensify-income-api/incomeSaving", incomeRequestBody);
            Swal.fire({
                title: 'Success!',
                text: "Income values saved!",
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    handleResetIncomeValues();
                    handleClose();
                }
            });
        } catch (error) {
            console.log("Error saving the income details", error);
        }
    }

    const handleResetIncomeValues = () => {

    }

    const handleClose = () => {
        setIsAddIncomeClicked(false);
    }
    return (
        <div className="bg-white rounded-2xl p-6 shadow-md income-bar-chart">

            <h2 className="text-left">Income Overview</h2>
            <p className="text-left">Track your earnings over time and analyse income trends</p>
            <Button className="income-btn-alignment" onClick = {()=>handleAddIncome()}>+ Add Income</Button>
            <IncomeBarChart />
             <AddIncome show={isAddIncomeClicked}
             onClose={handleClose}
             title="Add Income"
             source={source}
             amount={amount}
             date={date}
             emoji={emoji}
             setSource={setSource}
             setAmount={setAmount}
             setDate={setDate}
             setEmoji={setEmoji}
             setShowEmojiPicker={setShowEmojiPicker}
             showEmojiPicker={showEmojiPicker}
             onEmojiClick={onEmojiClick}
             handleIncome={handleIncome}
             handleResetIncomeValues={handleResetIncomeValues}
             />
        </div>
       
    )
} export default IncomeChildComp;