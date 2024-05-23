import React, { useState } from 'react';
import axios from 'axios';

const AddPatientWithHistory = () => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        age: '',
        sex: '',
        medicalHistory: {
            allergies: false,
            anemia: false,
            asthma: false,
            behavioralProblem: false,
            chickenPox: false,
            convulsion: false,
            diabetes: false,
            eyeProblem: false,
            dengue: false,
            epilepsy: false,
            measles: false,
            mumps: false,
            heartDisorders: false,
            fainting: false,
            fracture: false,
            kidneyDisease: false,
            lungDisease: false,
            spineProblem: false,
            tonsilitis: false,
            visionProblem: false,
        }
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData({
                ...formData,
                medicalHistory: {
                    ...formData.medicalHistory,
                    [name]: checked,
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:7070/patients', formData);
            console.log('Patient added:', response.data);
            alert('Patient added successfully');
            setFormData({
                id: '',
                name: '',
                email: '',
                age: '',
                sex: '',
                medicalHistory: {
                    allergies: false,
                    anemia: false,
                    asthma: false,
                    behavioralProblem: false,
                    chickenPox: false,
                    convulsion: false,
                    diabetes: false,
                    eyeProblem: false,
                    dengue: false,
                    epilepsy: false,
                    measles: false,
                    mumps: false,
                    heartDisorders: false,
                    fainting: false,
                    fracture: false,
                    kidneyDisease: false,
                    lungDisease: false,
                    spineProblem: false,
                    tonsilitis: false,
                    visionProblem: false,
                }
            });
        } catch (err) {
            console.error('Error adding patient:', err);
            alert('Error adding patient');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>

            </div>
            <div>
                <label>ID: </label>
                <input type="text" name="id" value={formData.id} onChange={handleChange} required />
            </div>
            <br />
            <div>
                <label>Name: </label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <br />
            <div>
                <label>Email: </label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <br />
            <div>
                <label>Age: </label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required />
            </div>
            <br />
            <div>
                <label>Sex: </label>
                <input type="text" name="sex" value={formData.sex} onChange={handleChange} required />
            </div>
            <br />
            <div>
                <h1>Medical History</h1>
                    {Object.keys(formData.medicalHistory).map((key) => (
                        <div key={key}>
                            <label>{key.charAt(0).toUpperCase() + key.slice(1)}: </label>
                            <input type="checkbox" name={key} checked={formData.medicalHistory[key]} onChange={handleChange} />
                        </div>
                    ))}
            </div> 
                
        <br />

            <button type="submit">Add Patient</button>
        </form>
    );
};

export default AddPatientWithHistory;
