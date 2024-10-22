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
            })
        }
        getMeal()
    }, [id]);

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

        const updatedMeal = {
            name: name,
            timeToMake: timeToMake,
            category: category,
            protein: protein,
            vegetable: vegetable,
            starch: starch,
            extra: extra,
            calories: calories,
        };


        axios.put(`http://localhost:8000/api/meals/${id}`, updatedMeal)
            .then(() => {
                console.log('Meal updated successfully');
                navigate('/allmeals');
            })
            .catch((error) => {
                console.error('Error fetching patient details:', error.response ? error.response.data : error.message);
            })
    }

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
                        <input type="text" 
                            id="meal_name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            required
                            className="form-control bg-light"
                        />
                    </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="time"> Time to Make </label>
                        <input type="number" 
                        id="timeToMake"
                        value={timeToMake}
                        onChange={(e) => {
                            setTimeToMake(e.target.value)
                        }}
                        required
                        className="form-control bg-light"
                        />
                    </div>
                
                
                    <div className="mb-3">
                        <label htmlFor="category"> Category </label>
                        <input type="text" 
                        id="category"
                        value={setCategory}
                        onChange={(e) => {
                            setCategory(e.target.value)
                        }}
                        className="form-control bg-light"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="calories"> Calories </label>
                        <input type="number" 
                        id="calories"
                        value={calories}
                        onChange={(e) => {
                            setCalories(e.target.value)
                        }}
                        required
                        className="form-control bg-light"
                        />
                    </div>
                </div>    
                <div className="col-md-6">    
                    <div className="mb-3">
                        <label htmlFor="protein"> Protein </label>
                        <input type="text" 
                        id="protein"
                        value={protein}
                        onChange={(e) => {
                            setProtein(e.target.value)
                        }}
                        required
                        className="form-control bg-light"
                        />
                    </div>
    
                    <div className="mb-3">
                        <label htmlFor="vegetable"> Vegetable </label>
                        <input type="text" 
                        id="vegetable"
                        value={vegetable}
                        onChange={(e) => {
                            setVegetable(e.target.value)
                        }}
                        required
                        className="form-control bg-light"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="starch"> Starch </label>
                        <input type="text" 
                        id="starch"
                        value={starch}
                        onChange={(e) => {
                            setStarch(e.target.value)
                        }}
                        required
                        className="form-control bg-light"
                        />
                    </div>
                </div>
            </div>
                <button type="submit" className="col-8 mt-4"><Link to={`/allmeals`}>Update Meal</Link></button>
            </form>
        </>
    )
};

export default UpdateMeal;