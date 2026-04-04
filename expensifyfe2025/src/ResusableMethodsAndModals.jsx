// IncomeBarChart.jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Modal, Form, Button } from 'react-bootstrap';
import EmojiPicker from 'emoji-picker-react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
    LineChart,
    Line,
    Area,
    AreaChart
} from 'recharts';


export const ExpenseChart = ({ expenseData }) => {
    return (
        <div className="w-full h-72 p-4 bg-white rounded-xl shadow">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={expenseData}>
                    <defs>
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#8b5cf6"
                        fillOpacity={1}
                        fill="url(#colorAmount)"
                    />
                    <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export const AddIncome = ({ show, onClose, title, source,
    amount,
    date,
    emoji,
    setSource,
    setAmount,
    setDate,
    setEmoji,
    setShowEmojiPicker,
    onEmojiClick,
    showEmojiPicker,
    handleIncome,
    handleResetIncomeValues
}) => {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="incomeSource">
                        <Form.Label>Income Source</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g. Freelance Work"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="incomeAmount">
                        <Form.Label>Amount (₹)</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="e.g. 5000"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="incomeDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="incomeEmoji">
                        <Form.Label>Emoji (optional)</Form.Label>
                        <div className="d-flex align-items-center gap-2">
                            <Form.Control
                                type="text"
                                value={emoji}
                                onChange={(e) => setEmoji(e.target.value)}
                                placeholder="Pick an emoji"
                                style={{ width: '80%' }}
                            />
                            <Button variant="outline-secondary emoji-option" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                                😀
                            </Button>
                        </div>
                        {showEmojiPicker && (
                            <div className="mt-2">
                                <EmojiPicker onEmojiClick={onEmojiClick} />
                            </div>
                        )}
                    </Form.Group>
                    <div className='flex justify-items-start gap-2.5 income-source'>
                        <Button variant="primary" type="submit" className="w-40" onClick={handleIncome}>
                            Add Income
                        </Button>
                        <Button variant="primary" type="submit" className="w-40" onClick={() => handleResetIncomeValues()}>
                            Reset
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export const AddExpense = ({ show, onClose, title, source,
    amount,
    date,
    emoji,
    setSource,
    setAmount,
    setDate,
    setEmoji,
    setShowEmojiPicker,
    onEmojiClick,
    showEmojiPicker,
    handleExpense,
    handleResetExpenseValues
}) => {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="incomeSource">
                        <Form.Label>Expense Source</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g. Rent, Fuel"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="incomeAmount">
                        <Form.Label>Amount (₹)</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="e.g. 5000"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="incomeDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="incomeEmoji">
                        <Form.Label>Emoji (optional)</Form.Label>
                        <div className="d-flex align-items-center gap-2">
                            <Form.Control
                                type="text"
                                value={emoji}
                                onChange={(e) => setEmoji(e.target.value)}
                                placeholder="Pick an emoji"
                                style={{ width: '80%' }}
                            />
                            <Button variant="outline-secondary emoji-option" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                                😀
                            </Button>
                        </div>
                        {showEmojiPicker && (
                            <div className="mt-2">
                                <EmojiPicker onEmojiClick={onEmojiClick} />
                            </div>
                        )}
                    </Form.Group>
                    <div className='flex justify-items-start gap-2.5 income-source'>
                        <Button variant="primary" type="submit" className="w-40" onClick={handleExpense}>
                            Add Expense
                        </Button>
                        <Button variant="primary" type="submit" className="w-40" onClick={() => handleResetExpenseValues()}>
                            Reset
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
export const RecExpense = ({ show, onClose, title, source,
    amount,
    date,
    emoji,
    setSource,
    setAmount,
    setDate,
    setEmoji,
    setShowEmojiPicker,
    onEmojiClick,
    showEmojiPicker,
    handleExpense,
    handleResetExpenseValues
}) => {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <ul className="list-items">
                    <li>1) Add recurring expense here it will be added every month.</li>
                    <li>2) You can cancel it anytime you would like.</li>
                </ul>

                <Form>
                    <Form.Group className="mb-3" controlId="incomeSource">
                        <Form.Label>Expense Source</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g. Rent, Fuel"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="incomeAmount">
                        <Form.Label>Amount (₹)</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="e.g. 5000"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {/* <Form.Group className="mb-3" controlId="incomeDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </Form.Group> */}
                    <Form.Group className="mb-3" controlId="incomeEmoji">
                        <Form.Label>Emoji (optional)</Form.Label>
                        <div className="d-flex align-items-center gap-2">
                            <Form.Control
                                type="text"
                                value={emoji}
                                onChange={(e) => setEmoji(e.target.value)}
                                placeholder="Pick an emoji"
                                style={{ width: '80%' }}
                            />
                            <Button variant="outline-secondary emoji-option" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                                😀
                            </Button>
                        </div>
                        {showEmojiPicker && (
                            <div className="mt-2">
                                <EmojiPicker onEmojiClick={onEmojiClick} />
                            </div>
                        )}
                    </Form.Group>
                    <div className='flex justify-items-start gap-2.5 income-source'>
                        <Button variant="primary" type="submit" className="w-40" onClick={handleExpense}>
                            Add Expense
                        </Button>
                        <Button variant="primary" type="submit" className="w-40" onClick={() => handleResetExpenseValues()}>
                            Reset
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export const IncomeBarChart = ({ incomeData }) => {
    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incomeData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="Amount" radius={[5, 5, 0, 0]} fill="#8B5CF6" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};


const COLORS = ['#F97316', '#EF4444', '#6366F1']; // Orange, Red, Indigo
export const PieChartData = ({ balance, incomeAmount, expenseAmount }) => {
    const pieChartData = [
        { name: 'Total Income', value: incomeAmount },
        { name: 'Total Expenses', value: expenseAmount },
        { name: 'Total Balance', value: balance },
    ];
    return (
        <PieChart width={400} height={300}>
            <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
            >
                {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    )
};

export const ChangePassword = ({ show, title, onClose, currentPassword, newPassword, setCurrentPassword, setNewPassword, handlePasswordChange, handleResetPasswords }) => {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul className='list-items'>
                    <li>1) To update your password, please enter your current one and choose a new one you'd like to set.</li>
                    <li>2) Make sure the new password is different from your current one.</li>
                    <li>3) For your security, use a strong password with a mix of letters, numbers, and symbols.</li>
                </ul>
                <Form>
                    <Form.Group className="mb-3" controlId="incomeSource">
                        <Form.Label>Current password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your current password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="incomeAmount">
                        <Form.Label>New password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <div className='flex justify-items-start gap-2.5 income-source'>
                        <Button variant="primary" type="submit" className="w-40" onClick={handlePasswordChange}>
                            Change
                        </Button>
                        <Button variant="primary" type="submit" className="w-40" onClick={() => handleResetPasswords()}>
                            Reset
                        </Button>
                    </div>


                </Form>
            </Modal.Body>
        </Modal>

    )
}

export const deleteEntry = async (type, index, getIncomeDetailsAllInfo, getIncomeDetails, getExpenseDetails) => {
    if (type === "income") {
        await deleteIncomeEntry(index, getIncomeDetailsAllInfo, getIncomeDetails);
    }
    else {
        await deleteExpenseEntry(index, getIncomeDetailsAllInfo);
    }
}

const deleteIncomeEntry = async (id, getIncomeDetailsAllInfo, getIncomeDetails) => {
    try {
        await axios.delete("http://localhost:9090/expensify-income-api/deleteEntry", { params: { id: id } });
        Swal.fire({
            title: 'Success!',
            text: 'Entry Deleted!.',
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
                confirmButton: 'my-confirm-button'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                getIncomeDetailsAllInfo();
                getIncomeDetails();
            }
        })
    }
    catch (error) {
        console.log("Error deleting income", error);
    }
}

const deleteExpenseEntry = async (id, getExpenseDetails) => {
    try {
        await axios.delete("http://localhost:9090/expensify-expense-api/deleteEntry", { params: { id: id } });
        Swal.fire({
            title: 'Success!',
            text: 'Entry Deleted!.',
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
                confirmButton: 'my-confirm-button'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                getExpenseDetails();
            }
        })
    }
    catch (error) {
        console.log("Error deleting expense", error);
    }
}
export const EditSection = ({ title, isEditClicked, onCloseEdit, showEmojiPicker, setShowEmojiPicker, source,
    amount,
    date,
    emoji, setSource, setAmount, setDate, setEmoji, handleEdit, onEmojiClick, handleResetValues, isRecurring }) => {
    return (
        <Modal show={isEditClicked} onHide={onCloseEdit} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isRecurring && (

                    <ul className="list-items">
                        <li>1) Add recurring expense here it will be added every month.</li>
                        <li>2) You can cancel it anytime you would like.</li>
                    </ul>

                )}
                <Form>
                    <Form.Group className="mb-3" controlId="incomeSource">
                        <Form.Label>Income Source</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g. Freelance Work"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="incomeAmount">
                        <Form.Label>Amount (₹)</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="e.g. 5000"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </Form.Group>
                    {!isRecurring && (
                        <Form.Group className="mb-3" controlId="incomeDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </Form.Group>
                    )}

                    <Form.Group className="mb-3" controlId="incomeEmoji">
                        <Form.Label>Emoji (optional)</Form.Label>
                        <div className="d-flex align-items-center gap-2">
                            <Form.Control
                                type="text"
                                value={emoji}
                                onChange={(e) => setEmoji(e.target.value)}
                                placeholder="Pick an emoji"
                                style={{ width: '80%' }}
                            />
                            <Button variant="outline-secondary emoji-option" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                                😀
                            </Button>
                        </div>
                        {showEmojiPicker && (
                            <div className="mt-2">
                                <EmojiPicker onEmojiClick={onEmojiClick} />
                            </div>
                        )}
                    </Form.Group>
                    <div className='flex justify-items-start gap-2.5 income-source'>
                        <Button variant="primary" type="submit" className="w-40" onClick={handleEdit}>
                            Edit
                        </Button>
                        <Button variant="primary" type="submit" className="w-40" onClick={handleResetValues}>
                            Reset
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export const DownloadSection = ({ show, onClose, title, handleFileName,
    fileName,
    isDateChecked,
    handleDate, resetDownloadData, handleDownload }) => {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul className='list-items'>
                    <li>1) Enter a custom name for your report (e.g., "Freelance Work" or "Monthly Summary").</li>
                    <li>2) You can choose to automatically append today’s date to the report name for easier tracking.</li>
                    <li>3) Once saved, the report will be generated with your chosen name and can be downloaded for your records.</li>
                </ul>

                <Form>
                    <Form.Group className="mb-3" controlId="incomeSource">
                        <Form.Label>File Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g. Freelance Work"
                            value={fileName}
                            onChange={handleFileName}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="incomeAmount">
                        <Form.Check
                            type="checkbox"
                            label="Append date to report name"
                            checked={isDateChecked}
                            onChange={handleDate}
                            className='font-medium'
                        />
                    </Form.Group>
                    <div className='flex justify-items-start gap-2.5 income-source'>
                        <Button variant="primary" type="button" className="w-40" onClick={() => handleDownload()}>
                            Download
                        </Button>
                        <Button variant="primary" type="button" className="w-40" onClick={() => resetDownloadData()}>
                            Reset
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>)
}
export const SetUserBudget = ({ show, onClose, title, handleBudget, resetBudget, budget, handleBudgetAPI }) => {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul className='list-items'>
                    <li>Please set your monthly budget</li>
                    <li>This is different from your total income and expenses</li>
                    <li>This is the amount you want to save each month</li>
                </ul>

                <Form>
                    <Form.Group className="mb-3" controlId="incomeSource">
                        <Form.Label>Budget</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g. 10000"
                            value={budget}
                            onChange={handleBudget}
                        />
                    </Form.Group>
                    <div className='flex justify-items-start gap-2.5 income-source'>
                        <Button variant="primary" type="button" className="w-40" onClick={() => handleBudgetAPI()}>
                            Set Budget
                        </Button>
                        <Button variant="primary" type="button" className="w-40" onClick={() => resetBudget()}>
                            Reset
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>)
}
