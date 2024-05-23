// src/components/PatientDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PatientDetails = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [medicalHistory, setMedicalHistory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:7070/patients/${id}`);
                setPatient(response.data.patient);
                setMedicalHistory(response.data.medicalHistory);
                setLoading(false);
            } catch (err) {
                setError('Error fetching patient details');
                setLoading(false);
            }
        };

        fetchPatientDetails();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Patient Details</h1>
            {patient && (
                <>
                    <p><strong>ID:</strong> {patient.id}</p>
                    <p><strong>Name:</strong> {patient.name}</p>
                    <p><strong>Email:</strong> {patient.email}</p>
                    <p><strong>Age:</strong> {patient.age}</p>
                    <p><strong>Sex:</strong> {patient.sex}</p>
                </>
            )}
            <h2>Medical History</h2>
            {medicalHistory ? (
                <ul>
                    {Object.entries(medicalHistory).map(([key, value]) => (
                        (typeof value === 'boolean' && value) && <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</li>
                    ))}
                </ul>
            ) : (
                <p>No medical history available.</p>
            )}
        </div>
    );
};

export default PatientDetails;
