import { FC } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Dish } from "../../../domain/models";
import { Fontisto, Feather } from "@expo/vector-icons";
import { useColors } from "../../../infrastructure/hooks";
import placeholder from "../../../assets/images/placeholder.png";
import { router } from "expo-router";
import dayjs from "../../../infrastructure/dayjs";
import { Checkbox } from "../../components";
import { Divider } from "react-native-paper";

interface IProps {
    dish: Dish;
    mode: "rows" | "preview" | "grid";
    handleRemove: (dish: Dish) => void;
    selected: boolean;
    onSelected: () => void;
}

export const DishItem: FC<IProps> = ({
    dish,
    mode = "rows",
    handleRemove,
    selected,
    onSelected,
}) => {
    const colors = useColors();

    return mode === "rows" ? (
        <Pressable className="bg-neutral-0" onPress={() => router.push(`dishes/${dish.id}`)}>
            <View
                className="flex flex-row justify-start items-center
                            px-4 py-4"
            >
                <View className="w-1/3">
                    <Text className="font-semibold">{dish.name}</Text>
                </View>
                <View className="w-1/6 flex flex-row justify-start items-center">
                    <Text className="">{dish.rating}</Text>
                </View>
                <View className="w-1/3 flex flex-row justify-start items-center">
                    <Text className="">
                        {dayjs.duration(dish.duration, "milliseconds").format("H:mm")}
                    </Text>
                </View>
                <View className="w-1/6 flex flex-row justify-end items-center">
                    <Checkbox status={selected ? "checked" : "unchecked"} onPress={onSelected} />
                </View>
            </View>
            <Divider className="" />
        </Pressable>
    ) : (
        <Pressable
            onPress={() => router.push(`dishes/${dish.id}`)}
            className={`w-[85%] bg-neutral-0 rounded-lg shadow shadow-neutral-5
                        flex justify-end`}
        >
            <View className="w-full">
                <View className="h-24 flex justify-center items-center bg-primary-0 rounded-t-lg">
                    {typeof dish.images.at(0) !== "undefined" ? (
                        <Image
                            className="w-full h-full rounded-t-lg"
                            source={{
                                uri: dish.images.at(0),
                            }}
                        />
                    ) : (
                        <Image className="w-20 h-20 opacity-50" source={placeholder} />
                    )}
                </View>
                <View className="px-4 py-4">
                    <Text className="text-xl font-bold pl-2">{dish.name}</Text>
                    <View className="flex flex-row gap-3">
                        <View className="flex flex-row justify-center items-center gap-2">
                            <Fontisto name="stopwatch" size={18} color={colors.neutral[10]} />
                            <Text className="">
                                {dayjs.duration(dish.duration, "milliseconds").format("H:mm")}
                            </Text>
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
