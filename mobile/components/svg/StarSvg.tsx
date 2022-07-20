import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const StarSvg = (props: SvgProps) => (
    <Svg
        width={props.width || 22}
        height={props.height || 21}
        viewBox="0 0 29 28"
        fill="none"
        {...props}
    >
        <Path
            d="M14.987 1.557a.971.971 0 0 0-1.65 0L9.152 8.291a.486.486 0 0 1-.296.215l-7.698 1.901a.971.971 0 0 0-.51 1.569l5.11 6.062a.486.486 0 0 1 .114.348l-.571 7.91a.971.971 0 0 0 1.334.969l7.345-2.987a.486.486 0 0 1 .366 0l7.345 2.987a.971.971 0 0 0 1.335-.97l-.571-7.909a.485.485 0 0 1 .113-.348l5.11-6.062a.971.971 0 0 0-.51-1.569L19.47 8.506a.485.485 0 0 1-.296-.215l-4.187-6.734Z"
            fill={ props.color || "#fff" }
            stroke={ props.color || "#fff"}
            strokeWidth={0.486}
        />
    </Svg>
)

export default StarSvg
