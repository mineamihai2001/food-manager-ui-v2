import { FC } from "react";
import { View, Text } from "react-native";
import { Chip as PaperChip } from "react-native-paper";
import { Props as ChipProps } from "react-native-paper/lib/typescript/components/Chip/Chip";

type IProps = {
    children?: React.ReactNode;
    className?: string;
} & ChipProps;

export const Chip: FC<IProps> = ({ children, className, ...other }) => {
    return (
        <PaperChip
            className={`bg-neutral-3 rounded-full
                        ${className}`}
            {...other}
        >
            {typeof children === "string" ? <Text>{children}</Text> : children}
        </PaperChip>
    );
};
