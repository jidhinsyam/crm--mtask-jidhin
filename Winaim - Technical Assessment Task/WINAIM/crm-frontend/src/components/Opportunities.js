 
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [newOpportunity, setNewOpportunity] = useState({
    title: '',
    description: '',
    value: 0,
    stage: '',
    customerId: '',
    expectedCloseDate: ''
  });
  const [editOpportunity, setEditOpportunity] = useState(null);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/opportunities');
      setOpportunities(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setNewOpportunity({ ...newOpportunity, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditOpportunity({ ...editOpportunity, [e.target.name]: e.target.value });
  };

  const handleAddOpportunity = async () => {
    try {
      await axios.post('http://localhost:5000/api/opportunities/post', newOpportunity);
      fetchOpportunities();
      setNewOpportunity({
        title: '',
        description: '',
        value: 0,
        stage: '',
        customerId: '',
        expectedCloseDate: ''
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditOpportunity = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/opportunities/${id}`, editOpportunity);
      fetchOpportunities();
      setEditOpportunity(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteOpportunity = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/opportunities/${id}`);
      fetchOpportunities();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Opportunities</h2>
      <div className="form-container">
        <h3>Add New Sales Opportunity</h3>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newOpportunity.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newOpportunity.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="value"
          placeholder="Value"
          value={newOpportunity.value}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="stage"
          placeholder="Stage"
          value={newOpportunity.stage}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="customerId"
          placeholder="Customer ID"
          value={newOpportunity.customerId}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="expectedCloseDate"
          placeholder="Expected Close Date"
          value={newOpportunity.expectedCloseDate}
          onChange={handleInputChange}
        />
        <button onClick={handleAddOpportunity}>Add Opportunity</button>
      </div>

      {editOpportunity && (
        <div className="form-container">
          <h3>Edit Opportunity</h3>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={editOpportunity.title || ''}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={editOpportunity.description || ''}
            onChange={handleEditChange}
          />
          <input
            type="number"
            name="value"
            placeholder="Value"
            value={editOpportunity.value || ''}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="stage"
            placeholder="Stage"
            value={editOpportunity.stage || ''}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="customerId"
            placeholder="Customer ID"
            value={editOpportunity.customerId || ''}
            onChange={handleEditChange}
          />
          <input
            type="date"
            name="expectedCloseDate"
            placeholder="Expected Close Date"
            value={editOpportunity.expectedCloseDate || ''}
            onChange={handleEditChange}
          />
          <button onClick={() => handleEditOpportunity(editOpportunity._id)}>Update Opportunity</button>
        </div>
      )}

      <ul className="opportunity-list">
        {opportunities.map((opportunity) => (
          <li key={opportunity._id} className="opportunity-item">
            {opportunity.title} - <b>value:</b>${opportunity.value} -<b>Stage:</b> : {opportunity.stage}
            <button
              className="btn btn-edit"
              onClick={() => setEditOpportunity(opportunity)}
            >
              Edit
            </button>
            <button
              className="btn btn-delete"
              onClick={() => handleDeleteOpportunity(opportunity._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Opportunities;
