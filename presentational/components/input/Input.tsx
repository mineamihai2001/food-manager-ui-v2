import { FC, useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

type IProps = {
    className?: string;
    label?: string;
    rightIcon?: React.JSX.Element;
    disabled?: boolean;
    focused?: boolean;
} & TextInputProps;

export const Input: FC<IProps> = ({
    focused: defaultFocused,
    className,
    disabled,
    rightIcon,
    ...other
}) => {
    const [focused, setFocused] = useState<boolean>();

    return (
        <View className="flex justify-center gap-1 relative">
            {other.label && typeof defaultFocused !== "undefined" ? (
                <Text className={`font-bold ${defaultFocused ? "text-primary-2" : ""}`}>
                    {other.label}
                </Text>
            ) : (
                <Text className={`font-bold ${focused ? "text-primary-2" : ""}`}>
                    {other.label}
                </Text>
            )}
            <TextInput
                editable={!disabled}
                selectTextOnFocus={!disabled}
                onFocus={(e) => setFocused(true)}
                onBlur={(e) => setFocused(false)}
                className={`peer border-[1.3px] border-neutral-3 focus:border-primary-2 rounded-lg 
                            px-4 py-2
                            ${disabled ? "bg-neutral-1 border-neutral-2" : ""}
                            ${className}`}
                {...other}
            />
            {rightIcon && (
                <View className="h-full absolute flex justify-center items-center right-2">
                    {rightIcon}
                </View>
            )}
        </View>
    );
};
