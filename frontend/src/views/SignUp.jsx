import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, SetPassword] = useState('');
    const navigate = useNavigate();


    const postNewUser = () => {
        const newUser = {
        username,
        email,
        password 
    };

    axios.post('http://localhost:8000/api/users/register', newUser)
        .then((response) => {
            if(response === 200){
                console.log('User Added successfully')
                setUsername('')
                setEmail('')
                SetPassword('')
                navigate('/allmeals')
            }
        })
        .catch((error) => {
            console.error('Error adding user:', error)
        });
   }

   const handleSubmit = (e) => {
    e.preventDefault();

    postNewUser();
}

    return(
        <>
        <h1>Whats For Dinner?</h1>
         <div className="container mt-5">
            <h2 className="mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm">
                <div className="form-group mb-3">
                    <label htmlFor="username">User Name</label>
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
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
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
                    Sign Up
                </button>
            </form>
        </div>
        <div className=".text-dark">
            <p className=".text-dark"><Link to={'/login'}>Already Have an Account? Login Here </Link></p>
        </div>
        </>
    )
}


export default SignUp 