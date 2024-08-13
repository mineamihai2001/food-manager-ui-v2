import React, { FC } from "react";
import { View, Text } from "react-native";
import { Input, Button } from "../../../components";
import { TextInput } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { useColors } from "../../../../infrastructure/hooks";

interface IProps {
    steps: string[];
    handleRemoveStep: (index: number) => void;
    handleAddStep: () => void;
}

export const StepsForm: FC<IProps> = ({ steps, handleRemoveStep, handleAddStep }) => {
    const colors = useColors();

    return (
        <View className="flex justify-center gap-1 z-[-1]">
            <Text className={`font-bold`}>Steps</Text>
            <View
                className="flex"
                style={{
                    gap: 20,
                }}
            >
                {steps.map((step, i) => {
                    return (
                        <Input
                            key={`dish-step-${i}`}
                            value={steps[0]}
                            onChangeText={() => {}}
                            placeholder={`Step ${i + 1}`}
                            right={
                                <TextInput.Icon
                                    onPress={() => handleRemoveStep(i)}
                                    icon={() => (
                                        <Feather name="x" size={20} color={colors.danger[2]} />
                                    )}
                                ></TextInput.Icon>
                            }
                        />
                    );
                })}
                <Button
                    mode="outlined"
                    onPress={handleAddStep}
                    icon={() => <Feather name="plus" size={28} color={colors.neutral[10]} />}
                >
                    Add Step
                </Button>
            </View>
        </View>
    );
};
