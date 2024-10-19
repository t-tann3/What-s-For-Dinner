import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';



const CreateMeal = () => {
    const [name, setName] = useState('');
    const [timeToMake, setTimeToMake] = useState('');
    const [category, setCategory] = useState('');
    const [protein, setProtein] = useState('');
    const [vegetable, setVegetable] = useState('');
    const [starch, setStarch] = useState('');
    const [calories, setCalories] = useState('');
    const navigate = useNavigate();

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

        axios.post('http://localhost:8000/api/meals/make', newMeal)
            .then((response) => {
                if(response.status === 200){
                    console.log('Meal added successfully')
                    setName('');
                    setTimeToMake('');
                    setCategory('');
                    setProtein('');
                    setVegetable('');
                    setStarch('');
                    setCalories('');
                    navigate('/displayUserMeals')
                }else {
                    console.error('Error adding meal')
                }
            })
            .catch((error) => {
                console.error('Error adding meal:', error);
            })
        };

        const handleSubmit = (e) => {
            e.preventDefault();

            postNewMeal();
        };



    return(
        <>
        <div className="position-fixed" style={{ top: '50px', left: '200px', padding: '0' }}>
        <Link to={`/allmeals`}> 
          <h1>Whats For Dinner?</h1>
          </Link>
        </div>
        <div className="position-fixed" style={{ top: '50px', right: '200px', padding: '0' }}>
                <Link to={`/updateMeal/:id`}>
                <button className="btn btn-secondary">Update Meal</button>
                </Link>
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
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value)
                    }}
                    required
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
            <button type="submit">Add Meal</button>
        </form>
        </>
    )
}

export default CreateMeal