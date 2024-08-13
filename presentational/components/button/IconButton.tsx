import { FC, forwardRef } from "react";
import { Pressable, PressableProps, Text } from "react-native";
import { IconButton as PaperIconButton } from "react-native-paper";
import { useColors } from "../../../infrastructure/hooks";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { Props as IconButtonProps } from "react-native-paper/lib/typescript/components/IconButton/IconButton";

type IProps = {
    className?: string;
    mode?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
} & IconButtonProps;

export const IconButton: React.ForwardRefExoticComponent<
    Omit<IProps, "ref"> & React.RefAttributes<unknown>
> = forwardRef((props: IProps, ref) => {
    const { mode = "contained" } = props;
    return mode === "contained" ? <Default {...props} /> : <Outlined {...props} />;
});

const Default: FC<IProps> = ({ className, ...other }) => {
    const colors = useColors();

    return (
        <PaperIconButton
            mode="contained"
            containerColor={colors.neutral[0]}
            className={`rounded-md  ${className}`}
            style={Object.assign({}, { borderColor: colors.neutral[0] }, other.style)}
            {...other}
        ></PaperIconButton>
    );
};

const Outlined: FC<IProps> = ({ className, ...other }) => {
    const colors = useColors();

    return (
        <PaperIconButton
            mode="outlined"
            containerColor={colors.neutral[0]}
            className={`rounded-md border-2 border-neutral-10 ${className}`}
            style={Object.assign({}, { borderColor: colors.neutral[10] }, other.style)}
            {...other}
        ></PaperIconButton>
    );
};
