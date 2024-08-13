import { ElementRef, FC, forwardRef } from "react";
import { Pressable, PressableProps, StyleProp, Text, View, ViewStyle } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { useColors } from "../../../infrastructure/hooks";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { Props as ButtonProps } from "react-native-paper/lib/typescript/components/Button/Button";

type IProps = {
    className?: string;
    children?: React.ReactNode;
    mode?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
    icon?: IconSource;
} & ButtonProps;

export const Button: FC<IProps> = forwardRef((props: IProps, ref) => {
    const { mode: type = "contained" } = props;
    return type === "contained" ? <Default {...props} /> : <Outlined {...props} />;
});

const Default: FC<IProps> = ({ className, children, ...other }) => {
    const colors = useColors();

    return (
        <PaperButton
            className={`rounded-md border-2 ${className}`}
            buttonColor={colors.neutral[0]}
            textColor={colors.neutral[10]}
            mode="contained"
            style={Object.assign({}, { borderColor: colors.neutral[0] }, other.style)}
            {...(other as any)}
        >
            {typeof children === "string" ? <Text className="">{children}</Text> : children}
        </PaperButton>
    );
};

const Outlined: FC<IProps> = ({ className, children, ...other }) => {
    const colors = useColors();

    return (
        <PaperButton
            className={`rounded-md border-2 border-neutral-10 ${className}`}
            buttonColor={colors.neutral[0]}
            textColor={colors.neutral[10]}
            mode="outlined"
            style={Object.assign({}, { borderColor: colors.neutral[10] }, other.style)}
            {...(other as any)}
        >
            {typeof children === "string" ? (
                <Text className="text-neutral-8 font-semibold">{children}</Text>
            ) : (
                children
            )}
        </PaperButton>
    );
};
