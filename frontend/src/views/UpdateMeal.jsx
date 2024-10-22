import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UpdateMeal = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [timeToMake, setTimeToMake] = useState('');
    const [category, setCategory] = useState('');
    const [protein, setProtein] = useState('');
    const [vegetable, setVegetable] = useState('');
    const [starch, setStarch] = useState('');
    const [extra, setExtra] = useState('');
    const [calories, setCalories] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const getMeal = () => {
            axios.get(`http://localhost:8000/api/updateMeal/${id}`)
                .then((response) => {
                    console.log('Meal details fetched:', response.data);
                    setName(response.data.meal_name);
                    setTimeToMake(response.data.timeToMake);
                    setCategory(response.data.category);
                    setProtein(response.data.protein);
                    setVegetable(response.data.vegetable);
                    setStarch(response.data.starch);
                    setExtra(response.data.extra);
                    setCalories(response.data.calories);
                })
            .catch((error) => {
                console.error('Error fetching meal details:', error);
            });
        };
        getMeal();
    }, [id]);

    const validateField = (name, value) => {
        const newErrors = { ...errors };

        if (name === 'name') {
            if (value.length < 2) {
                newErrors.name = "Meal Name must be more than 2 characters";
            } else {
                delete newErrors.name;
            }
        }

        if (name === 'timeToMake') {
            if (!value || value < 1) {
                newErrors.timeToMake = "Time to make must be a positive number";
            } else {
                delete newErrors.timeToMake;
            }
        }

        if (name === 'category') {
            if (value.length < 2) {
                newErrors.category = "Category must be more than 2 characters";
            } else {
                delete newErrors.category;
            }
        }

        if (name === 'protein') {
            if (value.length < 2) {
                newErrors.protein = "Protein must be more than 2 characters";
            } else {
                delete newErrors.protein;
            }
        }

        if (name === 'vegetable') {
            if (value.length < 2) {
                newErrors.vegetable = "Vegetable must be more than 2 characters";
            } else {
                delete newErrors.vegetable;
            }
        }

        if (name === 'starch') {
            if (value.length < 2) {
                newErrors.starch = "Starch must be more than 2 characters";
            } else {
                delete newErrors.starch;
            }
        }

        if (!calories || calories < 1) {
            newErrors.calories = "Calories must be a positive number";
        } else {
            delete newErrors.calories;
        }

        setErrors(newErrors);
    };

    const validateForm = () => {
        const newErrors = {};

        if (name.length < 2) {
            newErrors.name = "Meal Name must be more than 2 characters";
        }
        if (!timeToMake || timeToMake < 1) {
            newErrors.timeToMake = "Time to make must be a positive number";
        }
        if (category.length < 2) {
            newErrors.category = "Category must be more than 2 characters";
        }
        if (protein.length < 2) {
            newErrors.protein = "Protein must be more than 2 characters";
        }
        if (vegetable.length < 2) {
            newErrors.vegetable = "Vegetable must be more than 2 characters";
        }
        if (starch.length < 2) {
            newErrors.starch = "Starch must be more than 2 characters";
        }
        if (!calories || calories < 1) {
            newErrors.calories = "Calories must be a positive number";
        }

        return newErrors;
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/meals/${id}`)
            .then(() => {
                navigate('/allmeals');
            })
            .catch((error) => {
                console.error('Error deleting meal:', error.response ? error.response.data : error.message);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const updatedMeal = {
            name,
            timeToMake,
            category,
            protein,
            vegetable,
            starch,
            extra,
            calories,
        };

        axios.put(`http://localhost:8000/api/meals/${id}`, updatedMeal)
            .then(() => {
                console.log('Meal updated successfully');
                navigate('/allmeals');
            })
            .catch((error) => {
                console.error('Error updating meal details:', error.response ? error.response.data : error.message);
            });
    };

    return(
        <>
        <div className="position-fixed" style={{ top: '50px', left: '200px', padding: '0' }}>
        <Link to={`/allmeals`}>
            <h1>Whats For Dinner?</h1>
        </Link>
        </div>
        <div className="position-fixed" style={{ top: '50px', right: '200px', padding: '0' }}>
            <button onClick={handleDelete}>Delete Meal</button>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name">Meal Name </label>
            <input 
                type="text" 
                id="meal_name"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    validateField('name', e.target.value);
                }}
                required
                className="form-control bg-light"
            />
            {errors.name && <p style={{ color: 'white' }}>{errors.name}</p>}
        </div>
        <div className="row">
            <div className="col-md-6">
                <div className="mb-3">
                    <label htmlFor="time"> Time to Make </label>
                    <input 
                        type="number" 
                        id="timeToMake"
                        value={timeToMake}
                        onChange={(e) => {
                            setTimeToMake(e.target.value);
                            validateField('timeToMake', e.target.value);
                        }}
                        required
                        className="form-control bg-light"
                    />
                    {errors.timeToMake && <p style={{ color: 'white' }}>{errors.timeToMake}</p>}
                </div>
            
                <div className="mb-3">
                    <label htmlFor="category"> Category </label>
                    <input 
                        type="text" 
                        id="category"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            validateField('category', e.target.value);
                        }}
                        className="form-control bg-light"
                    />
                    {errors.category && <p style={{ color: 'white' }}>{errors.category}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="calories"> Calories </label>
                    <input 
                        type="number" 
                        id="calories"
                        value={calories}
                        onChange={(e) => {
                            setCalories(e.target.value);
                            validateField('calories', e.target.value);
                        }}
                        required
                        className="form-control bg-light"
                    />
                    {errors.calories && <p style={{ color: 'white' }}>{errors.calories}</p>}
                </div>
            </div>    
            <div className="col-md-6">    
                <div className="mb-3">
                    <label htmlFor="protein"> Protein </label>
                    <input 
                        type="text" 
                        id="protein"
                        value={protein}
                        onChange={(e) => {
                            setProtein(e.target.value);
                            validateField('protein', e.target.value);
                        }}
                        required
                        className="form-control bg-light"
                    />
                    {errors.protein && <p style={{ color: 'white' }}>{errors.protein}</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="vegetable"> Vegetable </label>
                    <input 
                        type="text" 
                        id="vegetable"
                        value={vegetable}
                        onChange={(e) => {
                            setVegetable(e.target.value);
                            validateField('vegetable', e.target.value);
                        }}
                        required
                        className="form-control bg-light"
                    />
                    {errors.vegetable && <p style={{ color: 'white' }}>{errors.vegetable}</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="starch"> Starch </label>
                    <input 
                        type="text" 
                        id="starch"
                        value={starch}
                        onChange={(e) => {
                            setStarch(e.target.value);
                            validateField('starch', e.target.value);
                        }}
                        required
                        className="form-control bg-light"
                    />
                    {errors.starch && <p style={{ color: 'white' }}>{errors.starch}</p>}
                </div>
            </div>
        </div>
        <button type="submit" className="btn btn-primary">Update Meal</button>
        </form>
        </>
    );
};

export default UpdateMeal;
