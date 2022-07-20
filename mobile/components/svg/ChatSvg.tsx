import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const ChatSvg = (props: SvgProps) => (
    <Svg
        width={25}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        viewBox="0 0 21 20"
    >
        <Path
            d="M13.4 2v7H3.57l-.59.59-.58.58V2h11Zm1-2h-13C.85 0 .4.45.4 1v14l4-4h10c.55 0 1-.45 1-1V1c0-.55-.45-1-1-1Zm5 4h-2v9h-13v2c0 .55.45 1 1 1h11l4 4V5c0-.55-.45-1-1-1Z"
            fill={props.color || "#B3B0D2"}
        />
    </Svg>
)

export default ChatSvg
