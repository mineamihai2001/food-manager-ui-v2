import { useColorScheme } from "react-native";
import { Colors } from "./types/colors";
import { darkColors } from "./dark.colors";
import { lightColors } from "./light.colors";

export function useColors(): Colors {
    const colorsScheme = useColorScheme();

    return colorsScheme === "dark" ? darkColors : lightColors;
}
