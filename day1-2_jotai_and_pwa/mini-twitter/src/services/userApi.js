import { useState } from "react";

const userApi = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    // GET DATA USER
    const getUserDataFetch = async (token) => {
        try {
            const response = await fetch('http://localhost:1337/api/users/me', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Get user data failed. Please check your credentials and try again.');
            }

            const userData = await response.json();
            setResponse(userData)
        } catch (error) {
            setError(`Error during register: ${error.message}`);
        }
    }

    // UPDATE DATA USER
    const updateUserDataFetch = async (token, username, description, USER_ID) => {
        try {
            const data = {
                username: username,
                description: description
            };
            console.log(data)
            const response = await fetch(`http://localhost:1337/api/users/${USER_ID}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Save changes failed. Please check your credentials and try again.');
            }

            const userData = await response.json();
            setResponse(userData)
        } catch (error) {
            setError(`Error during login: ${error.message}`);
        }
    }



    return { response, error, getUserDataFetch, updateUserDataFetch }
};

export default userApi