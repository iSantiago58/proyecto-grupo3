import React from "react"
import H1, {HeadlineProps} from "./H1"

const H6 = (props: HeadlineProps) => (
    <H1 color={props.color} lineHeight={25} fontSize={21} textAlign={props.textAlign}>
        {props.children}
    </H1>

)
export default H6