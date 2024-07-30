import { Kitchen } from "../../../domain/models";

export class KitchensService {
    private readonly url: string;

    public constructor() {
        this.url = process.env.EXPO_PUBLIC_API_URL! + "/kitchens";
    }

    public async getAll(): Promise<Kitchen[]> {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 2000);

        return fetch(this.url, {
            method: "GET",
            signal: controller.signal,
        })
            .then((res) => res.json())
            .then((res: Kitchen[]) => res)
            .finally(() => clearTimeout(timeout));
    }
}
