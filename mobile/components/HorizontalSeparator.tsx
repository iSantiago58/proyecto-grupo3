import {View} from "react-native"
import React from "react"

interface Props {
    width: number | string
}

const HorizontalSeparator = ({width}: Props) => <View style={{width: width}}/>
export default HorizontalSeparator