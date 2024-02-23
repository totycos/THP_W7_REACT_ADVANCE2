// REGISTER FETCH
export const registerFetch = async (username, email, password) => {
    try {
        const data = {
            username: username,
            email: email,
            password: password
        };
        const response = await fetch('http://localhost:1337/api/auth/local/register', { // SET APPROPRIATE URL
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Register failed. Please check your credentials and try again.');
        }
        return response
    } catch (error) {
        return error;
    }
}

// LOGIN FETCH 
export const loginFetch = async (email, password) => {
    try {
        const data = {
            identifier: email,
            password: password
        };

        const response = await fetch('http://localhost:1337/api/auth/local', { // SET APPROPRIATE URL
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Login failed. Please check your credentials and try again.');
        }

        return response
    } catch (error) {
        return error
    }
}
