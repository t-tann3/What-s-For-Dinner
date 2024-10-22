import { useEffect, useState } from "react"
import '../App.css';
import { Link } from "react-router-dom";
import axios from 'axios';

const AllMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/meals')
        .then((response) => {
            console.log(response.data);
            setMeals(response.data);
        })
        .catch((error) => {
            console.error('Error fetching meals:', error);
        });
}, []);
  
  return(
    <>
    <div className="position-fixed " style={{ top: '50px', left: '200px', padding: '0' }}>
      <h1>Whats For Dinner?</h1>
    </div>
    <div className="position-fixed" style={{ top: '50px', right: '200px', padding: '0' }}>
            <Link to={`/meals/createMeal`}>
            <button className="btn btn-secondary">Make a Meal</button>
            </Link>
          </div>
    <div className="container-fluid">
      <div className="row">
        {meals.map((meal) => (
          <div className="col-md-6" key={meal._id}>
            <div className="card mb-3">
              <div className="card-body text-center">
                <h2 className="card-title color"><Link to={`/updateMeal/${meal._id}`}>{meal.meal_name}</Link></h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default AllMeals 