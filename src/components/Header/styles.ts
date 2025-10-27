import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/theme";

export default StyleSheet.create({
    container:{        
        width:"100%",
        height:324,
        paddingHorizontal:24,
        gap:24,
        paddingBottom:18,
        justifyContent:"flex-end",
    },
    label:{
        color:colors.white,
        fontSize:12,
        fontFamily:fontFamily.regular ,
    },
    total:{
        color:colors.white,
        fontSize:32,
        fontFamily:fontFamily.medium ,
    },
    summary:{
        
        width:"100%",
        gap:12,
        flexDirection:"row",
        justifyContent:"space-between"
    },
})