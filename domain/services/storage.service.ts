export interface IStorageService {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
}
