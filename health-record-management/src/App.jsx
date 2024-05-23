// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddPatientWithHistory from './components/AddPatient';
import PatientList from './components/PatientList';
import PatientDetails from './components/PatientDetails';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<AddPatientWithHistory />} />
                    <Route path="/patient-list" element={<PatientList />} />
                    <Route path="/patient-details/:id" element={<PatientDetails />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
