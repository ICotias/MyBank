import { View, Text } from "react-native";
import Input, { CurrencyInputProps } from "react-native-currency-input";

import { styles } from "@/components/Input/style";
import { colors } from "@/theme";

type Props = CurrencyInputProps & {
  label: string;
};

export function CurrencyInput({ label, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Input
        style={styles.input}
        placeholderTextColor={colors.gray[400]}
        precision={2}
        prefix="R$"
        delimiter="."
        separator=","
        minValue={0}
        {...rest}
      />
    </View>
  );
}
