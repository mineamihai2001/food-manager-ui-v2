import { FC } from "react";
import { View, Text, Pressable } from "react-native";
import { Fontisto, Feather } from "@expo/vector-icons";
import { useColors } from "../../../../infrastructure/hooks";

interface IProps {
    step: { id: number; done: boolean; value: string };
    toggleDone: (id: number) => void;
}

export const Step: FC<IProps> = ({ step, toggleDone }) => {
    const colors = useColors();

    return (
        <Pressable
            className={`w-full flex flex-row justify-center items-center px-2 py-6
                    rounded-lg ${step.done ? "bg-success-1" : "bg-neutral-2"}`}
            onPress={() => toggleDone(step.id)}
        >
            <View className="flex flex-row justify-start items-center mr-auto w-full">
                <View className="w-[80%] ml-2">
                    <Text className="text-lg font-medium ">Step {step.id + 1}</Text>
                    <Text className="text-sm">
                        {step.value.charAt(0).toUpperCase() + step.value.slice(1)}
                    </Text>
                </View>
                {step.done === true ? (
                    <Pressable className="ml-auto mr-4 rounded-full p-1 border border-success-2 bg-success-2">
                        <View className="w-[20]">
                            <Feather name="check" size={20} color={colors.neutral[0]} />
                        </View>
                    </Pressable>
                ) : (
                    <Pressable className="ml-auto mr-4 rounded-full p-1 bg-neutral-0 border border-neutral-3">
                        <View className="w-[20] h-[20]"></View>
                    </Pressable>
                )}
            </View>
        </Pressable>
    );
};
