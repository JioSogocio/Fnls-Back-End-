// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddPatientWithHistory from './components/AddPatient';
import PatientList from './components/PatientList';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<AddPatientWithHistory />} />
                    <Route path="/patient-list" element={<PatientList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
