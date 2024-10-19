import Meal from "../models/meal.model.js";

export async function createMeal(req, res) {
    try {
        const newMeal = await Meal.create(req.body);
        res.json(newMeal);
    }
    catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
};

export const getAllMeals = async (req, res) => {
    try {
        const meals = await Meal.find();
        res.status(200).json(meals);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getMealById = async (req, res) => {
    try {
        const MealDetails = req.params.id;
        const meal = await Meal.findById(MealDetails)

        return res.status(200).json(meal);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const updateMealById = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updatedMeal) {
            return res.status(404).json({message: 'Meal not found'});
        }
        res.status(200).json(updatedMeal);
    }catch (error) {
        res.status(500).json({ message: error.message});
    }
}

export const deleteMealById = async (req, res) => {
    try{
        const MealId = req.params.id;
        const deletedMeal = await Meal.findByIdAndDelete(MealId);

        if (!deletedMeal) {
            return res.status(404).json({ message: "Meal not found"});
        }

        res.status(200).json({ message: "Meal deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: error. message});
    }
};
