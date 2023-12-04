import React, { useState, useEffect } from 'react';

const MyAccount = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data for the current authenticated user
        const fetchMyAccount = async () => {
            try {
                const response = await fetch('/api/users/myAccount'); // Adjust the API endpoint
                const data = await response.json();
                setUser(data.user); // Assuming your API returns a 'user' property
            } catch (error) {
                console.error('Error fetching user account:', error);
            }
        };

        fetchMyAccount();
    }, []);

    return (
        <div>
            <h1>My Account</h1>
            {user ? (
                <div>
                    <h2>{user.login}</h2>
                    <p>{user.email}</p>
                    {/* Add more details or styling as needed */}
                </div>
            ) : (
                <p>Loading user account...</p>
            )}
        </div>
    );
};

export default MyAccount;
