import { FC } from "react";
import { View, Text } from "react-native";
import { Divider } from "react-native-paper";
import { Ingredient } from "../../../domain/models/ingredient.model";
import { inject, observer } from "mobx-react";
import { GlobalStore } from "../../../infrastructure/store";
import { Checkbox, Chip } from "../../components";

interface IProps {
    globalStore?: GlobalStore;
    ingredient: Ingredient;
    selected: boolean;
    onSelected: () => void;
}

export const IngredientRow: FC<IProps> = inject("globalStore")(
    observer(({ ingredient, selected, onSelected }) => {
        return (
            <View className="bg-neutral-0">
                <View
                    className="flex flex-row justify-start items-center
                                px-4 py-4"
                >
                    <View className="w-1/2">
                        <Text className="font-semibold">
                            {ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)}
                        </Text>
                    </View>
                    <View className="w-1/4 flex justify-center items-start">
                        <Chip className="bg-neutral-10" compact>
                            <Text className="text-neutral-0 text-xs">TBD</Text>
                        </Chip>
                    </View>
                    <View className="w-1/4 flex justify-center items-end">
                        <Checkbox
                            status={selected ? "checked" : "unchecked"}
                            onPress={onSelected}
                        />
                    </View>
                </View>
                <Divider className="" />
            </View>
        );
    })
);
