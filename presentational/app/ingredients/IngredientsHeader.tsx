import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Pressable, ScrollView, View, Text, Keyboard, RefreshControl } from "react-native";
import { inject, observer } from "mobx-react";
import React from "react";
import { Divider, FAB, IconButton, Modal, Portal, Snackbar } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { useColors } from "../../../infrastructure/hooks";
import { IngredientsService } from "../../../infrastructure/services/ingredients";
import { GlobalStore } from "../../../infrastructure/store";
import { Ingredient } from "../../../domain/models/ingredient.model";
import { Search } from "../../components";

interface IProps {
    globalStore?: GlobalStore;
    selected: string[];
    ingredientsService: IngredientsService;
    refreshing: boolean;
    setRefreshing: Dispatch<SetStateAction<boolean>>;
    setFound: Dispatch<SetStateAction<boolean>>;
    setIngredients: Dispatch<SetStateAction<Ingredient[]>>;
    setMessage: Dispatch<SetStateAction<string | null>>;
}

export const IngredientsHeader: FC<IProps> = inject("globalStore")(
    observer(
        ({
            globalStore,
            selected,
            ingredientsService,
            refreshing,
            setRefreshing,
            setIngredients,
            setFound,
            setMessage,
        }) => {
            const colors = useColors();

            const [editMode, setEditMode] = useState<boolean>(false);
            const [searchFocused, setSearchFocused] = useState<boolean>(false);
            const [searchValue, setSearchValue] = useState<string>("");

            const handleSearch = async () => {
                if (!searchValue) {
                    return;
                }

                setRefreshing(true);

                const ingredients = await ingredientsService
                    .search(globalStore?.kitchen.id!, searchValue.toLowerCase())
                    .catch((err) => {
                        return [];
                    });

                setFound((_) => ingredients.length > 0);
                setIngredients((_) => ingredients);
                setRefreshing((_) => false);
            };

            const handleDeleteSelected = async () => {
                if (!selected.length) return;

                const result = await ingredientsService.deleteMany(
                    globalStore?.kitchen.id!,
                    selected
                );

                setMessage(result ? "Ingredients deleted" : "Error deleting ingredients");
                handleSearch();
            };

            useEffect(() => {
                if (!selected.length && editMode) {
                    // all deselected
                    setEditMode(false);
                } else if (selected.length) {
                    setEditMode(true);
                }
            }, [selected]);

            useEffect(() => {
                if (!refreshing) return;
                handleSearch();
            }, [refreshing]);

            return (
                <View className="w-full">
                    {editMode ? (
                        <View className="bg-neutral-0 pt-10 pb- flex flex-row justify-start items-center pr-2">
                            <IconButton
                                icon={() => (
                                    <Feather
                                        name="arrow-left"
                                        size={28}
                                        color={colors.neutral[10]}
                                    />
                                )}
                                onPress={() => setEditMode(false)}
                            />
                            <IconButton
                                className="ml-auto"
                                icon={() => (
                                    <Feather name="trash-2" size={20} color={colors.neutral[10]} />
                                )}
                                onPress={handleDeleteSelected}
                            />
                            <IconButton
                                icon={() => (
                                    <Feather name="edit-3" size={20} color={colors.neutral[10]} />
                                )}
                                onPress={() => {}}
                            />
                        </View>
                    ) : (
                        <Search
                            value={searchValue}
                            onChangeText={setSearchValue}
                            placeholder={`Search by name`}
                            returnKeyType="search"
                            onSubmitEditing={handleSearch}
                            focused={searchFocused}
                            onFocus={(e) => setSearchFocused(true)}
                            className={`rounded-full`}
                            containerClassName="mt-8 px-4"
                            background={colors.neutral[0]}
                        />
                    )}
                </View>
            );
        }
    )
);
