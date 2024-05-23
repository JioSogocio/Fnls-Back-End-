// PatientList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PatientList.css'; // Importing the CSS file

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

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

    const handleClick = (id) => {
        navigate(`/patient-details/${id}`);
    };

    return (
        <div className="patient-list-container">
            <h1>Patient List</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">Search</button>
            </div>
            <div className="patient-list">
                {patients.map(patient => (
                    <div 
                        key={patient._id} 
                        onClick={() => handleClick(patient._id)} 
                        className="patient-item"
                    >
                        <span>{patient.id}</span> - <span>{patient.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientList;
