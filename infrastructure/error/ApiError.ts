import { AppError } from "./AppError";

export class ApiError extends AppError {
    public constructor(
        public readonly message: string,
        public readonly description: string = "Api Error",
        public readonly data: Record<any, any> = {}
    ) {
        super(message, description, data);
    }
}
