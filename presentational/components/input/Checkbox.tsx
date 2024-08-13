import { FC } from "react";
import { Checkbox as PaperCheckbox } from "react-native-paper";
import { Props as CheckboxProps } from "react-native-paper/lib/typescript/components/Checkbox/Checkbox";
import { useColors } from "../../../infrastructure/hooks";

type IProps = {} & CheckboxProps;

export const Checkbox: FC<IProps> = ({ ...other }) => {
    const colors = useColors();

    return <PaperCheckbox {...other} color={colors.neutral[10]}></PaperCheckbox>;
};
