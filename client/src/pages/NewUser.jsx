// NewUser.jsx
import React, { useState } from 'react';
import axios from 'axios';

const NewUser = () => {
    const [formData, setFormData] = useState({
        login: '',
        email: '',
        password: '',
        full_name: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/newUser', formData);
            // Add any additional handling or redirection logic after successful submission
        } catch (error) {
            console.error(error);
            // Add error handling logic
        }
    };

    return (
        <div>
            <h1>New User</h1>
            <form onSubmit={handleSubmit}>
                <label>Login:</label>
                <input type="text" name="login" onChange={handleChange} />

                <label>Email:</label>
                <input type="email" name="email" onChange={handleChange} />

                <label>Password:</label>
                <input type="password" name="password" onChange={handleChange} />

                <label>Full Name:</label>
                <input type="text" name="full_name" onChange={handleChange} />

                <button type="submit">Create User</button>
            </form>
        </div>
    );
};

export default NewUser;
