 
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [customersCount, setCustomersCount] = useState(0);
  const [contactsCount, setContactsCount] = useState(0);
  const [opportunitiesCount, setOpportunitiesCount] = useState(0);
  const [interactionsCount, setInteractionsCount] = useState(0);
  const [opportunitiesSummary, setOpportunitiesSummary] = useState({});

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const customersResponse = await axios.get('http://localhost:5000/api/customers');
      const contactsResponse = await axios.get('http://localhost:5000/api/contacts');
      const opportunitiesResponse = await axios.get('http://localhost:5000/api/opportunities');
      const interactionsResponse = await axios.get('http://localhost:5000/api/interactions');

      setCustomersCount(customersResponse.data.length);
      setContactsCount(contactsResponse.data.length);
      setOpportunitiesCount(opportunitiesResponse.data.length);
      setInteractionsCount(interactionsResponse.data.length);

      const stagesSummary = opportunitiesResponse.data.reduce((acc, opportunity) => {
        const stage = opportunity.stage;
        if (!acc[stage]) {
          acc[stage] = 0;
        }
        acc[stage]++;
        return acc;
      }, {});

      setOpportunitiesSummary(stagesSummary);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="dashboard-metrics">
        <div className="metric">
          <h3>Customers</h3>
          <p>{customersCount}</p>
        </div>
        <div className="metric">
          <h3>Contacts</h3>
          <p>{contactsCount}</p>
        </div>
        <div className="metric">
          <h3>Opportunities</h3>
          <p>{opportunitiesCount}</p>
        </div>
        <div className="metric">
          <h3>Interactions</h3>
          <p>{interactionsCount}</p>
        </div>
      </div>
      <h3>Opportunities by Stage</h3>
      <ul>
        {Object.keys(opportunitiesSummary).map((stage) => (
          <li key={stage}>
            {stage}: {opportunitiesSummary[stage]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
