import React from "react";
import { IncomeBarChart, AddIncome } from "./ResusableMethodsAndModals";
import { Button, Form } from "react-bootstrap";
import {useState, useEffect} from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Delete from'/DeleteImage.png';
import Edit from'/Edit.png';
import { deleteEntry, EditSection, DownloadSection } from "./ResusableMethodsAndModals";
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
    const [editableObj, setEditableObj] = useState([]);
    const [isEditIncomeClicked, setIsEditIncomeClicked] = useState(false);
    const [editableId, setEditableId] = useState(-1);
    const [sortableDate, setSortableDate] = useState(false);
    const [sortableAmount, setSortableAmount] = useState(false);
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

    const handleDownloadModal = () => {
        setOpenDownloadWindow(true);
    }

    const handleDownload = async () => {
        const filteredIncomeData = incomeDataAll.map(item => ({
            source: item.source,
            amount: item.amount,
            date: item.date,
            userName: item.userName,
        }));

        const downloadRequestBody = {
            userName: props.user,
            incomeDataAll: filteredIncomeData,
            fileName: fileName,
            isDateChecked: isDateChecked,
        };

        try {
            const resp = await axios.post(
                "http://127.0.0.1:5000/downloadIncomeData",
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
        setEditableId(-1);
    }

    const handleDownloadClose = () => {
        setOpenDownloadWindow(false);
    }

    const handleClose = () => {
        setIsAddIncomeClicked(false);
    }
    const onCloseEdit = () => {
        setIsEditIncomeClicked(false);
    }
    const handleEditIncome = (id) => {
        const editablePart = incomeDataAll.filter((data)=> data.id === id);
        setEditableId(id);
        setIsEditIncomeClicked(true);
        setSource(editablePart[0]?.source);
        setEmoji(editablePart[0]?.emoji);
        setAmount(editablePart[0]?.amount);
        setDate(editablePart[0]?.date);
        setEditableObj(editablePart);
    }

    const handleSortableAmt = () => {
        const isSorted = sortableAmount;
        setSortableAmount(!sortableAmount);
        const sortableData = [...incomeDataAll].sort((a, b) =>
            isSorted ? a.amount - b.amount : b.amount - a.amount
        );

        setIncomeDataAll(sortableData);
    };

    const handleSortableDate = () => {
        const isSorted = sortableDate;
        setSortableDate(!sortableDate);

        const sortableData = [...incomeDataAll].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return isSorted ? dateA - dateB : dateB - dateA;
        });
        
        setIncomeDataAll(sortableData);
    };

    const handleEdit = async (evt) => {
        evt.preventDefault();
        const editIncomeRequestBody = {
            userName:cleanedUsername,
            source: source,
            amount: Number(amount),
            date: date,
            emoji: emoji.trim(),
            id:editableId
        };
        try {
            await axios.post("http://localhost:9090/expensify-income-api/editEntry", editIncomeRequestBody);
              Swal.fire({
                title: 'Success!',
                text: "Income values updated!",
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    handleResetIncomeValues();
                    onCloseEdit();
                    getIncomeDetails();
                    getIncomeDetailsAllInfo();
                }
            });
        } catch(error) {
            console.log("Error updating the income", error);
        }
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
                <EditSection
                    isEditClicked={isEditIncomeClicked}
                    onCloseEdit={onCloseEdit}
                    title="Edit Income"
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
                    handleEdit={handleEdit}
                    handleResetIncomeValues={handleResetIncomeValues}
                />

                <DownloadSection
                show={openDownloadWindow}
                onClose={handleDownloadClose}
                title="Download Income Data"
                handleFileName={handleFileName}
                fileName={fileName}
                isDateChecked={isDateChecked}
                handleDate={handleDate}
                resetDownloadData={resetDownloadData}
                handleDownload={handleDownload}
                />
            </div>
            <div className="income-grid bg-white rounded-2xl p-6 shadow-md">
                <h2 className="text-left">Income Sources</h2>
                <Button className="income-btn-alignment" onClick={() => handleDownloadModal()}>
                    🡇&nbsp;Download
                </Button>
                <div className="flex gap-2.5">
                    <h6 className="opacity-75">Sort by Date ? </h6>
                    <Form.Check
                        type="switch"
                        id="custom-date"
                        checked={sortableDate}
                        onChange={handleSortableDate}
                        disabled={sortableAmount}
                    />
                    <h6 className="opacity-75">Sort by Amount?</h6>
                    <Form.Check
                        type="switch"
                        id="custom-date"
                        checked={sortableAmount}
                        onChange={handleSortableAmt}
                        disabled={sortableDate}
                    />
                </div>
                <div className="grid grid-cols-3 gap-3">
                   {
                    incomeDataAll.map((item,index)=> (
                       <div className="flex income-div-alignment gap-6 justify-center items-center hover:rounded-xl hover:bg-gray-100 pt-1.5 cursor-pointer" key={item.id}>

                        <div className="emoji-section rounded-full bg-gray-300">
                        { item.emoji ? item.emoji: <span className="font-medium">NA</span>}
                        </div>
                        <div className="flex flex-col">
                        <h6>{item.source}</h6>
                        <h6>{item.date}</h6>
                        </div>
                        <div className="bg-green-200 income-expense rounded-md">
                            + Rs:{item.amount}
                        </div>
                        <img src={Edit} className="h-9 cursor-pointer" onClick={()=>handleEditIncome(item.id)}/>
                        <img src={Delete} className="h-7 cursor-pointer" onClick={()=>deleteEntry("income", item.id, getIncomeDetailsAllInfo,getIncomeDetails)}/>
                        </div>
                    ))
                   } 
                </div>
            </div>
        </div>
       
    )
} export default IncomeChildComp;