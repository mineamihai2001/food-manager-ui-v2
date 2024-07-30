import { router } from "expo-router";
import { Dispatch, useEffect, useState } from "react";
import { AppError } from "../../error";

export function useError(): [AppError | undefined, Dispatch<AppError | undefined>] {
    const [error, setError] = useState<AppError>();

    useEffect(() => {
        if (typeof error !== "undefined") {
            router.push({
                pathname: "/error",
                params: {
                    message: error.message,
                    description: error?.description,
                    name: "ApiError",
                } satisfies AppError,
            });
            setError(undefined);
        }
    }, [error]);

    return [error, setError];
}
