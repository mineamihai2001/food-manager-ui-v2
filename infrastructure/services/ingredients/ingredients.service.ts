import { Ingredient } from "../../../domain/models/ingredient.mode";

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
}
