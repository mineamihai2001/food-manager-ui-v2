import { FC, forwardRef } from "react";
import { Pressable, PressableProps, Text } from "react-native";

type IProps = {
    className?: string;
    icon: React.ReactNode;
    type?: "default" | "outlined";
} & PressableProps;

export const IconButton: FC<IProps> = forwardRef((props: IProps, ref) => {
    const { type = "default" } = props;
    return type === "default" ? <Default {...props} /> : <Outlined {...props} />;
});

const Default: FC<IProps> = ({ className, onPress, icon, type = "default", ...other }) => {
    return (
        <Pressable
            className={`flex justify-center items-center py-2 px-2 rounded-full bg-primary-2 
            ${className}`}
            onPress={onPress}
            {...other}
        >
            {typeof icon === "string" ? (
                <Text className="text-neutral-0 font-semibold">{icon}</Text>
            ) : (
                icon
            )}
        </Pressable>
    );
};

const Outlined: FC<IProps> = ({
    className,
    onPress,
    icon: children,
    type = "default",
    ...other
}) => {
    return (
        <Pressable
            className={`px-6 py-2 rounded-full border border-neutral-4 bg-neutral-0
            ${className}`}
            onPress={onPress}
            {...other}
        >
            {typeof children === "string" ? (
                <Text className="text-neutral-8 font-semibold">{children}</Text>
            ) : (
                children
            )}
        </Pressable>
    );
};
