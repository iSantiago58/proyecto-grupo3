import React from "react"
import colors from "../../constants/colors"
import {StyleSheet, Text, TouchableOpacity, TouchableOpacityProps} from "react-native";

export enum ButtonSize {
    BIG,
    SMALL
}

interface ButtonProps extends TouchableOpacityProps{
    text: string,
    disabled?: boolean,
    backgroundColor?: string,
    fontSize?: number,
    color?: string,
    size?: ButtonSize
}

export const PrimaryButton = (props: ButtonProps) => (
    <TouchableOpacity disabled={props.disabled} style={styles(props).button} onPress={ props.onPress}>
        <Text style={styles(props).text}>{props.text}</Text>
    </TouchableOpacity>
)

const styles = (props: ButtonProps) => {
    return StyleSheet.create({
        button: {
            width: "100%",
            borderRadius: 7,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: props.disabled ? colors.grey60 : colors.primary,
            height: 44
        },
        text: {
            color: colors.white,
            fontSize: 15,
            lineHeight: 18
        }
    })
}