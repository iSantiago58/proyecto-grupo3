import React from "react"
import {View} from "react-native"
import H1 from "./headline/H1"
import colors from "../constants/colors"

interface Props {
    type: "PENDIENTE" | "CANCELADA" | "ACEPTADA" | "RECHAZADA"
}

const BookingStatusChip = (props: Props) => {
    const color = props.type === "PENDIENTE" ? "rgb(255, 191, 0)" : (props.type === "CANCELADA" || props.type === "RECHAZADA") ? 'rgb(255, 133, 102)' : "rgb(112, 219, 112)"
    return (
        <View style={{backgroundColor: color, borderRadius: 20, paddingVertical:3, alignItems: "center",marginTop: 10 }}>
            <H1 fontSize={16} lineHeight={20} color={colors.white}>{props.type}</H1>
        </View>
    )
}

export default BookingStatusChip