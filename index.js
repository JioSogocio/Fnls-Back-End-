
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Patient, MedicalHistory } = require('./models/patient');

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

app.post('/patients', async (req, res) => {
    try {
        const { id, name, email, age, sex, medicalHistory } = req.body;
        const newPatient = new Patient({ id, name, email, age, sex });
        const savedPatient = await newPatient.save();

        const newMedicalHistory = new MedicalHistory({
            patientId: savedPatient._id,
            ...medicalHistory
        });
        const savedMedicalHistory = await newMedicalHistory.save();

        res.status(201).json({
            message: 'Successfully Added Data',
            patient: savedPatient,
            medicalHistory: savedMedicalHistory
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const port = 7070;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});