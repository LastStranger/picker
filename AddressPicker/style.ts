import { StyleSheet } from "react-native";
import { COLORS, commonStyles } from "../../../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        // backgroundColor: "blue",
    },
    centerLine: {
        position: "absolute",
        // alignSelf: "center",
        width: "100%",
        top: "50%",
        height: 1,
        backgroundColor: "red",
    },
    iconContainer: {
        marginLeft: 8,
    },
    pickerWrp: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
        height: 250,
        // width: 375,
        // backgroundColor: "blue",
    },
    opacityWrp: {
        height: 100,
        width: "100%",
        backgroundColor: "#FFFFFF",
        position: "absolute",
        top: 0,
        left: 0,
        opacity: 0.8,
        zIndex: 10,
    },
    opacityWrpDown: {
        height: 100,
        width: "100%",
        backgroundColor: "#FFFFFF",
        position: "absolute",
        bottom: 0,
        left: 0,
        opacity: 0.8,
        zIndex: 10,
    },
    picker: {
        minWidth: "34%",
        // width: "30%",
        padding: 0,
        margin: 0,
    },
    pickerText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#282828",
        lineHeight: 25,
    },
    sectionLine: {
        position: "absolute",
        top: 100,
        width: "100%",
        flex: 1,
        height: 50,
        backgroundColor: "rgba(255, 229, 120, 0.4)",
        zIndex: -1,
    },
    footer: {
        paddingTop: 49,
        paddingBottom: 30,
        alignItems: "center",
    },
    btnWrp: {
        width: 126,
        height: 40,
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        ...commonStyles.center,
    },
    btnText: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.black,
        lineHeight: 20,
    },
});
export default styles;
