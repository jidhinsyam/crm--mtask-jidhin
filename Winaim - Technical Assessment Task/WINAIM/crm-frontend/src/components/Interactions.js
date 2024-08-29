 
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Interactions = () => {
  const [interactions, setInteractions] = useState([]);
  const [newInteraction, setNewInteraction] = useState({
    type: '',
    date: '',
    notes: '',
    customerId: ''
  });

  useEffect(() => {
    fetchInteractions();
  }, []);

  const fetchInteractions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/interactions');
      setInteractions(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setNewInteraction({ ...newInteraction, [e.target.name]: e.target.value });
  };

  const handleAddInteraction = async () => {
    try {
      await axios.post('http://localhost:5000/api/interactions/post', newInteraction);
      fetchInteractions();
      setNewInteraction({
        type: '',
        date: '',
        notes: '',
        customerId: ''
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Interactions</h2>
      <div className="form-container">
        <h3>Log New Interaction</h3>
        <select
          name="type"
          value={newInteraction.type}
          onChange={handleInputChange}
        >
          <option value="">Select Type</option>
          <option value="Call">Call</option>
          <option value="Meeting">Meeting</option>
          <option value="Email">Email</option>
        </select>
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={newInteraction.date}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="notes"
          placeholder="Notes"
          value={newInteraction.notes}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="customerId"
          placeholder="Customer ID"
          value={newInteraction.customerId}
          onChange={handleInputChange}
        />
        <button onClick={handleAddInteraction}>Add Interaction</button>
      </div>
      <ul className="interaction-list">
        {interactions.map((interaction) => (
          <li key={interaction._id} className="interaction-item">
           <b>Interaction Type:</b> {interaction.type}<br></br><b>Date</b>{interaction.date} <br></br><b>Notes:</b><br></br><b>Id</b> {interaction._id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Interactions;
