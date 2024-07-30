import { Stack, Tabs } from "expo-router";

export default function ScreensLayout() {
    return (
        <Stack screenOptions={{ headerShown: false, animation: "slide_from_bottom" }}>
            <Stack.Screen
                name="error"
                options={{
                    // title: "",
                    headerTitleStyle: { fontSize: 18 },
                }}
            />
        </Stack>
    );
}
