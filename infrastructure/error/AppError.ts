export abstract class AppError extends Error {
    public constructor(
        public readonly message: string,
        public readonly description: string,
        public readonly data?: Record<any, any>
    ) {
        super(message);
    }
}
