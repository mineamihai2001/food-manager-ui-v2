import { ElementRef, FC, forwardRef } from "react";
import { Pressable, PressableProps, Text } from "react-native";
import { Button as PaperButton } from "react-native-paper";

type IProps = {
    className?: string;
    children?: React.ReactNode;
    type?: "default" | "outlined";
} & PressableProps;

export const Button: FC<IProps> = forwardRef((props: IProps, ref) => {
    const { type = "default" } = props;
    return type === "default" ? <Default {...props} /> : <Outlined {...props} />;
});

const Default: FC<IProps> = ({ className, children, type = "default", ...other }) => {
    return (
        <Pressable
            className={`px-6 py-2 rounded-full bg-primary-2 shadow shadow-neutral-8
            ${className}`}
            {...other}
        >
            {typeof children === "string" ? (
                <Text className="text-neutral-0 font-semibold">{children}</Text>
            ) : (
                children
            )}
        </Pressable>
    );
};

const Outlined: FC<IProps> = ({ className, children, type = "default", ...other }) => {
    return (
        <Pressable
            className={`px-6 py-2 rounded-full border border-neutral-4 bg-neutral-0
            ${className}`}
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
