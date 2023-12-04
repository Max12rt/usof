import React, { useState, useEffect } from 'react';

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch all users data from the server
        const fetchAllUsers = async () => {
            try {
                const response = await fetch('/api/users'); // Adjust the API endpoint
                const data = await response.json();
                setUsers(data.users); // Assuming your API returns a 'users' property
            } catch (error) {
                console.error('Error fetching all users:', error);
            }
        };

        fetchAllUsers();
    }, []);

    return (
        <div>
            <h1>All Users</h1>
            {users.forEach((user) => (
                <div key={user.id}>
                    <h2>{user.login}</h2>
                    <p>{user.email}</p>
                    {/* Add more details or styling as needed */}
                </div>
            ))}
        </div>
    );
};

export default AllUsers;
