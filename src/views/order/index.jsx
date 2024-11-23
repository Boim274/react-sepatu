import { useState } from 'react';
import api from '../../api';

export default function CreateOrder() {
  const [userId, setUserId] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      user_id: userId,
      total_price: totalPrice,
      status: status,
    };

    try {
      const response = await api.post('http://localhost:8000/api/orders', orderData);
      alert('Order created successfully');
    } catch (error) {
      setErrors(error.response.data.errors || {});
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User ID"
        />
        <input
          type="text"
          value={totalPrice}
          onChange={(e) => setTotalPrice(e.target.value)}
          placeholder="Total Price"
        />
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Status"
        />
        <button type="submit">Create Order</button>
      </form>
    </div>
  );
}
