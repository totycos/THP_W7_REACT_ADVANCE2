import { useState } from "react";

const authApi = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    // POST TO REGISTER
    const registerFetch = async (username, email, password) => {
        try {
            const data = {
                username: username,
                email: email,
                password: password
            };
            console.log('data:', data)
            const response = await fetch('http://localhost:1337/api/auth/local/register', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Register failed. Please check your credentials and try again.');
            }

            const userData = await response.json();
            setResponse(userData)
        } catch (error) {
            setError(`Error during register: ${error.message}`);
        }
    }

    // POST TO LOGIN
    const loginFetch = async (email, password) => {
        try {
            const data = {
                identifier: email,
                password: password
            };

            const response = await fetch('http://localhost:1337/api/auth/local', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials and try again.');
            }

            const userData = await response.json();
            setResponse(userData)
        } catch (error) {
            setError(`Error during login: ${error.message}`);
        }
    }



    return { response, error, registerFetch, loginFetch }
};

export default authApi