import { Unit } from "./unit.enum";

export interface IngredientDetails {
    id: string;
    name: string;
    unit: Unit | null;
    size: number;
}
