import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const ArrowBackSvg = (props: SvgProps) => (
    <Svg
        width={17}
        height={16}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="m8.307 15.873.715-.715a.434.434 0 0 0 0-.614L3.417 8.94h12.336c.24 0 .434-.194.434-.433V7.494a.434.434 0 0 0-.434-.433H3.417l5.605-5.606a.434.434 0 0 0 0-.613L8.307.127a.434.434 0 0 0-.614 0L.127 7.693a.434.434 0 0 0 0 .614l7.566 7.566c.17.17.444.17.614 0Z"
            fill={props.color || "#fff"}
        />
    </Svg>
)

export default ArrowBackSvg
