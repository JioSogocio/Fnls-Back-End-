const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Patient, MedicalHistory } = require('./models/patient'); // Ensure the path is correct

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Patient')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

// Example endpoint for creating a new patient with medical history
app.post('/patients', async (req, res) => {
    try {
        const { id, name, email, age, sex, medicalHistory } = req.body;
        
        // Create a new patient
        const newPatient = new Patient({ id, name, email, age, sex });
        const savedPatient = await newPatient.save();

        // Create a new medical history associated with the patient
        const newMedicalHistory = new MedicalHistory({
            patientId: savedPatient._id, // Associate with the patient
            ...medicalHistory
        });
        const savedMedicalHistory = await newMedicalHistory.save();

        res.status(201).json({
            message: 'Patient and medical history created successfully',
            patient: savedPatient,
            medicalHistory: savedMedicalHistory
        });
    } catch (err) {
        console.error('Error creating patient and medical history:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Route to get all patients
app.get('/patients', async (req, res) => {
    try {
        const patients = await Patient.find({}, 'id name');
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to search patients by name
app.get('/patients/search', async (req, res) => {
    const { name } = req.query;
    try {
        const patients = await Patient.find({ name: new RegExp(name, 'i') }, 'id name');
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/patients/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const patient = await Patient.findById(id);
        const medicalHistory = await MedicalHistory.findOne({ patientId: id });
        res.json({ patient, medicalHistory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const port = 7070;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
