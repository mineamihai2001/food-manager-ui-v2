import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Button, IconButton } from "../../presentational/components/button";
import { useColorScheme } from "nativewind";
import { FC } from "react";
import { inject, observer } from "mobx-react";
import { GlobalStore } from "../../infrastructure/store";
import { Feather } from "@expo/vector-icons";
import { useColors } from "../../infrastructure/hooks";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IProps {
    globalStore?: GlobalStore;
}

const App: FC<IProps> = inject("globalStore")(
    observer(({ globalStore }: IProps) => {
        const { colorScheme, toggleColorScheme } = useColorScheme();
        const colors = useColors();

        return (
            <View className="h-full flex justify-center items-center">
                <Text className="text-2xl">Your Kitchen</Text>
                <View className="h-24 w-full flex flex-row gap-2 justify-center items-center">
                    <Text className="text-xl font-bold text-neutral-6">
                        {"#" + globalStore?.kitchen.id}
                    </Text>
                    <IconButton
                        icon={() => <Feather name="copy" size={20} color={colors.neutral[6]} />}
                        className="bg-transparent p-0 m-0"
                        onPress={async () =>
                            await Clipboard.setStringAsync(globalStore?.kitchen.id ?? "")
                        }
                    />
                </View>
                {/* <View
                    className="flex flex-row"
                    style={{
                        gap: 10,
                    }}
                >
                    <Button disabled onPress={() => AsyncStorage.clear()}>
                        Default
                    </Button>
                    <Button mode="outlined" onPress={toggleColorScheme}>
                        Outlined
                    </Button>
                </View> */}
                <StatusBar style="auto" />
            </View>
        );
    })
);

export default App;
