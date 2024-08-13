import { FC, useState } from "react";
import { View, Image, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button } from "../../../components";
import { Feather } from "@expo/vector-icons";
import { useColors } from "../../../../infrastructure/hooks";

interface IProps {}

export const ImagesForm: FC<IProps> = () => {
    const colors = useColors();
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
            base64: true,
        });

        console.log(result.assets?.at(0)?.base64);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View className="z-[-10]">
            <View className="flex flex-row">
                <Text className={`font-bold`}>Images</Text>
            </View>
            <Button
                onPress={pickImage}
                icon={() => <Feather name="upload" size={20} color={colors.neutral[8]} />}
            >
                Import
            </Button>
            {image && <Image source={{ uri: image }} />}
        </View>
    );
};
