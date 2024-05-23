// src/components/PatientList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'src/components/PatientList.css';

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
            <div>
                {patients.map(patient => (
                    <div 
                        key={patient._id} 
                        onClick={() => handleClick(patient._id)} 
                        style={{ cursor: 'pointer', padding: '10px', border: '1px solid #ccc', margin: '5px 0' }}
                    >
                        {patient.id} - {patient.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientList;
