import Rect from "react"
import {StyleSheet, Text} from "react-native"
import colors from "../../constants/colors"
import React from "react"


export interface HeadlineProps {
    children: React.ReactNode
    color?: string
    fontSize?: number
    lineHeight?: number
    textAlign?: "auto" | "left" | "right" | "center",
    numberOfLines?: number
    bold?: boolean
}

const H1 = (props: HeadlineProps) => <Text style={styles(props).headline} allowFontScaling={false} numberOfLines={props.numberOfLines ? props.numberOfLines : 1}>{props.children}</Text>

const styles = (props:HeadlineProps) => {
    return StyleSheet.create({
        headline:{
            color: props.color || colors.black,
            fontSize: props.fontSize || 30,
            lineHeight: props.lineHeight || 32,
            textAlign: props.textAlign || "auto",
            fontWeight: props.bold ? 'bold' : "normal"

        }
    })
}

export default H1