import React from "react"
import {StyleSheet, Text} from "react-native"
import colors from "../../constants/colors"

export interface BodyProps {
    children: React.ReactNode
    color?: string
    fontSize?: number
    textAlign?: "auto" | "left" | "right" | "center"
    numberOfLines?: number
    lineHeight?: number
}

const Body = (props: BodyProps) => (
    <Text style={styles(props).body} {...props} numberOfLines={props.numberOfLines}>{props.children}</Text>
)

const styles = (props: BodyProps) => {
    return StyleSheet.create({
        body: {
            color: props.color || colors.black,
            fontSize: props.fontSize || 18,
            lineHeight: props.lineHeight || 25,
            textAlign: props.textAlign || "auto",
        }
    })
}

export default Body