import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const SearchSvg = (props: SvgProps) => (
    <Svg
        width={25}
        height={26}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        viewBox="0 0 19 18"
    >
        <Path
            d="M13.1 11h-.79l-.28-.27A6.471 6.471 0 0 0 13.6 6.5 6.5 6.5 0 1 0 7.1 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L18.09 16l-4.99-5Zm-6 0c-2.49 0-4.5-2.01-4.5-4.5S4.61 2 7.1 2s4.5 2.01 4.5 4.5S9.59 11 7.1 11Z"
            fill={props.color || "#B3B0D2"}
        />
    </Svg>
)

export default SearchSvg
