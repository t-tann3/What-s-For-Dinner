import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignUp from './views/SignUp'
import AllMeals from './views/AllMeals'
import CreateMeal from './views/CreateMeal'
import UpdateMeal from './views/UpdateMeal'
import DisplayUserMeals from './views/DisplayUserMeals'
import Login from './views/Login'

function App() {
    

  return (
    <>
    

    <Routes>

      <Route path='/' element={<SignUp/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/allmeals' element={<AllMeals/>}/>
      <Route path='/meals/createMeal' element={<CreateMeal/>} />
      <Route path='/updateMeal/:id' element={<UpdateMeal/>} />
      <Route path='/displayUserMeals' element={<DisplayUserMeals/>}/>
    </Routes>


    </>
  )
}

export default App
