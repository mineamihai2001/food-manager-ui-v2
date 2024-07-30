import { makeObservable, observable } from "mobx";
import { IStorageService } from "../../domain/services";
import { Kitchen } from "../../domain/models";

export class GlobalStore {
    public kitchen: Kitchen;

    public constructor(private readonly storageService: IStorageService) {
        this.kitchen = {
            id: "",
            name: "",
        };
        makeObservable(this, {
            kitchen: observable,
        });
    }

    public async bootstrap(): Promise<boolean> {
        const exists = await this.storageService.getItem("kitchen");

        if (!exists) {
            return false;
        }

        this.setKitchen(JSON.parse(exists));
        return true;
    }

    public async setKitchen(kitchenId: Kitchen): Promise<void> {
        this.kitchen = kitchenId;

        await this.storageService.setItem("kitchenId", JSON.stringify(kitchenId));
    }
}
