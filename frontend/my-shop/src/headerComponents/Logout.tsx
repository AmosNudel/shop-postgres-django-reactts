import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';  // Corrected import for named export

interface LogoutProps {
    setIsLoggedIn: (status: boolean) => void;
}

interface TokenPayload {
    username: string;  // Adjust according to your token structure
}

const Logout: React.FC<LogoutProps> = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // Decode the token to get the username
                const decoded: TokenPayload = jwtDecode(token);  // Corrected usage
                setUsername(decoded.username);  // Store the username
            } catch (error) {
                console.error('Failed to decode token:', error);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');  // Clear the token
        setIsLoggedIn(false);  // Update login state
    };

    return (
        <div className="container mt-5">
            <div className="card p-4">
                <h2 className="text-center mb-4">Welcome</h2>
                <div className="d-flex justify-content-between">
                    <h3>{username && <span>Welcome, {username}!</span>}</h3>
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Logout;
