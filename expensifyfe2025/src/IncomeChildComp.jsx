import React from "react";
import { IncomeBarChart, AddIncome } from "./ResusableMethodsAndModals";
import { Button } from "react-bootstrap";
import {useState, useEffect} from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Delete from'/DeleteImage.png';
import { deleteEntry } from "./ResusableMethodsAndModals";
function IncomeChildComp(props) {
    const [isAddIncomeClicked, setIsAddIncomeClicked] = useState(false);
    const [source, setSource] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [emoji, setEmoji] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [incomeData, setIncomeData] = useState([]);
    const cleanedUsername = props.user.trim().replace(/[^\w]/g, '');
    const [incomeDataAll, setIncomeDataAll] = useState([]);

    useEffect(()=> {
        getIncomeDetails(); 
        getIncomeDetailsAllInfo();
    },[]);
 

    const getIncomeDetails = async () => {
        try {
            const resp = await axios.get("http://localhost:9090/expensify-income-api/fetchIncomeDetails", { params: { userName: cleanedUsername } });
            const result = Object.entries(resp.data).map(([date, amount]) => ({
                Date: date,
                Amount: amount
            }));
            setIncomeData(result);
        } catch (error) {
            console.log("Error fetching the income details", error);
        }
    }

    const handleDownload = async () => {

        const filteredIncomeData = incomeDataAll.map(item => {
            return {
                source: item.source,
                amount: item.amount,
                date: item.date,
                userName: item.userName
            };
        });
        const downloadRequestBody = {
            userName: props.user,
            incomeDataAll: filteredIncomeData
        };

        try {
            const resp = await axios.post("http://127.0.0.1:5000/download", downloadRequestBody, {
                responseType: 'blob', // IMPORTANT for file download
            });

            const url = window.URL.createObjectURL(new Blob([resp.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = `${props.user}_income_data.csv`; // or .xlsx or .json based on file
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log("Error handling the download", error);
        }
    };


    const getIncomeDetailsAllInfo = async () => {
        try {
            const resp = await axios.get("http://localhost:9090/expensify-income-api/fetchAllIncomeDetails",{params:{userName:props.user}});
            setIncomeDataAll(resp.data);
        } catch(error) {
            console.log("error fetching the details",error);
        }
    }
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
            userName:cleanedUsername,
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
                    getIncomeDetails();
                    getIncomeDetailsAllInfo();
                }
            });
        } catch (error) {
            console.log("Error saving the income details", error);
        }
    }

    const handleResetIncomeValues = () => {
        setSource("");
        setAmount("");
        setEmoji("");
        setDate("");
    }

    const handleClose = () => {
        setIsAddIncomeClicked(false);
    }
    return (
        <div>
            <div className="bg-white rounded-2xl p-6 shadow-md income-bar-chart">

                <h2 className="text-left">Income Overview</h2>
                <p className="text-left">Track your earnings over time and analyse income trends</p>
                <Button className="income-btn-alignment" onClick={() => handleAddIncome()}>+ Add Income</Button>
                <IncomeBarChart
                    incomeData={incomeData}
                />

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
            <div className="income-grid bg-white rounded-2xl p-6 shadow-md">
                <h2 className="text-left">Income Sources</h2>
                <Button className="income-btn-alignment" onClick={() => handleDownload()}>
                    🡇&nbsp;Download
                </Button>
                <div className="grid grid-cols-3 gap-3">
                   {
                    incomeDataAll.map((item,index)=> (
                       <div className="flex income-div-alignment gap-6 justify-center items-center hover:rounded-xl hover:bg-gray-100 pt-1.5 cursor-pointer" key={item.id}>

                        <div className="emoji-section rounded-full bg-gray-300">
                            {item.emoji}
                        </div>
                        <div className="flex flex-col">
                        <h6>{item.source}</h6>
                        <h6>{item.date}</h6>
                        </div>
                        <div className="bg-green-200 income-expense rounded-md">
                            + Rs:{item.amount}
                        </div>
                        <img src={Delete} className="h-7 cursor-pointer" onClick={()=>deleteEntry("income", item.id, getIncomeDetailsAllInfo,getIncomeDetails)}/>
                        </div>
                    ))
                   } 
                </div>
            </div>
        </div>
       
    )
} export default IncomeChildComp;