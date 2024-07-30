import { FC } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Dish } from "../../../domain/models";
import { Fontisto, Feather } from "@expo/vector-icons";
import { useColors } from "../../../infrastructure/hooks";
import placeholder from "../../../assets/images/placeholder.png";
import { Link, router } from "expo-router";

interface IProps {
    dish: Dish;
    mode: "rows" | "preview" | "grid";
    handleRemove: (dish: Dish) => void;
}

export const DishCard: FC<IProps> = ({ dish, mode = "rows", handleRemove }) => {
    const colors = useColors();

    return (
        <Pressable
            onPress={() => router.push(`dishes/${dish.id}`)}
            className={`w-[85%] bg-neutral-0 rounded-lg shadow shadow-neutral-5
            flex justify-end ${
                mode === "rows" ? "border-l-4 border-l-primary-1 rounded-l-none" : ""
            }`}
        >
            <View className="w-full">
                {mode === "preview" && (
                    <View className="h-24 flex justify-center items-center bg-primary-0 rounded-t-lg">
                        {typeof dish.images.at(0) !== "undefined" ? (
                            <Image
                                className="w-full h-full rounded-t-lg"
                                source={{
                                    uri: dish.images.at(0),
                                }}
                            />
                        ) : (
                            <Image
                                className="w-20 h-20 opacity-50"
                                source={placeholder}
                            />
                        )}
                    </View>
                )}
                <View className="px-4 py-4">
                    <Text className="text-xl font-bold pl-2">{dish.name}</Text>
                    <View className="flex flex-row gap-3">
                        <View className="flex flex-row justify-center items-center gap-2">
                            <Fontisto name="stopwatch" size={18} color={colors.neutral[10]} />
                            <Text className="">{dish.duration / 1000} min</Text>
                        </View>
                        <View className="flex flex-row justify-center items-center gap-2">
                            <Feather name="star" size={18} color={colors.neutral[10]} />
                            <Text className="">{dish.rating}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};
