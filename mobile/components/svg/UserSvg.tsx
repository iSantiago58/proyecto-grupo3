import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const UserSvg = (props: SvgProps) => (
    <Svg
        width={props.width || 25}
        height={props.height || 24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        viewBox="0 0 21 20"
    >
        <Path
            d="M10.8 0C5.28 0 .8 4.48.8 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10ZM5.87 16.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78A7.893 7.893 0 0 1 10.8 18c-1.86 0-3.57-.64-4.93-1.72Zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33A7.95 7.95 0 0 1 2.8 10c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83ZM10.8 4C8.86 4 7.3 5.56 7.3 7.5S8.86 11 10.8 11s3.5-1.56 3.5-3.5S12.74 4 10.8 4Zm0 5c-.83 0-1.5-.67-1.5-1.5S9.97 6 10.8 6s1.5.67 1.5 1.5S11.63 9 10.8 9Z"
            fill={props.color || "#B3B0D2"}
        />
    </Svg>
)

export default UserSvg