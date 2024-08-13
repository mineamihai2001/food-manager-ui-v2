import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { View } from "react-native";
import { inject, observer } from "mobx-react";
import React from "react";
import { useColors } from "../../../infrastructure/hooks";
import { GlobalStore } from "../../../infrastructure/store";
import { Button, IconButton } from "../../components";
import { FontAwesome6, Feather, Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { DishesService } from "../../../infrastructure/services/dishes";
import { Sort } from "../../../domain/models";

interface IProps {
    globalStore?: GlobalStore;
    selected: string[];
    emptySelected: () => void;
    refreshing: boolean;
    layout: "rows" | "preview" | "grid";
    dishesService: DishesService;
    handleLayoutChange: () => void;
    setRefreshing: Dispatch<SetStateAction<boolean>>;
    setMessage: Dispatch<SetStateAction<string | null>>;
    sort: Sort;
    setSort: Dispatch<SetStateAction<Sort>>;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    dishCount: number;
}

export const DishesHeader: FC<IProps> = inject("globalStore")(
    observer(
        ({
            globalStore,
            selected,
            emptySelected,
            layout,
            handleLayoutChange,
            dishesService,
            setMessage,
            sort,
            setSort,
            page,
            setPage,
            dishCount,
        }) => {
            const colors = useColors();

            const [editMode, setEditMode] = useState<boolean>(false);

            const handleDeleteSelected = async () => {
                if (!selected.length) return;

                const result = await dishesService.deleteMany(globalStore?.kitchen.id!, selected);

                setMessage(result ? "Dishes deleted" : "Error deleting dishes");
            };

            useEffect(() => {
                if (!selected.length && editMode) {
                    // all deselected
                    setEditMode(false);
                } else if (selected.length) {
                    setEditMode(true);
                }
            }, [selected]);

            return (
                <View>
                    {editMode ? (
                        <View className="bg-neutral-0 pt-10 flex flex-row justify-start items-center pr-2">
                            <IconButton
                                icon={() => (
                                    <Feather
                                        name="arrow-left"
                                        size={28}
                                        color={colors.neutral[10]}
                                    />
                                )}
                                onPress={() => {
                                    emptySelected();
                                    setEditMode(false);
                                }}
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
                        <View
                            className="mt-10 flex flex-row justify-start items-center mx-2"
                            style={{}}
                        >
                            <IconButton
                                icon={() => (
                                    <Feather
                                        name={`${
                                            sort === Sort.NONE
                                                ? "minus"
                                                : sort === Sort.DESCENDING
                                                ? "chevron-down"
                                                : "chevron-up"
                                        }`}
                                        size={12}
                                        color={colors.neutral[8]}
                                    />
                                )}
                                onPress={() => {
                                    let newSort: Sort;
                                    switch (sort) {
                                        case Sort.ASCENDING:
                                            newSort = Sort.DESCENDING;
                                            break;
                                        case Sort.DESCENDING:
                                            newSort = Sort.ASCENDING;
                                            break;
                                        case Sort.NONE:
                                            newSort = Sort.ASCENDING;
                                            break;
                                        default:
                                            newSort = Sort.NONE;
                                    }
                                    setSort(newSort);
                                }}
                            />
                            <IconButton
                                icon={() => (
                                    <FontAwesome6
                                        name="sliders"
                                        size={14}
                                        color={colors.neutral[4]}
                                    />
                                )}
                                disabled
                            />
                            <IconButton
                                icon={() => (
                                    <Feather
                                        name="chevron-left"
                                        size={12}
                                        color={colors.neutral[8]}
                                    />
                                )}
                                onPress={() => setPage(page - 1)}
                                disabled={page === 0}
                            />
                            <IconButton
                                icon={() => (
                                    <Feather
                                        name="chevron-right"
                                        size={12}
                                        color={colors.neutral[8]}
                                    />
                                )}
                                onPress={() => setPage(page + 1)}
                                disabled={dishCount < 25}
                            />
                            <IconButton
                                mode="outlined"
                                icon={() =>
                                    layout === "rows" ? (
                                        <MaterialCommunityIcons
                                            name="cards-variant"
                                            size={14}
                                            color={colors.neutral[10]}
                                        />
                                    ) : layout === "grid" ? (
                                        <Feather name="grid" size={14} color={colors.neutral[10]} />
                                    ) : (
                                        <Octicons
                                            name="rows"
                                            size={14}
                                            color={colors.neutral[10]}
                                        />
                                    )
                                }
                                onPress={handleLayoutChange}
                            />

                            <Button
                                mode="outlined"
                                className="ml-auto flex flex-row justify-center items-center"
                                onPress={() => router.push(`dishes/create`)}
                                icon={() => (
                                    <View className="">
                                        <Feather name="plus" color={colors.neutral[10]} size={16} />
                                    </View>
                                )}
                            >
                                Add
                            </Button>
                        </View>
                    )}
                </View>
            );
        }
    )
);
