import { Ingredient } from "../../../domain/models/ingredient.model";

export class IngredientsService {
    private readonly url: string;

    public constructor() {
        this.url = process.env.EXPO_PUBLIC_API_URL! + "/ingredients";
    }

    public async search(kitchenId: string, name: string): Promise<Ingredient[]> {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort, 2000);

        return fetch(`${this.url}/${kitchenId}/search?name=${name}`, {
            method: "GET",
            signal: controller.signal,
        })
            .then((res) => res.json())
            .then((res: Ingredient[]) => res)
            .finally(() => clearTimeout(timeout));
    }

    public async deleteMany(kitchenId: string, ids: string[]): Promise<boolean> {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort, 2000);

        return fetch(`${this.url}/${kitchenId}`, {
            method: "DELETE",
            signal: controller.signal,
            body: JSON.stringify({ ids }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => (res.status !== 200 ? null : res.json()))
            .then((res: Ingredient[]) => res !== null)
            .finally(() => clearTimeout(timeout));
    }

    public async create(kitchenId: string, name: string): Promise<Ingredient | null> {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort, 2000);

        return fetch(`${this.url}/${kitchenId}`, {
            method: "POST",
            signal: controller.signal,
            body: JSON.stringify({ name } satisfies Omit<Ingredient, "id">),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                return res.status !== 200 ? null : res.json();
            })
            .then((res: Ingredient) => res)
            .finally(() => clearTimeout(timeout));
    }
}
