import { router, useLocalSearchParams } from "expo-router";
import { FC } from "react";
import { Text, View } from "react-native";
import { AppError } from "../../infrastructure/error";
import { Button } from "../../presentational/components";

interface IProps {}

const Error: FC<IProps> = ({}) => {
    const error = useLocalSearchParams() as unknown as AppError;

    return (
        <View className="flex flex-1 justify-center items-center bg-neutral-0 gap-5">
            <Text className="text-3xl font-semibold">Error</Text>
            <View className="">
                <View className="flex justify-center items-start">
                    <View className="flex flex-row justify-center items-center">
                        <Text>Message: </Text>
                        <Text className="font-semibold">
                            {error?.message ?? "Unexpected error"}
                        </Text>
                    </View>
                    <View className="flex flex-row justify-center items-center">
                        <Text>Description: </Text>
                        <Text className="font-semibold">
                            {error?.description ?? "unexpected_error"}
                        </Text>
                    </View>
                    <View className="flex flex-row justify-center items-center">
                        <Text>Data: </Text>
                        <Text className="font-semibold">{JSON.stringify(error?.data ?? {})}</Text>
                    </View>
                </View>
                <View className="flex justify-center items-center mt-4">
                    <Button
                        mode="outlined"
                        onPress={() => {
                            try {
                                router.back();
                            } catch (_) {
                                router.replace("/");
                            }
                        }}
                    >
                        Go back
                    </Button>
                </View>
            </View>
        </View>
    );
};

export default Error;
