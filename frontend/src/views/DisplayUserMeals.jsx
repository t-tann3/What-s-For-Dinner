import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';

const DisplayUserMeals = () => {
    const { id } = useParams();
    const [userMeals, SetUserMeals] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:8000/api/meals`)
            .then((response) => {
                console.log(response.data);
                SetUserMeals(response.data);
            })
            .catch((error) => {
                console.error('Error fetching meals:', error);
            });
    }, [id]);



    return(
        <>
        <div className="position-fixed" style={{ top: '50px', left: '200px', padding: '0' }}>
          <h1>My Meals</h1>
        </div>
        <div className="position-fixed" style={{ top: '50px', right: '200px', padding: '0' }}>
                <Link to={`/make`}>
                <button className="btn btn-secondary">Make a Meal</button>
                </Link>
              </div>
        <div className="container my-5">
          <div className="row">
            {userMeals.map((meal) => (
              <div className="col-md-4" key={meal._id}>
                <div className="card">
                  <div className="card-body text-center">
                    <h2 className="card-title"><Link to={`/updateMeal/${meal._id}`}>{meal.meal_name}</Link></h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </>
      )
}

export default DisplayUserMeals;