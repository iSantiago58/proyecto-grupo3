import React, { ReactElement } from "react"
import {TouchableOpacity, View, StyleSheet} from "react-native";
import HorizontalSeparator from "./HorizontalSeparator";
import H1 from "./headline/H1";
import SvgArrow from "../assets/svg/arrow.svg";

interface  Props {
    icon: ReactElement
    text: string
    onPress: ()=> void
}

const ListItemWithArrow = (props : Props) => {

    return (
        <TouchableOpacity style={styles.wrapper} onPress={props.onPress}>
            <View style={styles.textContainer}>
                {props.icon}
                <HorizontalSeparator width={15}/>
                <H1 fontSize={18}>{props.text}</H1>
            </View>
            <View style={{alignSelf:"center"}}>
                <SvgArrow/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        paddingHorizontal: 24,
        justifyContent:"space-between",
        height:44,
        marginVertical:10
    },
    textContainer: {
        flexDirection:"row",
        alignItems:"center"
    }
})

export default ListItemWithArrow


