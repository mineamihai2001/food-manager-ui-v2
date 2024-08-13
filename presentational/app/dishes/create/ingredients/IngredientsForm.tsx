import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import { View, Pressable, ScrollView, Text } from "react-native";
import { Ingredient } from "../../../../../domain/models/ingredient.model";
import { useColors } from "../../../../../infrastructure/hooks";
import { IngredientsService } from "../../../../../infrastructure/services/ingredients";
import { inject, observer } from "mobx-react";
import { GlobalStore } from "../../../../../infrastructure/store";
import { Divider, HelperText } from "react-native-paper";
import { Search } from "../../../../components/input/Search";
import { IngredientDetails } from "../../../../../domain/models";
import { IngredientInput } from "./IngredientInput";

interface IProps {
    globalStore?: GlobalStore;
    addIngredient: (ingredient: IngredientDetails) => void;
    removeIngredient: (index: number) => void;
    updateIngredient: (index: number, ingredient: IngredientDetails) => void;
    ingredients: IngredientDetails[];
    blur: boolean;
    setBlur: Dispatch<SetStateAction<boolean>>;
    error: boolean;
    enableScroll: () => void;
    disableScroll: () => void;
}

export const IngredientsForm: FC<IProps> = inject("globalStore")(
    observer(
        ({
            globalStore,
            addIngredient,
            removeIngredient,
            updateIngredient,
            ingredients,
            blur,
            setBlur,
            error,
            enableScroll,
            disableScroll,
        }) => {
            const colors = useColors();
            const ingredientsService = new IngredientsService();

            const ref = useRef(null);

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

            useEffect(() => {
                if (blur) {
                    setSearchIngredientFocused(false);
                }
            }, [blur]);

            useEffect(() => {
                if (searchIngredientFocused) {
                    setBlur(false);
                } else {
                    setBlur(true);
                }
            }, [searchIngredientFocused]);

            return (
                <View className="flex justify-center gap-1">
                    <View className="flex" style={{}}>
                        <View className="flex relative" style={{}}>
                            <Search
                                value={searchIngredient}
                                onChangeText={setSearchIngredient}
                                required={true}
                                placeholder={`Search ingredient`}
                                label="Ingredients"
                                returnKeyType="search"
                                onSubmitEditing={handleSearch}
                                focused={searchIngredientFocused}
                                onFocus={(e) => setSearchIngredientFocused(true)}
                            />

                            {showIngredientList && (
                                <ScrollView
                                    ref={ref}
                                    className={`w-full max-h-40 absolute top-[100%] z-1000 shadow shadow-neutral-5
                                        bg-neutral-0 border border-neutral-3`}
                                >
                                    {ingredientList.map((ingredient, i) => {
                                        return (
                                            <React.Fragment key={`dish-ingredient-option-${i}`}>
                                                <Pressable
                                                    className="px-4 py-3"
                                                    onPress={() => {
                                                        addIngredient({
                                                            id: ingredient.id,
                                                            name: ingredient.name,
                                                            unit: null,
                                                            size: 0,
                                                        });
                                                        setSearchIngredient("");
                                                        setShowIngredientList(false);
                                                        setSearchIngredientFocused(false);
                                                    }}
                                                >
                                                    <Text>{ingredient.name}</Text>
                                                </Pressable>
                                                <Divider className="mx-2" />
                                            </React.Fragment>
                                        );
                                    })}
                                </ScrollView>
                            )}
                        </View>
                        {error && (
                            <HelperText type="error" visible={error} className="z-[-3]">
                                At least 1 ingredient is required
                            </HelperText>
                        )}
                        <View
                            className="flex  pt-4 pb-4 z-[-2]"
                            style={{
                                gap: 10,
                            }}
                        >
                            {ingredients.map((ingredient, i) => {
                                return (
                                    <IngredientInput
                                        key={`dish-ingredient-${i}`}
                                        ingredient={ingredient}
                                        disableScroll={disableScroll}
                                        enableScroll={enableScroll}
                                        blur={blur}
                                        setBlur={setBlur}
                                        updateIngredient={(updated) => updateIngredient(i, updated)}
                                        removeIngredient={() => removeIngredient(i)}
                                    />
                                );
                            })}
                        </View>
                    </View>
                </View>
            );
        }
    )
);
