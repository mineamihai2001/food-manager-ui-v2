import { Dispatch, FC, SetStateAction, useEffect } from "react";
import React, { useState } from "react";
import { View, Pressable, ScrollView, Text } from "react-native";
import { Button, IconButton, Input } from "../../../../components";
import { useColors } from "../../../../../infrastructure/hooks";
import { inject, observer } from "mobx-react";
import { GlobalStore } from "../../../../../infrastructure/store";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import { IngredientDetails, Unit } from "../../../../../domain/models";

interface IProps {
    globalStore?: GlobalStore;
    ingredient: IngredientDetails;
    updateIngredient: (ingredient: IngredientDetails) => void;
    removeIngredient: () => void;
    disableScroll: () => void;
    enableScroll: () => void;
    blur: boolean;
    setBlur: Dispatch<SetStateAction<boolean>>;
}

export const IngredientInput: FC<IProps> = inject("globalStore")(
    observer(
        ({
            ingredient,
            disableScroll,
            enableScroll,
            blur,
            setBlur,
            updateIngredient,
            removeIngredient,
        }) => {
            const colors = useColors();

            const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

            useEffect(() => {
                if (!isMenuOpen) return;
                if (blur) {
                    enableScroll();
                    setIsMenuOpen(false);
                }
            }, [blur]);

            return (
                <View
                    className="w-full flex flex-row justify-center items-center"
                    style={{
                        gap: 8,
                    }}
                >
                    <View className="flex-1">
                        <Input value={ingredient.name} disabled className="" />
                    </View>
                    <View className="">
                        <Input
                            placeholder="Size"
                            keyboardType="numeric"
                            value={ingredient.size.toString()}
                            onChangeText={(e) => {
                                updateIngredient({ ...ingredient, size: Number(e) });
                            }}
                            className=""
                        />
                    </View>
                    <Pressable
                        className="w-1/5 h-full border rounded-md py-1 relative
                    flex flex-row justify-center items-center"
                        style={{
                            gap: 4,
                        }}
                        onPress={() => {
                            disableScroll();
                            setBlur((_) => false);
                            setIsMenuOpen((_) => true);
                        }}
                    >
                        <View>
                            <Text className="text-xs">Unit</Text>
                            <Text className="text-lg font-semibold">
                                {ingredient.unit ?? Unit.Pieces}
                            </Text>
                        </View>
                        <View>
                            <FontAwesome name="caret-down" color={colors.neutral[10]} size={16} />
                        </View>
                        {isMenuOpen && (
                            <ScrollView className="absolute bg-neutral-0 py-2 h-28 w-20 shadow-md shadow-neutral-10 z-1000">
                                {Object.values(Unit).map((unit, j) => {
                                    return (
                                        <View key={`dish-ingredient-unit-${j}`}>
                                            <Pressable
                                                className="px-4 py-2"
                                                onPress={() => {
                                                    enableScroll();
                                                    setIsMenuOpen((_) => false);
                                                    updateIngredient({
                                                        ...ingredient,
                                                        unit: unit,
                                                    });
                                                }}
                                            >
                                                <Text>{unit}</Text>
                                            </Pressable>
                                            <Divider />
                                        </View>
                                    );
                                })}
                            </ScrollView>
                        )}
                    </Pressable>
                    <Pressable onPress={removeIngredient}>
                        <Feather name="x" color={colors.neutral[10]} size={24} />
                    </Pressable>
                </View>
            );
        }
    )
);
