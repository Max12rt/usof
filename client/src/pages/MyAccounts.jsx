import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyAccount = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/myAccount');
                setUser(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>My Account</h1>
            {user ? (
                <div>
                    <p>Login: {user.login}</p>
                    <p>Email: {user.email}</p>
                    <p>Full Name: {user.full_name}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MyAccount;
