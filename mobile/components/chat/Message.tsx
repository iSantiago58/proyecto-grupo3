import React, {useEffect, useRef} from "react";
import {Text, View, StyleSheet} from "react-native";
import H1 from "../headline/H1";
import colors from "../../constants/colors";
import Body from "../body/Body";

const Message = ({msg, userLog}) => {
    const ownMessage = msg.de === userLog

    return(
        <View style={styles(ownMessage).wrapper}>
            <Body fontSize={16} lineHeight={20} color={colors.white}>{msg.texto}</Body>
        </View>
    )
}

const styles = (own: boolean) =>  StyleSheet.create({
    wrapper: {
        backgroundColor: own ? colors.primary : colors.secondary,
        alignSelf: own ? "flex-end": "flex-start",
        margin: 5,
        paddingHorizontal:15,
        paddingVertical: 15,
        borderRadius: 15,
        maxWidth: 250
    }
})

export default Message