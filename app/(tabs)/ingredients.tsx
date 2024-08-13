import { FC, useEffect, useState } from "react";
import { Pressable, ScrollView, View, Text, Keyboard, RefreshControl } from "react-native";
import { Ingredient } from "../../domain/models/ingredient.model";
import { Search } from "../../presentational/components/input/Search";
import { useColors, useKeyboard } from "../../infrastructure/hooks";
import { IngredientsService } from "../../infrastructure/services/ingredients";
import { inject, observer } from "mobx-react";
import { GlobalStore } from "../../infrastructure/store";
import React from "react";
import { Divider, FAB, Modal, Portal, Snackbar } from "react-native-paper";
import { Button, IconButton, Input } from "../../presentational/components";
import { Feather } from "@expo/vector-icons";
import {
    CreateIngredient,
    IngredientsHeader,
    IngredientRow,
} from "../../presentational/app/ingredients";

interface IProps {
    globalStore?: GlobalStore;
}

const Ingredients: FC<IProps> = inject("globalStore")(
    observer(({ globalStore }) => {
        const colors = useColors();
        const ingredientsService = new IngredientsService();

        const { isKeyboardVisible } = useKeyboard();

        const [refreshing, setRefreshing] = useState<boolean>(false);
        const [message, setMessage] = useState<string | null>(null);
        const [found, setFound] = useState<boolean>(true);
        const [selected, setSelected] = useState<string[]>([]);
        const [ingredients, setIngredients] = useState<Ingredient[]>([]);
        const [showModal, setShowModal] = useState<boolean>(false);

        const handleSelect = (id: string) => {
            const index = selected.indexOf(id);

            if (index !== -1) {
                // found => remove
                selected.splice(index, 1);
                setSelected([...selected]);
                return;
            }
            // not found => add
            setSelected([...selected, id]);
        };

        const handleDismissSnack = () => {
            setMessage(null);
        };

        return (
            <View className="h-full">
                <View
                    className="flex flex-row justify-center items-center"
                    style={{
                        gap: 8,
                    }}
                >
                    <IngredientsHeader
                        selected={selected}
                        refreshing={refreshing}
                        ingredientsService={ingredientsService}
                        setRefreshing={setRefreshing}
                        setFound={setFound}
                        setIngredients={setIngredients}
                        setMessage={setMessage}
                    />
                </View>
                <View>
                    {ingredients.length ? (
                        <>
                            <View className="flex flex-row justify-start items-center px-4 py-4">
                                <Text className="w-1/2 font-semibold text-neutral-6">Name</Text>
                                <Text className="w-1/4 font-semibold text-neutral-6">Labels</Text>
                                <View className="w-1/4 flex justify-center items-end">
                                    <Text className="font-semibold text-neutral-6">Actions</Text>
                                </View>
                            </View>
                            <Divider />
                        </>
                    ) : (
                        <></>
                    )}
                    <ScrollView
                        contentContainerStyle={{
                            // height: "100%",
                            paddingBottom: 140,
                        }}
                        refreshControl={<RefreshControl refreshing={refreshing} />}
                    >
                        {ingredients.map((ingredient, i) => {
                            return (
                                <IngredientRow
                                    key={`dish-ingredient-option-${i}`}
                                    ingredient={ingredient}
                                    selected={selected.includes(ingredient.id)}
                                    onSelected={() => handleSelect(ingredient.id)}
                                />
                            );
                        })}
                        {found === false && (
                            <View className="w-full h-screen justify-center items-center pb-[240px]">
                                <Text className="text-xl font-bold text-neutral-6">
                                    No Ingredients Found
                                </Text>
                            </View>
                        )}
                    </ScrollView>
                </View>
                <Portal>
                    <Modal visible={showModal} onDismiss={() => setShowModal(false)}>
                        <CreateIngredient
                            ingredientsService={ingredientsService}
                            setMessage={setMessage}
                            showModal={showModal}
                            setShowModal={setShowModal}
                        />
                    </Modal>
                </Portal>
                {!isKeyboardVisible && (
                    <View className="absolute bottom-24 right-4 z-100 ">
                        <IconButton
                            className="w-14 h-14 bg-neutral-10 shadow-sm shadow-neutral-10 rounded-full"
                            icon={() => <Feather name="plus" size={30} color={colors.neutral[0]} />}
                            onPress={() => setShowModal(true)}
                        />
                    </View>
                )}
                <Snackbar
                    className="mb-24"
                    visible={message !== null}
                    onDismiss={handleDismissSnack}
                    action={{
                        label: "Ok",
                        onPress: handleDismissSnack,
                    }}
                >
                    {message}
                </Snackbar>
            </View>
        );
    })
);

export default Ingredients;
