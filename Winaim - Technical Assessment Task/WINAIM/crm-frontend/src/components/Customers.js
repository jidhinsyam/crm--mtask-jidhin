 
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    industry: ''
  });
  const [editCustomer, setEditCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/customers');
      setCustomers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditCustomer({ ...editCustomer, [e.target.name]: e.target.value });
  };

  const handleAddCustomer = async () => {
    try {
      await axios.post('http://localhost:5000/api/customers/post', newCustomer);
      fetchCustomers();
      setNewCustomer({
        name: '',
        email: '',
        phone: '',
        address: '',
        industry: ''
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditCustomer = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/customers/${id}`, editCustomer);
      fetchCustomers();
      setEditCustomer(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/customers/${id}`);
      fetchCustomers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Customers</h2>
      
      <div className="form-container">
        <h3>Add New Customer</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newCustomer.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newCustomer.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={newCustomer.phone}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newCustomer.address}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="industry"
          placeholder="Industry"
          value={newCustomer.industry}
          onChange={handleInputChange}
        />
        <button onClick={handleAddCustomer}>Add Customer</button>
      </div>

      {editCustomer && (
        <div className="form-container">
          <h3>Edit Customer</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={editCustomer.name || ''}
            onChange={handleEditChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={editCustomer.email || ''}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={editCustomer.phone || ''}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={editCustomer.address || ''}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="industry"
            placeholder="Industry"
            value={editCustomer.industry || ''}
            onChange={handleEditChange}
          />
          <button onClick={() => handleEditCustomer(editCustomer._id)}>Update Customer</button>
        </div>
      )}

      <ul className="customer-list">
        {customers.map((customer) => (
          <li key={customer._id} className="customer-item">
           <b>Name</b>: {customer.name}<br></br><b>E-mail</b>:{customer.email}<br></br><b>customer Id</b>:{customer._id}
           <br></br>
            <button
              className="btn btn-edit"
              onClick={() => setEditCustomer(customer)}
            >
              Edit
            </button>
            <button
              className="btn btn-delete"
              onClick={() => handleDeleteCustomer(customer._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Customers;
