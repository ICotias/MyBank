import { View, ColorValue } from "react-native";

import { styles } from "@/components/Separator/styles";

export function Separator({ color }: { color: ColorValue }) {
  return <View style={[styles.container, { backgroundColor: color }]} />;
}
