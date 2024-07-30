import { IStorageService } from "../../../domain/services";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageService implements IStorageService {
    public constructor() {}

    public async getItem(key: string): Promise<string | null> {
        return AsyncStorage.getItem(key);
    }
    public async setItem(key: string, value: string): Promise<void> {
        return AsyncStorage.setItem(key, value);
    }
}
