import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const BookingSvg = (props: SvgProps) => (
    <Svg
        width={24}
        height={25}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        viewBox="0 0 19 20"
    >
        <Path
            d="M4.2 9h2v2h-2V9Zm14-5v14c0 1.1-.9 2-2 2h-14a2 2 0 0 1-2-2L.21 4c0-1.1.88-2 1.99-2h1V0h2v2h8V0h2v2h1c1.1 0 2 .9 2 2Zm-16 2h14V4h-14v2Zm14 12V8h-14v10h14Zm-4-7h2V9h-2v2Zm-4 0h2V9h-2v2Z"
           fill={props.color || "#B3B0D2"}
        />
    </Svg>
)

export default BookingSvg
