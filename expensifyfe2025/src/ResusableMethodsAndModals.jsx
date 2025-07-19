// IncomeBarChart.jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Modal, Form, Button } from 'react-bootstrap';
import EmojiPicker from 'emoji-picker-react';
const data = [
//   { date: '1st Jan', income: 12000 },
//   { date: '4th Jan', income: 8500 },
//   { date: '6th Jan', income: 9200 },
//   { date: '7th Jan', income: 13800 },
//   { date: '8th Jan', income: 1500 },
//   { date: '9th Jan', income: 7400 },
//   { date: '10th Jan', income: 10000 },
//   { date: '11th Jan', income: 10800 },
//   { date: '13th Jan', income: 9300 },
//   { date: '12th Feb', income: 11500 },
];

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
                        <Button variant="primary" type="submit" className="w-40" onClick={()=> handleResetIncomeValues()}>
                            Reset
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export const IncomeBarChart = () => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" radius={[5, 5, 0, 0]} fill="#8B5CF6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};


