import { FC } from "react";
import { Pressable, PressableProps, Text, View } from "react-native";
import { useColors } from "../../../infrastructure/hooks";

type IProps = {
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    label?: string;
    icon?: React.ReactNode;
} & PressableProps;

export const Select: FC<IProps> = (props) => {
    const { children, className, label, icon, ...other } = props;

    const colors = useColors();

    return (
        <Pressable
            className={`
        border-2 bg-neutral-0 border-neutral-10
        px-2 py-1 rounded-md
        flex flex-row justify-center items-center
        ${props.disabled ? "bg-neutral-2 border-neutral-4" : ""} ${className}`}
            style={{
                gap: label ? 8 : 0,
            }}
            {...other}
        >
            <View>
                {label && (
                    <Text className={`${props.disabled ? "text-neutral-6" : "text-neutral-10"}`}>
                        {label}
                    </Text>
                )}
            </View>
            {icon}
        </Pressable>
    );
};
