import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/theme";

export const styles = StyleSheet.create({
    container: {
        gap: 10,
        width: "100%",
    },
    label: {
        fontSize: 12,
        color: colors.gray[500],
        fontFamily: fontFamily.medium,
    },
    input: {
        fontSize: 16,
        paddingBottom: 12,
        color: colors.black,
        borderBottomWidth: 1,
        fontFamily: fontFamily.regular,
        borderBottomColor: colors.gray[400],
    },
});