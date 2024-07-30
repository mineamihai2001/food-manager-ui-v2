import React, { FC, useEffect, useState } from "react";
import { View, Pressable, ScrollView, Text, Keyboard } from "react-native";
import { Input, Chip } from "../../../components";
import { Ingredient } from "../../../../domain/models/ingredient.mode";
import { useColors } from "../../../../infrastructure/hooks";
import { IngredientsService } from "../../../../infrastructure/services/ingredients";
import { inject, observer } from "mobx-react";
import { GlobalStore } from "../../../../infrastructure/store";
import { Feather } from "@expo/vector-icons";

interface IProps {
    globalStore?: GlobalStore;
    addIngredient: (ingredient: Ingredient) => void;
    removeIngredient: (index: number) => void;
    ingredients: Ingredient[];
}

export const IngredientsForm: FC<IProps> = inject("globalStore")(
    observer(({ globalStore, addIngredient, removeIngredient, ingredients }) => {
        const colors = useColors();
        const ingredientsService = new IngredientsService();

        const [showIngredientList, setShowIngredientList] = useState<boolean>(false);
        const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
        const [searchIngredientFocused, setSearchIngredientFocused] = useState<boolean>(false);
        const [searchIngredient, setSearchIngredient] = useState<string>("");

        const handleSearch = async () => {
            if (!searchIngredient) {
                return;
            }

            const ingredients = await ingredientsService
                .search(globalStore?.kitchen.id!, searchIngredient.toLowerCase())
                .catch((err) => {
                    return [];
                });

            setIngredientList(ingredients);
        };

        useEffect(() => {
            if (searchIngredientFocused && ingredientList.length) {
                setShowIngredientList(true);
            } else {
                setShowIngredientList(false);
            }
        }, [searchIngredientFocused, ingredientList]);

        return (
            <View className="flex justify-center gap-1">
                <View className="flex" style={{}}>
                    <View className="flex relative" style={{}}>
                        <Input
                            value={searchIngredient}
                            onChangeText={setSearchIngredient}
                            placeholder={`Search`}
                            label="Ingredients"
                            returnKeyType="search"
                            onSubmitEditing={handleSearch}
                            rightIcon={
                                <Pressable className="mt-6" onPress={handleSearch}>
                                    <Feather name="search" size={20} color={colors.neutral[6]} />
                                </Pressable>
                            }
                            focused={searchIngredientFocused}
                            onFocus={(e) => setSearchIngredientFocused(true)}
                            onBlur={() => {
                                if (Keyboard.isVisible()) {
                                    Keyboard.dismiss();
                                } else {
                                    setSearchIngredientFocused(false);
                                }
                            }}
                        />
                        {showIngredientList && (
                            <ScrollView
                                className={`w-full max-h-40 absolute top-[100%] z-1000 shadow shadow-neutral-5
                                        bg-neutral-0 border border-neutral-4 border-t-0 rounded-lg rounded-t-none
                                            `}
                            >
                                {ingredientList.map((ingredient, i) => {
                                    return (
                                        <Pressable
                                            key={`dish-ingredient-option-${i}`}
                                            className="border-t border-t-neutral-4 px-4 py-3"
                                            onPress={() => {
                                                addIngredient(ingredient);
                                                setSearchIngredient("");
                                                setShowIngredientList(false);
                                                setSearchIngredientFocused(false);
                                            }}
                                        >
                                            <Text>{ingredient.name}</Text>
                                        </Pressable>
                                    );
                                })}
                            </ScrollView>
                        )}
                    </View>
                    <View
                        className="flex flex-row pt-4 z-[-2]"
                        style={{
                            gap: 10,
                        }}
                    >
                        {ingredients.map((ingredient, i) => {
                            return (
                                <Chip key={`dish-ingredient-${i}`}>
                                    <Text>{ingredient.name}</Text>
                                </Chip>
                            );
                        })}
                    </View>
                </View>
            </View>
        );
    })
);
