import { Router } from "express";
import { createMeal, getAllMeals, deleteMealById, getMealById, updateMealById } from "../controllers/meal.controller.js";

const MealRouter = Router();

MealRouter.post('/meals/createMeal', createMeal);

MealRouter.get('/meals/updateMeal/:id', getMealById);

MealRouter.get('/meals', getAllMeals);

MealRouter.put('/meals/:id', updateMealById);

MealRouter.delete('/meals/:id', deleteMealById); 

export default MealRouter;