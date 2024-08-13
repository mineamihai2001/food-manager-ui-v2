import { HttpStatus } from "../../../domain/http-status.enum";
import { Dish, Page, Sort, Unit } from "../../../domain/models";

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
        sort: Sort = Sort.DESCENDING // latest first
    ): Promise<Page<Dish>> {
        return fetch(
            `${this.dishesUrl}/${kitchenId}/query/?page=${page}&pageSize=${pageSize}&sort=${sort}`,
            {
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((res: Page<Dish>) => res);
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

    public async deleteMany(kitchenId: string, ids: string[]): Promise<boolean> {
        const promises = ids.map((id) => this.delete(kitchenId, id));

        const result = await Promise.all(promises);

        const err = result.find((i) => i === false);

        return typeof err !== "undefined" || err === false ? false : true;
    }

    public async create(
        kitchenId: string,
        name: string,
        duration: number,
        images: string[],
        steps: string[],
        ingredients: {
            id: string;
            unit: Unit;
            size: number;
        }[]
    ): Promise<Dish | null> {
        return fetch(`${this.dishesUrl}/${kitchenId}`, {
            method: "POST",
            body: JSON.stringify({
                name,
                duration,
                images,
                rating: 0,
                steps,
                ingredients,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                return res.status !== 200 ? null : res.json();
            })
            .then((res: Dish) => res);
    }
}
