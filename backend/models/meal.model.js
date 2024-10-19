import {model, Schema} from 'mongoose';

const mealSchema = new Schema(
    {
        meal_name: {
            type: String,
            required: [true, "Name is required"],
            minlength: [2, "Name must be 2 characters long"],
        },

        timeToMake: {
            type: Number,
            required: [true, "Time to make is required"],
            minlength: [1, "Must be at least 1 hour"],

        },
        category: {
            type: String,
            required: [true, "A category is required"],
            minlength: [3, "Category must be 3 characters long"],
            
        },
        protein: {
            type: String,
            required: [true, "A protein is required"],
            minlength: [3, "Protein must be 3 characters long"],
        },
        vegetable: {
            type: String,
            required: [true, "A vegetable is required"],
            minlength: [3, "Vegetable must be 3 characters long"],
        },
        starch: {
            type: String,
            required: [true, "A starch is required"],
            minlength: [3, "Starch must be 3 characters long"],
        },
        calories: {
            type: Number,
            required: [true, "A calories is required"],
            minlength: [3, "Calories must be 3 characters long"],
        },
    },
    {timestamps: true}
);

const Meal = model("Meal", mealSchema)
export default Meal;