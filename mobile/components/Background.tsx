import Svg, { Rect, SvgProps } from "react-native-svg"
import React from "react"

interface Props extends SvgProps {
    topColor: string
    bottomColor: string
}

const Background = ({ topColor, bottomColor, width, height }: Props) => (
    <Svg width={width || "100%"} height={height || "100%"}>
        <Rect x="0" y="56" width="100%" height="100%" fill={bottomColor} />
        <Rect x="0" y="40" width="100%" height="50%" fill={topColor} />
    </Svg>
)

export default Background