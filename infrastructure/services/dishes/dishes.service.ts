import { HttpStatus } from "../../../domain/http-status.enum";
import { Dish } from "../../../domain/models";
import { Ingredient } from "../../../domain/models/ingredient.mode";

export class DishesService {
    private readonly dishesUrl: string;
    private readonly dishIngredientsUrl: string;
    private readonly ingredientsUrl: string;

    public constructor() {
        this.dishesUrl = process.env.EXPO_PUBLIC_API_URL! + "/dishes";
        this.dishIngredientsUrl = process.env.EXPO_PUBLIC_API_URL! + "/dishIngredient";
        this.ingredientsUrl = process.env.EXPO_PUBLIC_API_URL! + "/ingredients";
    }

    public async getAll(kitchenId: string): Promise<Dish[]> {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 2000);

        return fetch(`${this.dishesUrl}/${kitchenId}`, {
            method: "GET",
            signal: controller.signal,
        })
            .then((res) => res.json())
            .then((res: Dish[]) => res);
    }

    public async getPage(
        kitchenId: string,
        page: number,
        pageSize: number,
        sort: -1 | 0 | 1 = 0
    ): Promise<Dish[]> {
        return fetch(
            `${this.dishesUrl}/${kitchenId}/query/?page=${page}&pageSize=${pageSize}&sort=${sort}`,
            {
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((res: Dish[]) => res);
    }

    public async getRandom(kitchenId: string): Promise<Dish> {
        return fetch(`${this.dishesUrl}/${kitchenId}/random`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((res: Dish) => res);
    }

    public async getById(kitchenId: string, dishId: string): Promise<Dish> {
        return fetch(`${this.dishesUrl}/${kitchenId}/${dishId}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((res: Dish) => res);
    }

    public async delete(kitchenId: string, dishId: string): Promise<boolean> {
        return fetch(`${this.dishesUrl}/${kitchenId}/${dishId}`, {
            method: "DELETE",
        }).then((res) => res.status === HttpStatus.OK);
    }

    public async create(
        kitchenId: string,
        name: string,
        duration: number,
        images: string[],
        steps: string[],
        ingredients: Ingredient[]
    ): Promise<Dish> {
        return fetch(`${this.dishesUrl}/${kitchenId}`, {
            method: "POST",
            body: JSON.stringify({
                name,
                duration,
                images,
                rating: 0,
                steps,
                ingredientIds: ingredients.map((i) => i.id),
            }),
        })
            .then((res) => res.json())
            .then((res: Dish) => res);
    }
}
