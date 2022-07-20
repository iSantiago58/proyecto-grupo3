import Svg, { Path, SvgProps } from "react-native-svg"
import * as React from "react"

const SvgIconClose = (props: SvgProps) => (
    <Svg width={props.width || 33} height={props.height || 32} fill="none" viewBox="0 0 33 32">
        <Path
            d="M16.1 29.333c7.341 0 13.292-5.97 13.292-13.333 0-7.364-5.951-13.333-13.292-13.333C8.76 2.667 2.81 8.637 2.81 16c0 7.364 5.95 13.333 13.291 13.333Z"
            fill={props.fill}
            fillOpacity={props.fillOpacity || 1}
        />
        <Path
            d="m20.088 12-7.975 8M12.113 12l7.975 8"
            stroke={props.stroke}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)
export default SvgIconClose