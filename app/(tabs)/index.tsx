import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Button } from "../../presentational/components/button";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { KitchensService } from "../../infrastructure/services/kitchens";

export default function App() {
    const { colorScheme, toggleColorScheme } = useColorScheme();

    return (
        <View className="flex flex-1 justify-center items-center gap-10">
            <Text>Open ______ up App.tsx to start working on your app!</Text>
            <View
                className="flex flex-row"
                style={{
                    gap: 10,
                }}
            >
                <Button>Default</Button>
                <Button type="outlined" onPress={toggleColorScheme}>
                    Outlined
                </Button>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}
