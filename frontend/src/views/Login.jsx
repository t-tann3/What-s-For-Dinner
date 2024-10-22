import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateField = (name, value) => {
        const newErrors = { ...errors };

        // Username validation
        if (name === 'username') {
            if (value.length < 2) {
                newErrors.username = "Username must be more than 2 characters";
            } else {
                delete newErrors.username;
            }
        }

        // Password validation
        if (name === 'password') {
            if (value.length < 8) {
                newErrors.password = "Password must be at least 8 characters long";
            } else {
                delete newErrors.password;
            }
        }

        setErrors(newErrors);
    };

    const validateForm = () => {
        const newErrors = {};

        if (username.length < 2) {
            newErrors.username = "Username must be more than 2 characters";
        }
        if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        }

        return newErrors;
    };

    const loginUser = () => {
        const loginInfo = {
            username,
            password
        };

        axios.post('http://localhost:8000/api/users/login', loginInfo)
            .then((response) => {
                console.log('User logged in successfully', response);
                setUsername('');
                setPassword('');
                navigate('/allmeals');
            })
            .catch((error) => {
                console.log('Error logging in:', error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        loginUser();
    };

    return (
        <>
            <h1>Whats For Dinner</h1>
            <div className="container mt-5">
                <h2 className="mb-4">Login</h2>
                <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm">
                    <div className="form-group mb-3">
                        <label htmlFor="username">Enter Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            onChange={(e) => {
                                setUsername(e.target.value);
                                validateField('username', e.target.value);
                            }}
                            value={username}
                            required
                        />
                        {errors.username && <p style={{ color: 'white' }}>{errors.username}</p>}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="password">Enter Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                validateField('password', e.target.value);
                            }}
                            value={password}
                            required
                        />
                        {errors.password && <p style={{ color: 'white' }}>{errors.password}</p>}
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
            </div>
        </>
    );
};

export default Login;
