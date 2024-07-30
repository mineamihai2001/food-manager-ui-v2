import { Stack, Tabs } from "expo-router";

export default function DishesLayout() {
    return (
        <Stack screenOptions={{ headerShown: false, animation: "ios" }}>
            <Stack.Screen name="index" />
            <Stack.Screen
                name="[id]"
                options={{
                    title: "",
                    headerTitleStyle: { fontSize: 18 },
                }}
            />
            <Stack.Screen
                name="create"
                options={{
                    title: "",
                    headerTitleStyle: { fontSize: 18 },
                }}
            />
        </Stack>
    );
}
