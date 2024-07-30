import { Tabs } from "expo-router";
import { useColors } from "../../infrastructure/hooks";
import { TabBar } from "../../presentational/components/tab-bar";
import { FontAwesome, Fontisto, AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";

export default function TabLayout() {
    const colors = useColors();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
            }}
            tabBar={(props) => <TabBar {...props} />}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused, size }) => {
                        return <Feather name="home" size={26} color={color} />;
                    },
                }}
            />
            <Tabs.Screen
                name="dishes"
                options={{
                    title: "Dishes",
                    tabBarIcon: ({ color, focused, size }) => {
                        return <FontAwesome6 name="bowl-food" size={26} color={color} />;
                    },
                }}
            />
            <Tabs.Screen
                name="random"
                options={{
                    title: "Random",
                    tabBarIcon: ({ color, focused, size }) => {
                        return <FontAwesome name="random" size={26} color={color} />;
                    },
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color, focused, size }) => {
                        return <Feather name="settings" size={26} color={color} />;
                    },
                }}
            />
        </Tabs>
    );
}
