import { inject, observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import { Image, ImageURISource, RefreshControl, ScrollView, Text, View } from "react-native";
import { GlobalStore } from "../../infrastructure/store";
import { Dish } from "../../domain/models";
import { useColors } from "../../infrastructure/hooks";
import { DishesService } from "../../infrastructure/services/dishes";
import { FontAwesome, FontAwesome6, Fontisto, AntDesign, Feather } from "@expo/vector-icons";
import dice1 from "../../assets/images/dice-six-faces-one.png";
import dice2 from "../../assets/images/dice-six-faces-two.png";
import dice3 from "../../assets/images/dice-six-faces-three.png";
import dice4 from "../../assets/images/dice-six-faces-four.png";
import dice5 from "../../assets/images/dice-six-faces-five.png";
import dice6 from "../../assets/images/dice-six-faces-six.png";
import { Button } from "../../presentational/components";
import { Link, router } from "expo-router";

interface IProps {
    globalStore?: GlobalStore;
}

const Random: FC<IProps> = inject("globalStore")(
    observer(({ globalStore }) => {
        const dishesService = new DishesService();

        const colors = useColors();
        const dices: ImageURISource[] = [dice1, dice2, dice3, dice4, dice5, dice6];

        const [refreshing, setRefreshing] = useState<boolean>(false);
        const [dish, setDish] = useState<Dish>();
        const [dice, setDice] = useState<ImageURISource>(dice1);

        const getRandomDice = () => {
            const index = Math.floor(Math.random() * 6);
            return dices[index];
        };

        const handleRefresh = async () => {
            setRefreshing(true);

            const interval = setInterval(() => {
                setDice(getRandomDice());
            }, 150);

            await new Promise((res) => setTimeout(res, 2000));
            const dish: Dish = await dishesService.getRandom(globalStore?.kitchen.id!);

            setRefreshing((_) => false);
            setDish((_) => dish);

            clearInterval(interval);
        };

        useEffect(() => {
            handleRefresh();
        }, []);

        return (
            <View className="h-full pt-10">
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                    }
                    contentContainerStyle={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 20,
                    }}
                >
                    <View className="relative mt-40">
                        <Image source={dice} className="w-20 h-20" />
                    </View>
                    {dish && (
                        <View className="flex justify-center items-center mt-5">
                            <Text className="text-4xl font-bold">{dish.name}</Text>
                            <View className="flex flex-row gap-3">
                                <View className="flex flex-row justify-center items-center gap-2">
                                    <Fontisto
                                        name="stopwatch"
                                        size={20}
                                        color={colors.neutral[10]}
                                    />
                                    <Text className="text-xl">{dish.duration / 1000} min</Text>
                                </View>
                                <View className="flex flex-row justify-center items-center gap-2">
                                    <Feather name="star" size={20} color={colors.neutral[10]} />
                                    <Text className="text-xl">{dish.rating}</Text>
                                </View>
                            </View>
                            <View
                                className="flex flex-row justify-center items-center"
                                style={{
                                    gap: 10,
                                }}
                            >
                                <Button
                                    className="mt-10 flex flex-row justify-center items-center"
                                    style={{
                                        gap: 10,
                                    }}
                                    onPress={() => router.push(`dishes/${dish.id}`)}
                                    icon={() => (
                                        <Feather name="info" size={18} color={colors.neutral[10]} />
                                    )}
                                >
                                    Details
                                </Button>
                                <Button
                                    mode="outlined"
                                    className="mt-10 flex flex-row justify-center items-center"
                                    style={{
                                        gap: 10,
                                    }}
                                    onPress={handleRefresh}
                                    icon={() => (
                                        <Feather
                                            name="refresh-cw"
                                            size={18}
                                            color={colors.neutral[10]}
                                        />
                                    )}
                                >
                                    Random
                                </Button>
                            </View>
                        </View>
                    )}
                </ScrollView>
            </View>
        );
    })
);

export default Random;
