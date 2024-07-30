import { RefreshControl, ScrollView, Text, View } from "react-native";
import { FC, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { GlobalStore } from "../../../infrastructure/store";
import { DishesService } from "../../../infrastructure/services/dishes";
import { Dish } from "../../../domain/models";
import { useColors } from "../../../infrastructure/hooks";
import { DishCard } from "../../../presentational/app/dishes";
import { Button, Select } from "../../../presentational/components";
import { FontAwesome6, Feather } from "@expo/vector-icons";
import { ErrorBoundary, router } from "expo-router";

export interface IProps {
    globalStore?: GlobalStore;
}

export type Layout = "rows" | "preview" | "grid";

const Dishes: FC<IProps> = inject("globalStore")(
    observer(({ globalStore }) => {
        const dishesService = new DishesService();

        const layoutOrder: Layout[] = ["rows", "preview"];
        const colors = useColors();

        const [refreshing, setRefreshing] = useState<boolean>(false);
        const [dishes, setDishes] = useState<Dish[]>([]);
        const [layout, setLayout] = useState<Layout>("rows");

        const handleLayoutChange = () => {
            const currentIndex = layoutOrder.findIndex((i) => i === layout);
            const index = currentIndex + 1 <= layoutOrder.length - 1 ? currentIndex + 1 : 0;

            setLayout(layoutOrder[index]);
        };

        const handleRefresh = async () => {
            setRefreshing(true);

            const dishes: Dish[] = await dishesService.getAll(globalStore?.kitchen.id!);

            setRefreshing((_) => false);
            setDishes((_) => dishes);
        };

        const handleRemove = async (dish: Dish) => {
            await dishesService.delete(globalStore?.kitchen.id!, dish.id);
            setDishes((prev) => prev.filter((d) => d.id !== dish.id));
        };

        useEffect(() => {
            handleRefresh();
        }, []);

        return (
            <View className="h-full pt-10">
                <View
                    className="flex flex-row mx-7 py-4"
                    style={{
                        gap: 10,
                    }}
                >
                    <Select
                        label="Sort"
                        icon={<Feather name="chevron-down" size={12} color={colors.neutral[8]} />}
                        disabled
                    />
                    <Select
                        label="Filter"
                        icon={<FontAwesome6 name="sliders" size={14} color={colors.neutral[4]} />}
                        disabled
                    />
                    <Select
                        icon={
                            layout === "rows" ? (
                                <Feather name="columns" size={14} color={colors.neutral[10]} />
                            ) : layout === "grid" ? (
                                <Feather name="grid" size={14} color={colors.neutral[10]} />
                            ) : (
                                <Feather name="layout" size={14} color={colors.neutral[10]} />
                            )
                        }
                        onPress={handleLayoutChange}
                    />

                    <Button
                        className="ml-auto flex flex-row justify-center items-center px-4"
                        style={
                            {
                                // gap: 10,
                            }
                        }
                        onPress={() => router.push(`dishes/create`)}
                    >
                        <Text className="font-medium text-neutral-0">Add</Text>
                        <View className="">
                            <Feather name="plus" color={colors.neutral[0]} size={16} />
                        </View>
                    </Button>
                </View>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                    }
                    contentContainerStyle={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 10,
                        paddingBottom: dishes.length > 3 ? 240 : 0,
                    }}
                >
                    {dishes.map((d, i) => {
                        return (
                            <DishCard
                                key={`dish-${i}`}
                                dish={d}
                                mode={layout}
                                handleRemove={handleRemove}
                            />
                        );
                    })}
                </ScrollView>
            </View>
        );
    })
);

export default Dishes;
