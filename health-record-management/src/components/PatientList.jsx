// src/components/PatientList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await axios.get('http://localhost:7070/patients');
            setPatients(response.data);
        } catch (err) {
            console.error('Error fetching patients:', err);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:7070/patients/search', { params: { name: searchTerm } });
            setPatients(response.data);
        } catch (err) {
            console.error('Error searching patients:', err);
        }
    };

    return (
        <div>
            <h1>Patient List</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <ul>
                {patients.map(patient => (
                    <li key={patient._id}>{patient.id} - {patient.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PatientList;
