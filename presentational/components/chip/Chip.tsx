import { FC } from "react";
import { View } from "react-native";

interface IProps {
    children?: React.ReactNode;
    className?: string;
}

export const Chip: FC<IProps> = ({ children, className }) => {
    return (
        <View
            className={`
        bg-neutral-3 px-4 py-1 rounded-full
        
        ${className}`}
        >
            {children}
        </View>
    );
};
