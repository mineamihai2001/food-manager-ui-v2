import { Ingredient } from "./ingredient.mode";

export interface Dish {
    id: string;
    kitchenId: string;
    name: string;
    duration: number;
    rating: number;
    images: string[];
    steps: string[];
    ingredients: Ingredient[];
}
