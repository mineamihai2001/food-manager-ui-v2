import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColors } from "../../../infrastructure/hooks";
import { IconButton } from "./IconButton";
import { FC } from "react";

interface IProps {}

export const BackButton: FC<IProps> = () => {
    const colors = useColors();

    return (
        <View className="absolute top-10 left-4 z-100">
            <View>
                <IconButton
                    className="w-10 h-10 bg-neutral-0 shadow-sm shadow-neutral-10"
                    icon={<Feather name="chevron-left" size={22} color={colors.primary[2]} />}
                    onPress={router.back}
                />
            </View>
        </View>
    );
};
