import { View, Text, TouchableOpacity, StyleSheet, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import { TabBarButton } from "./TabBarButton";
import { useColors } from "../../../infrastructure/hooks";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export const TabBar = (props: BottomTabBarProps) => {
    const { state, descriptors, navigation } = props;

    const [show, setShow] = useState<boolean>(true);
    const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

    const colors = useColors();

    const activeTabColor = colors.neutral[10];
    const inactiveTabColor = colors.neutral[4];

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        setShow(!keyboardVisible);
    }, [keyboardVisible]);

    return (
        show && (
            <View
                className="absolute bottom-[20]
                        flex-row justify-between items-center
                        bg-neutral-0 mx-[20] py-[10] rounded-[25px] shadow shadow-neutral-10"
                style={{
                    borderCurve: "continuous",
                    shadowOffset: { width: 0, height: 10 },
                    shadowRadius: 10,
                    shadowOpacity: 0.1,
                    // gap: 20,
                }}
            >
                {state.routes.map((route, index: number) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                            ? options.title
                            : route.name;

                    if (["_sitemap", "+not-found"].includes(route.name)) return null;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: "tabLongPress",
                            target: route.key,
                        });
                    };

                    return (
                        <TabBarButton
                            key={route.name}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            isFocused={isFocused}
                            routeName={route.name}
                            color={isFocused ? activeTabColor : inactiveTabColor}
                            label={label as string}
                            showLabel={false}
                            tabBarIcon={options.tabBarIcon}
                        />
                    );
                })}
            </View>
        )
    );
};
