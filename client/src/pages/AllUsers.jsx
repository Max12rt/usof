// AllUsers.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/users');
                setUsers(response.data.rows);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>All Users</h1>
            <ul>
                {users.forEach((user) => (
                    <li key={user.id}>
                        {user.full_name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllUsers;
