import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, SetPassword] = useState('')
    const navigate = useNavigate();

    const loginUser = () => {
        const loginInfo = {
            username,
            password
        };

        axios.post('http://localhost:8000/api/users/login', loginInfo)
            .then((response) => {
                console.log(response)
                    console.log('User logged in successfully')
                    setUsername('')
                    SetPassword('')
                    navigate('/allmeals')
                
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        loginUser();
    }
    return(
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
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="password">Enter Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        onChange={(e) => SetPassword(e.target.value)}
                        value={password}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Login
                </button>
            </form>
        </div>
        </>
    );
};


export default Login