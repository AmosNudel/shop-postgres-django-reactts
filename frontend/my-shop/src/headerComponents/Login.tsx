import { useState } from 'react';
import axios from 'axios';

interface LoginProps {
    setIsLoggedIn: (status: boolean) => void; // Accept setIsLoggedIn to update login state
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [message, setmessage] = useState("Please log in or register");
    const SERVER = 'http://127.0.0.1:8000/';

    // Login function
    const login = () => {
        axios.post(SERVER + 'login/', { username, password })
            .then(res => {
                const { access } = res.data; // Destructure the access token
                localStorage.setItem('token', access); // Store token in localStorage
                localStorage.setItem('username', username); // Store username in localStorage
                setIsLoggedIn(true); // Update login state
            })
            .catch(error => {
                setmessage("An error occurred. Please try again later."); // Update the message in case of error
            });
    };

    // Register function
    const register = () => {
        axios.post(SERVER + 'register/', { username, password })
            .then(res => {
                const { access } = res.data; // Destructure the access token
                localStorage.setItem('token', access); // Store token in localStorage
                localStorage.setItem('username', username); // Store username in localStorage
                setIsLoggedIn(true); // Update login state
                setmessage("Registration successful!"); // Update message on success
            })
            .catch(error => {
                if (error.response && error.response.status === 500) {
                    setmessage("Username unavailable, please choose a different one."); // Set the message for username issue
                } else {
                    setmessage("An error occurred. Please try again later."); // Generic error message
                }
            });
    };

    return (
        <div className="container mt-5">
            <div className="card p-4">
                <h2 className="text-center mb-4">Login / Register</h2>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        className="form-control" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        className="form-control" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary" onClick={login}>Login</button>
                    <button className="btn btn-secondary" onClick={register}>Register</button>
                </div>
                {message && (
                    <div className="alert alert-info mt-3" role="alert">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
