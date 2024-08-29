 
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', position: '', email: '', phone: '', customerId: '' });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/contacts');
      setContacts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const handleAddContact = async () => {
    try {
      await axios.post('http://localhost:5000/api/contacts/post', newContact);
      fetchContacts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Contacts</h2>
      <div>
        <input type="text" name="name" placeholder="Name" onChange={handleInputChange} />
        <input type="text" name="position" placeholder="Position" onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
        <input type="text" name="phone" placeholder="Phone" onChange={handleInputChange} />
        <input type="text" name="customerId" placeholder="Customer ID" onChange={handleInputChange} />
        <button onClick={handleAddContact}>Add Contact</button>
      </div>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}><b>Name:</b>{contact.name} <br></br><b>email:</b> {contact.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
