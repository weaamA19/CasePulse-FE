import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default function CasesList() {
  const [casesList, setCasesList] = useState([]);

  useEffect(() => {
    loadCasesList();
  }, []);

  const loadCasesList = () => {
    Axios.get("http://127.0.0.1:8000/api/usercases/", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token'),
      },
    })
      .then((response) => {
        console.log(response.data);
        setCasesList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Cases List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Client CPR</th>
            <th>Client Email</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {casesList.map((caseItem, index) => (
            
            <tr key={index}>
              <td>
                <Link to={`/cases/${caseItem.id}/`}>
                  <h3>{caseItem.title}</h3>
                </Link>
              </td>
              <td>{caseItem.description}</td>
              <td>{caseItem.status}</td>
              <td>{caseItem.clientCPR}</td>
              <td>{caseItem.clientEmail}</td>
              <td>{caseItem.case_start_date}</td>
              <td>{caseItem.case_end_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}