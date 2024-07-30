import { FC, useEffect, useState } from "react";
import {
    Keyboard,
    Pressable,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { Dish } from "../../../domain/models";
import { useColors } from "../../../infrastructure/hooks";
import { router, useLocalSearchParams } from "expo-router";
import { DishesService } from "../../../infrastructure/services/dishes";
import { inject, observer } from "mobx-react";
import { GlobalStore } from "../../../infrastructure/store";
import { BackButton, Button, Chip, IconButton, Input } from "../../../presentational/components";
import { Ingredient } from "../../../domain/models/ingredient.mode";
import { Feather } from "@expo/vector-icons";
import { IngredientsService } from "../../../infrastructure/services/ingredients";
import { IngredientsForm } from "../../../presentational/app/dishes";

interface IProps {
    globalStore?: GlobalStore;
}

const CreateDish: FC<IProps> = inject("globalStore")(
    observer(({ globalStore }) => {
        const colors = useColors();

        const dishesService = new DishesService();

        const [refreshing, setRefreshing] = useState<boolean>(false);

        const [name, setName] = useState<string>("");
        const [hours, setHours] = useState<string>("");
        const [minutes, setMinutes] = useState<string>("");
        const [images, setImages] = useState<string[]>([]);
        const [steps, setSteps] = useState<string[]>([]);
        const [ingredients, setIngredients] = useState<Ingredient[]>([]);

        const [durationFocused, setDurationFocused] = useState<boolean>(false);
        const [stepsFocused, setStepsFocused] = useState<boolean>(false);

        const handleRefresh = async () => {
            setRefreshing(true);
            setName((_) => "");
            setHours((_) => "");
            setMinutes((_) => "");
            setImages((_) => []);
            setSteps((_) => []);
            setIngredients((_) => []);
            setRefreshing((_) => false);
        };

        const handleAddStep = () => {
            setSteps((_) => [...steps, ""]);
        };

        const handleRemoveStep = (index: number) => {
            setSteps(steps.filter((_, i) => i !== index));
        };

        const handleCreate = async () => {
            const res = await dishesService.create(
                globalStore?.kitchen.id!,
                name,
                (Number(hours) * 60 + Number(minutes)) * 60 * 1000, // value must be in ms
                images,
                steps,
                ingredients.filter((i) => i !== null)
            );
            router.back();
        };

        const handleBlurIngredients = () => {
            Keyboard.dismiss();
        };

        const handleAddIngredient = (ingredient: Ingredient) => {
            setIngredients((_) => [...ingredients, ingredient]);
        };

        const handleRemoveIngredient = (index: number) => {
            setIngredients(ingredients.filter((_, i) => i !== index));
        };

        return (
            <TouchableWithoutFeedback onPress={handleBlurIngredients}>
                <View className="h-full">
                    <View
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            gap: 40,
                            paddingBottom: 140,
                            paddingTop: 100,
                        }}
                    >
                        <BackButton />
                        <View
                            className="px-8 flex bg-neutral-0 rounded-2xl py-8 pb-10 shadow shadow-neutral-5"
                            style={{
                                gap: 20,
                            }}
                        >
                            <Input
                                value={name}
                                onChangeText={setName}
                                placeholder="Text"
                                label="Name"
                            />
                            <View className="flex justify-center gap-1">
                                <Text
                                    className={`font-bold ${
                                        durationFocused ? "text-primary-2" : ""
                                    }`}
                                >
                                    Duration
                                </Text>
                                <View className="w-full flex flex-row justify-start items-center">
                                    <Input
                                        value={hours}
                                        onChangeText={setHours}
                                        placeholder="Hours"
                                        keyboardType="numeric"
                                        className="w-20 rounded-r-none border-r-0"
                                        onFocus={() => setDurationFocused(true)}
                                        onBlur={() => setDurationFocused(false)}
                                    />
                                    <Input
                                        value={minutes}
                                        onChangeText={setMinutes}
                                        placeholder="Min"
                                        keyboardType="numeric"
                                        className="w-20 rounded-l-none"
                                        onFocus={() => setDurationFocused(true)}
                                        onBlur={() => setDurationFocused(false)}
                                    />
                                </View>
                            </View>
                            <IngredientsForm
                                addIngredient={handleAddIngredient}
                                removeIngredient={handleRemoveIngredient}
                                ingredients={ingredients}
                            />
                            <View className="flex justify-center gap-1 z-[-1]">
                                <Text
                                    className={`font-bold ${stepsFocused ? "text-primary-2" : ""}`}
                                >
                                    Steps
                                </Text>
                                <View
                                    className="flex"
                                    style={{
                                        gap: 20,
                                    }}
                                >
                                    {steps.map((step, i) => {
                                        return (
                                            <Input
                                                key={`dish-step-${i}`}
                                                value={steps[0]}
                                                onChangeText={() => {}}
                                                placeholder={`Step ${i + 1}`}
                                                onFocus={() => setStepsFocused(true)}
                                                onBlur={() => setStepsFocused(false)}
                                                rightIcon={
                                                    <Pressable
                                                        className="mt-6 "
                                                        onPress={() => handleRemoveStep(i)}
                                                    >
                                                        <Feather
                                                            name="x"
                                                            size={20}
                                                            color={colors.danger[2]}
                                                        />
                                                    </Pressable>
                                                }
                                            />
                                        );
                                    })}
                                    <Pressable
                                        className="border-4 border-neutral-3 border-dashed w-full h-10
                                            flex justify-center items-center"
                                        onPress={handleAddStep}
                                    >
                                        <Feather name="plus" size={28} color={colors.neutral[4]} />
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className="absolute top-10 right-4 z-100">
                        <View>
                            <IconButton
                                className="w-10 h-10 bg-success-1 shadow-sm shadow-neutral-10"
                                icon={<Feather name="check" size={20} color={colors.neutral[0]} />}
                                onPress={handleCreate}
                            />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    })
);

export default CreateDish;
