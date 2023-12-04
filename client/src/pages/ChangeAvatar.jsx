// ChangeAvatar.js
import React, { useState } from 'react';
import axios from 'axios';

const ChangeAvatar = () => {
    const [avatar, setAvatar] = useState(null);

    const handleFileChange = e => {
        setAvatar(e.target.files[0]);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('avatar', avatar);

            await axios.post('/api/user/avatar', formData);
            // Optionally, redirect or show a success message
        } catch (error) {
            console.error('Error changing avatar:', error);
        }
    };

    return (
        <div>
            <h1>Change Avatar</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Select Avatar:
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </label>
                <br />
                <button type="submit">Change Avatar</button>
            </form>
        </div>
    );
};

export default ChangeAvatar;
