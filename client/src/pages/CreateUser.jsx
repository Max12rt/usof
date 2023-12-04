import React, { useState } from 'react';

const CreateUser = () => {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform the user creation POST request here
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, email, password, full_name: fullName }),
            });

            if (response.status === 201) {
                // User created successfully
                // You may want to redirect to the user details page or handle as needed
                console.log('User created successfully!');
            } else {
                console.error('Error creating user:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                {/* Add form fields for login, email, password, and full name */}
                <label>Login:</label>
                <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} required />

                {/* Repeat similar input fields for other properties */}

                <button type="submit">Create User</button>
            </form>
        </div>
    );
};

export default CreateUser;
