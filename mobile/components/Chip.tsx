import React from "react"
import {View,StyleSheet} from "react-native";
import colors from "../constants/colors";
import H1 from "./headline/H1";

interface Props {
    text: string
}

const Chip = ({text} : Props) => {

    return (
        <View style={styles.wrapper} >
            <H1 fontSize={15} lineHeight={20} textAlign={"center"}>{text}</H1>
        </View>
    )

}
const styles = StyleSheet.create({
    wrapper: {
        backgroundColor:colors.white,
        alignSelf: 'center',
        paddingHorizontal: 12,
        paddingVertical:5,
        borderRadius:20,
        borderWidth:1
    }

})

export default Chip