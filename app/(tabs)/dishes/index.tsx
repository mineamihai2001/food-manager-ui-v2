import { RefreshControl, ScrollView, Text, View } from "react-native";
import { FC, SetStateAction, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { GlobalStore } from "../../../infrastructure/store";
import { DishesService } from "../../../infrastructure/services/dishes";
import { Dish, Sort } from "../../../domain/models";
import { useColors } from "../../../infrastructure/hooks";
import { DishesHeader, DishItem } from "../../../presentational/app/dishes";
import { Button, IconButton } from "../../../presentational/components";
import { FontAwesome6, Feather, Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Divider, Snackbar } from "react-native-paper";

export interface IProps {
    globalStore?: GlobalStore;
}

export type Layout = "rows" | "preview" | "grid";

const Dishes: FC<IProps> = inject("globalStore")(
    observer(({ globalStore }) => {
        const dishesService = new DishesService();

        const layoutOrder: Layout[] = ["rows", "preview"];
        const colors = useColors();

        const [message, setMessage] = useState<string | null>(null);
        const [refreshing, setRefreshing] = useState<boolean>(false);
        const [dishes, setDishes] = useState<Dish[]>([]);
        const [layout, setLayout] = useState<Layout>("rows");
        const [selected, setSelected] = useState<string[]>([]);
        const [page, setPage] = useState<number>(0);
        const [sort, setSort] = useState<Sort>(Sort.DESCENDING);

        const handleLayoutChange = () => {
            const currentIndex = layoutOrder.findIndex((i) => i === layout);
            const index = currentIndex + 1 <= layoutOrder.length - 1 ? currentIndex + 1 : 0;

            setLayout(layoutOrder[index]);
        };

        const handleRefresh = async () => {
            setRefreshing(true);

            const response = await dishesService.getPage(globalStore?.kitchen.id!, page, 25, sort);

            setRefreshing((_) => false);
            setDishes((_) => response.items);
        };

        const handleRemove = async (dish: Dish) => {
            await dishesService.delete(globalStore?.kitchen.id!, dish.id);
            setDishes((prev) => prev.filter((d) => d.id !== dish.id));
        };

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

        useEffect(() => {
            handleRefresh();
        }, []);

        useEffect(() => {
            handleRefresh();
        }, [page, sort]);

        return (
            <View className="h-full">
                <DishesHeader
                    selected={selected}
                    emptySelected={() => setSelected([])}
                    refreshing={refreshing}
                    layout={layout}
                    dishesService={dishesService}
                    handleLayoutChange={handleLayoutChange}
                    setRefreshing={setRefreshing}
                    setMessage={setMessage}
                    sort={sort}
                    setSort={setSort}
                    page={page}
                    setPage={setPage}
                    dishCount={dishes.length}
                />
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                    }
                    contentContainerStyle={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: layout === "preview" ? 20 : 0,
                        paddingBottom: dishes.length > 3 ? 240 : 0,
                    }}
                >
                    {dishes.length ? (
                        <>
                            {layout === "rows" ? (
                                <>
                                    <View className="flex flex-row justify-start items-center px-4 py-4">
                                        <Text className="w-1/3 font-semibold text-neutral-6">
                                            Name
                                        </Text>
                                        <Text className="w-1/6  font-semibold text-neutral-6">
                                            Rating
                                        </Text>
                                        <Text className="w-1/3 font-semibold text-neutral-6">
                                            Duration
                                        </Text>
                                        <View className="w-1/6 flex justify-center items-end">
                                            <Text className="font-semibold text-neutral-6">
                                                Actions
                                            </Text>
                                        </View>
                                    </View>
                                    <Divider />
                                </>
                            ) : (
                                <></>
                            )}
                            {dishes.map((dish, i) => {
                                return (
                                    <DishItem
                                        key={`dish-${i}`}
                                        dish={dish}
                                        mode={layout}
                                        handleRemove={handleRemove}
                                        selected={selected.includes(dish.id)}
                                        onSelected={() => handleSelect(dish.id)}
                                    />
                                );
                            })}
                        </>
                    ) : (
                        <View className="w-full h-screen justify-center items-center pb-[240px]">
                            <Text className="text-xl font-bold text-neutral-6">
                                No Dishes Found
                            </Text>
                        </View>
                    )}
                </ScrollView>
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

export default Dishes;
