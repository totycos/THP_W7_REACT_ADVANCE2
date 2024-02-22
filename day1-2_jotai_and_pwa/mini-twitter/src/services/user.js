export const getUserMe = async (token) => {

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
    return userData

}