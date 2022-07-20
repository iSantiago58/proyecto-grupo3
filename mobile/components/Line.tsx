import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import {Dimensions} from "react-native";
import colors from "../constants/colors";

const Line = (props: SvgProps) => {
    const width = Dimensions.get("window").width - 48
    return (
        <Svg width={width} height={2} {...props}>
            <Path stroke= {colors.primary}  d="M0 1h400" />
        </Svg>
    )
}

export default Line