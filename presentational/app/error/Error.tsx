import { FC } from "react";
import { Text, View } from "react-native";

interface IProps {
    error: Error;
}

const Error: FC<IProps> = ({ error }) => {
    return (
        <View className="flex flex-1 justify-center items-center">
            <Text>Error:</Text>
            <Text>{error.message}</Text>
        </View>
    );
};

export default Error;
