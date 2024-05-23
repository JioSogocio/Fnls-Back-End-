// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Importing the CSS file

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Add Patient</Link>
                </li>
                <li>
                    <Link to="/patient-list">Patient List</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
