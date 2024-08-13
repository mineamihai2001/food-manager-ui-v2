import { IngredientDetails } from "./ingredient-details.model";
import { Ingredient } from "./ingredient.model";

export interface Dish {
    id: string;
    kitchenId: string;
    name: string;
    duration: number;
    rating: number;
    images: string[];
    steps: string[];
    ingredients: IngredientDetails[];
}
