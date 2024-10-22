import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const validateField = (name, value) => {
        const newErrors = { ...errors };

        if ( name === 'username') {
          if (value.length < 2) {
            newErrors.name = "Username must be more than 2 characters";
          } else {
            delete newErrors.name;
          }
        }

        if (name === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex pattern
            if (!value || !emailPattern.test(value)) {
                newErrors.email = "Please enter a valid email address";
            } else {
                delete newErrors.email;
            }
        }        

        if (name === 'password') {
            // Example criteria: Password must be at least 8 characters long
            if (!value || value.length < 8) {
                newErrors.password = "Password must be at least 8 characters long";
            } else {
                delete newErrors.password;
            }
        }
        
        if (name === 'confirmPassword') {
            // Check if confirm password matches the password
            if (value !== password) {
                newErrors.confirmPassword = "Passwords do not match";
            } else {
                delete newErrors.confirmPassword;
            }
        }
        setErrors(newErrors); 
    };

    const validateForm = () => {
        const newErrors = {};
    
        if (username.length < 2) {
          newErrors.username = "Username must be more than 2 characters";
        }
        if (!email || email.length < 1) {
            newErrors.email = "Email is required";
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                newErrors.email = "Please enter a valid email address";
            }
        }    
        if (!password || password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        }    
    
        return newErrors;
    };
    

    const postNewUser = () => {
        const newUser = {
        username,
        email,
        password,
        confirmPassword
    };
    axios.post('http://localhost:8000/api/users/register', newUser, {withCredentials: true})
        .then(() => {
            navigate('/allMeals')
        })
        .catch((error) => {
            console.error('Error adding user:', error)
        });
   }

   const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
        if(Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

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
                        placeholder="Enter Username"
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
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter Email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            validateField('email', e.target.value);
                        }}
                        value={email}
                        required
                    />
                    {errors.email && <p style={{ color: 'white' }}>{errors.email}</p>}
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validateField('password', e.target.value);
                        }}
                        value={password}
                        required
                    />
                    {errors.password && <p style={{ color: 'white' }}>{errors.password}</p>}
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="confirm password">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirm password"
                        placeholder="Confirm Password"
                        onChange={(e) => {setConfirmPassword(e.target.value);
                            validateField('confirm password', e.target.value);
                        }}
                        value={confirmPassword}
                        required
                    />
                    {errors.confirmPassword && <p style={{ color: 'white' }}>{errors.confirmPassword}</p>}
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Sign Up
                </button>
            </form>
        </div>
        <div className=".text-red">
            <p className=".text-dark"><Link to={'/login'}>Already Have an Account? Login Here </Link></p>
        </div>
        </>
    )
}


export default SignUp 