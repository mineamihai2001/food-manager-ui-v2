import { FC, useEffect, useState } from "react";
import { Image, Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { Dish } from "../../../domain/models";
import { Fontisto, Feather } from "@expo/vector-icons";
import { useColors } from "../../../infrastructure/hooks";
import placeholder from "../../../assets/images/placeholder.png";
import { useLocalSearchParams } from "expo-router";
import { DishesService } from "../../../infrastructure/services/dishes";
import { inject, observer } from "mobx-react";
import { GlobalStore } from "../../../infrastructure/store";
import { BackButton, Chip } from "../../../presentational/components";
import { Guide } from "../../../presentational/app/dishes";

interface IProps {
    globalStore?: GlobalStore;
}

const DishDetails: FC<IProps> = inject("globalStore")(
    observer(({ globalStore }) => {
        const { id } = useLocalSearchParams();
        const colors = useColors();

        const dishesService = new DishesService();

        const [dish, setDish] = useState<Dish>();
        const [refreshing, setRefreshing] = useState<boolean>(false);

        const handleRefresh = async () => {
            setRefreshing(true);
            const result = await dishesService.getById(globalStore?.kitchen.id!, id as string);
            setDish((_) => result);
            setRefreshing((_) => false);
        };

        useEffect(() => {
            handleRefresh();
        }, []);

        return typeof dish !== "undefined" ? (
            <View className="h-full">
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                    }
                    contentContainerStyle={{
                        display: "flex",
                        justifyContent: "flex-start",
                        gap: 20,
                        paddingBottom: 140,
                    }}
                >
                    <BackButton />
                    <View>
                        <View className="h-48 flex justify-center items-center fixed z-[-1] bg-primary-0">
                            {typeof dish.images.at(0) !== "undefined" ? (
                                <Image
                                    className="w-full h-full"
                                    source={{
                                        uri: dish.images.at(0),
                                    }}
                                />
                            ) : (
                                <Image className="w-20 h-20 opacity-50" source={placeholder} />
                            )}
                        </View>
                        <View
                            className="px-4 pt-4 pb-8 bg-neutral-0 rounded-2xl absolute w-full bottom-[-70%] 
                                        shadow shadow-neutral-5"
                        >
                            <Text className="text-2xl font-bold pl-2 pb-2">{dish.name}</Text>
                            <View className="flex gap-1 justify-start items-start">
                                <View className="flex flex-row justify-center items-center gap-2">
                                    <Text className="">Duration: </Text>
                                    <Fontisto
                                        name="stopwatch"
                                        size={18}
                                        color={colors.neutral[10]}
                                    />
                                    <Text className="font-bold">{dish.duration / 1000} min</Text>
                                </View>
                                <View className="flex flex-row justify-center items-center gap-2">
                                    <Text className="">Reviews: </Text>
                                    <Feather name="star" size={18} color={colors.neutral[10]} />
                                    <Text className="font-bold">{dish.rating}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View
                        className="px-4 pt-4 mt-[138] pb-8 bg-neutral-0 rounded-2xl
                                    flex justify-center items-start shadow shadow-neutral-5"
                    >
                        <Text className="text-2xl font-bold pl-2 pb-2">Ingredients</Text>
                        {dish.ingredients.map((ingredient, i) => {
                            return (
                                <View
                                    key={`dish-${dish.id}-ingredient-${i}`}
                                    className="w-full flex flex-row justify-center items-center px-2 py-3 border-b border-b-neutral-3"
                                >
                                    <View className="flex flex-row justify-center items-center mr-auto">
                                        <Text className="text-lg font-medium ">
                                            {ingredient.name.charAt(0).toUpperCase() +
                                                ingredient.name.slice(1)}
                                        </Text>
                                    </View>
                                    <Chip className="">
                                        <Text className="ml-auto">0 g</Text>
                                    </Chip>
                                </View>
                            );
                        })}
                    </View>
                    <Guide dish={dish} />
                </ScrollView>
            </View>
        ) : (
            <></>
        );
    })
);

export default DishDetails;
