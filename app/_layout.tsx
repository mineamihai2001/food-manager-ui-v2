import { Stack } from "expo-router/stack";
import { GlobalStore } from "../infrastructure/store";
import { StorageService } from "../infrastructure/services/storage/storage.service";
import { Provider } from "mobx-react";
import { router, SplashScreen } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import { KitchensService } from "../infrastructure/services/kitchens";
import { Kitchen } from "../domain/models";
import { ErrorContext } from "../infrastructure/context";
import { ApiError, AppError } from "../infrastructure/error";

SplashScreen.preventAutoHideAsync();
const globalStore = new GlobalStore(new StorageService());

export default function Layout() {
    const kitchenService = new KitchensService();

    const [isAppReady, setIsAppReady] = useState<boolean>(false);
    const [error, setError] = useState<AppError>();

    useEffect(() => {
        async function prepare() {
            const kitchenFound = await globalStore.bootstrap();

            if (kitchenFound) {
                setIsAppReady(true);
                return;
            }

            try {
                const res: Kitchen[] = await kitchenService.getAll();
                setIsAppReady(true);
                await globalStore.setKitchen(res.at(0)!); // TODO: change
            } catch (err) {
                console.log("App is not ready ....", err);
                setError(new ApiError((err as Error).message));
            }
        }

        prepare();
    }, []);

    useEffect(() => {
        onLayoutRootView();
    }, [isAppReady]);

    useEffect(() => {
        if (typeof error === "undefined") return;

        setIsAppReady(true);
    }, [error]);

    const onLayoutRootView = useCallback(async () => {
        if (isAppReady) {
            await SplashScreen.hideAsync();
        }
        if (typeof error !== "undefined") {
            router.push({
                pathname: "/error",
                params: {
                    message: error.message,
                    description: error.description,
                    name: "ApiError",
                } satisfies AppError,
            });
            setError(undefined);
        }
    }, [isAppReady]);

    if (!isAppReady) {
        return null;
    }

    return (
        <Provider globalStore={globalStore}>
            <ErrorContext.Provider value={null}>
                <Stack>
                    <Stack.Screen
                        name="(screens)"
                        options={{
                            headerShown: false,
                            animation: "ios",
                        }}
                    />
                    <Stack.Screen
                        name="(tabs)"
                        options={{
                            headerShown: false,
                            animation: "ios",
                        }}
                    />
                </Stack>
            </ErrorContext.Provider>
        </Provider>
    );
}
