import { FC, useState } from "react";
import { Text, View } from "react-native";
import { Searchbar, TextInput } from "react-native-paper";
import { Props as TextInputProps } from "react-native-paper/lib/typescript/components/Searchbar";
import { useColors } from "../../../infrastructure/hooks";

type IProps = {
    className?: string;
    labelClassName?: string;
    containerClassName?: string;
    label?: string;
    disabled?: boolean;
    focused?: boolean;
    required?: boolean;
    background?: string;
} & TextInputProps;

export const Search: FC<IProps> = ({
    focused: defaultFocused,
    className,
    labelClassName,
    containerClassName,
    disabled,
    label,
    background,
    required = false,
    ...other
}) => {
    const colors = useColors();

    return (
        <View className={`flex justify-center gap-1 ${containerClassName}`}>
            {label && (
                <View className="flex flex-row">
                    <Text className={`font-bold ${labelClassName}`}>{label}</Text>
                    {required && <Text className={`font-bold text-danger-2`}>*</Text>}
                </View>
            )}
            <Searchbar
                editable={!disabled}
                selectTextOnFocus={!disabled}
                className={`peer rounded-lg
                            ${disabled ? "" : ""}
                            ${className}`}
                style={{
                    backgroundColor: background ?? colors.neutral[1],
                }}
                {...other}
            />
        </View>
    );
};
