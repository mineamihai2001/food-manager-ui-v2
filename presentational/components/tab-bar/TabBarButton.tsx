import { View, Text, Pressable, PressableProps } from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Feather } from "@expo/vector-icons";

export const icons = {
    index: (props: { color: string }) => <Feather name="home" size={26} {...props} />,
    settings: (props: { color: string }) => <Feather name="settings" size={26} {...props} />,
    dishes: (props: { color: string }) => <FontAwesome6 name="bowl-food" size={26} {...props} />,
};

export type IProps = {
    isFocused: boolean;
    label: string;
    routeName: "index" | "settings" | "dishes" | string;
    color: string;
    showLabel?: boolean;
    tabBarIcon?: (props: { focused: boolean; color: string; size: number }) => React.ReactNode;
} & PressableProps;

export const TabBarButton = (props: IProps) => {
    const { isFocused, label, color, showLabel = false, tabBarIcon = () => <></> } = props;

    return (
        <Pressable {...props} className="flex-1 justify-center items-center gap-1">
            <View>{tabBarIcon({ color, focused: isFocused, size: 26 })}</View>
            {showLabel && (
                <Text
                    style={[
                        {
                            color,
                            fontSize: 11,
                        },
                    ]}
                >
                    {label}
                </Text>
            )}
        </Pressable>
    );
};
