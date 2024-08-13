import { FC, useState } from "react";
import { Text, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { Props as TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";
import { useColors } from "../../../infrastructure/hooks";

type IProps = {
    className?: string;
    label?: string;
    disabled?: boolean;
    focused?: boolean;
    errorMessage?: string;
    showError?: boolean;
    required?: boolean;
} & TextInputProps;

export const Input: FC<IProps> = ({
    focused: defaultFocused,
    className,
    disabled,
    label,
    errorMessage,
    showError = false,
    required = false,
    ...other
}) => {
    const colors = useColors();

    return (
        <View className="flex justify-center relative">
            {label && (
                <View className="flex flex-row">
                    <Text className={`font-bold`}>{label}</Text>
                    {required && <Text className={`font-bold text-danger-2`}>*</Text>}
                </View>
            )}
            <TextInput
                mode="flat"
                editable={!disabled}
                selectTextOnFocus={!disabled}
                disabled={disabled}
                theme={{
                    colors: {
                        background: colors.neutral[1],
                        surfaceVariant: colors.neutral[1],
                        primary: colors.neutral[10],
                    },
                }}
                underlineColor="transparent"
                className={`peer rounded-lg
                            ${disabled ? "bg-neutral-1" : ""}
                            ${className}`}
                // ${showError ? "border border-red-500" : "border border-transparent"}
                {...other}
            />
            {errorMessage && (
                <HelperText type="error" visible={showError}>
                    {errorMessage}
                </HelperText>
            )}
        </View>
    );
};
