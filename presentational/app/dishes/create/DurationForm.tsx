import { Dispatch, FC, SetStateAction } from "react";
import { View, Text } from "react-native";
import { Input } from "../../../components";
import { HelperText } from "react-native-paper";

interface IProps {
    hours: string;
    setHours: Dispatch<SetStateAction<string>>;
    minutes: string;
    setMinutes: Dispatch<SetStateAction<string>>;
    error: boolean;
}

export const DurationForm: FC<IProps> = ({ hours, minutes, setHours, setMinutes, error }) => {
    return (
        <View className="flex justify-center items-start">
            <View className="flex flex-row">
                <Text className={`font-bold`}>Duration</Text>
                <Text className={`font-bold text-danger-2`}>*</Text>
            </View>
            <View
                className="flex flex-row justify-start items-start"
                style={{
                    gap: 2,
                }}
            >
                <Input
                    value={hours}
                    onChangeText={setHours}
                    placeholder="Hours"
                    keyboardType="numeric"
                    className="w-20 rounded-r-none"
                />
                <Input
                    value={minutes}
                    onChangeText={setMinutes}
                    placeholder="Min"
                    keyboardType="numeric"
                    className="w-20 rounded-l-none"
                />
            </View>
            <HelperText type="error" visible={error}>
                Hours/minutes are required
            </HelperText>
        </View>
    );
};
