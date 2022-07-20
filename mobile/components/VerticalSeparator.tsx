import {View} from "react-native"
import React from "react"

interface Props {
    height: number | string
}

const VerticalSeparator = ({height}: Props) => <View style={{height: height}}/>
export default VerticalSeparator