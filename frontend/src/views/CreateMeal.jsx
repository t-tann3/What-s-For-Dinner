import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const CreateMeal = () => {
    const [name, setName] = useState('');
    const [timeToMake, setTimeToMake] = useState('');
    const [category, setCategory] = useState('');
    const [protein, setProtein] = useState('');
    const [vegetable, setVegetable] = useState('');
    const [starch, setStarch] = useState('');
    const [calories, setCalories] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    // Function to validate individual fields
    const validateField = (fieldName, value) => {
        const newErrors = { ...errors };

        if (fieldName === 'name') {
            if (value.length < 2) {
                newErrors.name = 'Meal name must be at least 2 characters long';
            } else {
                delete newErrors.name;
            }
        }

        if (fieldName === 'timeToMake') {
            if (!value || Number(value) <= 0) {
                newErrors.timeToMake = 'Time to make must be a positive number';
            } else {
                delete newErrors.timeToMake;
            }
        }

        if (fieldName === 'category') {
            if (value.length < 2) {
                newErrors.category = 'Category must be at least 2 characters long';
            } else {
                delete newErrors.category;
            }
        }

        if (fieldName === 'protein') {
            if (value.length < 2) {
                newErrors.protein = 'Protein must be at least 2 characters long';
            } else {
                delete newErrors.protein;
            }
        }

        if (fieldName === 'vegetable') {
            if (value.length < 2) {
                newErrors.vegetable = 'Vegetable must be at least 2 characters long';
            } else {
                delete newErrors.vegetable;
            }
        }

        if (fieldName === 'starch') {
            if (value.length < 2) {
                newErrors.starch = 'Starch must be at least 2 characters long';
            } else {
                delete newErrors.starch;
            }
        }

        if (fieldName === 'calories') {
            if (!value || Number(value) <= 0) {
                newErrors.calories = 'Calories must be a positive number';
            } else {
                delete newErrors.calories;
            }
        }

        setErrors(newErrors);
    };

    // Function to validate the entire form
    const validateForm = () => {
        const newErrors = {};

        if (name.length < 2) {
            newErrors.name = 'Meal name must be at least 2 characters long';
        }

        if (!timeToMake || Number(timeToMake) <= 0) {
            newErrors.timeToMake = 'Time to make must be a positive number';
        }

        if (category.length < 2) {
            newErrors.category = 'Category must be at least 2 characters long';
        }

        if (protein.length < 2) {
            newErrors.protein = 'Protein must be at least 2 characters long';
        }

        if (vegetable.length < 2) {
            newErrors.vegetable = 'Vegetable must be at least 2 characters long';
        }

        if (starch.length < 2) {
            newErrors.starch = 'Starch must be at least 2 characters long';
        }

        if (!calories || Number(calories) <= 0) {
            newErrors.calories = 'Calories must be a positive number';
        }

        return newErrors;
    };

    const postNewMeal = () => {
        const newMeal = {
            meal_name: name,
            timeToMake: Number(timeToMake),
            category,
            protein,
            vegetable,
            starch,
            calories: Number(calories),
        };

        console.log("Meal data being sent:", newMeal);

        axios.post('http://localhost:8000/api/meals/createMeal', newMeal)
            .then(() => {
                console.log('Meal added successfully');
                // Clear form fields
                setName('');
                setTimeToMake('');
                setCategory('');
                setProtein('');
                setVegetable('');
                setStarch('');
                setCalories('');
                navigate('/allmeals');
            })
            .catch((error) => {
                console.error('Error adding meal:', error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        postNewMeal();
    };

    return (
        <>
            <div className="position-fixed" style={{ top: '50px', left: '200px', padding: '0' }}>
                <Link to="/allmeals">
                    <h1>Whats For Dinner?</h1>
                </Link>
            </div>
            <div className="position-fixed" style={{ top: '50px', right: '200px', padding: '0' }}>
                <Link to="/updateMeal/:id">
                    <button className="btn btn-secondary">Update Meal</button>
                </Link>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="meal_name">Meal Name</label>
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
                            <label htmlFor="timeToMake">Time to Make</label>
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
                            <label htmlFor="category">Category</label>
                            <input
                                type="text"
                                id="category"
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                    validateField('category', e.target.value);
                                }}
                                required
                                className="form-control bg-light"
                            />
                            {errors.category && <p style={{ color: 'white' }}>{errors.category}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="calories">Calories</label>
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
                            <label htmlFor="protein">Protein</label>
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
                            <label htmlFor="vegetable">Vegetable</label>
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
                            <label htmlFor="starch">Starch</label>
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
                <button type="submit" className="btn btn-primary">Add Meal</button>
            </form>
        </>
    );
};

export default CreateMeal;



