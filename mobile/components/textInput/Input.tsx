import React, { useState } from "react"
import {
    Text,
    TextInputAndroidProps,
    TextInputIOSProps,
    TextInputProps,
    View,
    StyleSheet,
    TextInput,
    Keyboard
} from "react-native"
import { Control, Controller, FieldErrors } from "react-hook-form"
import colors from "../../constants/colors";
import {TextInputMask, TextInputMaskOptionProp} from "react-native-masked-text";

export interface InputProps extends TextInputProps, TextInputIOSProps, TextInputAndroidProps {
    name: string
    label?: string
    onChange?: (e) => void
    control: Control
    disabled?: boolean
    isPassword?: boolean
    errors?: FieldErrors
    rules?: Object
    errorFieldText?: string
    mask?: "date"| "phone" | "number"
}

const Input = (props: InputProps) => {
    const option: TextInputMaskOptionProp = !!props.mask && props.mask == "date" ? {format: "DD/MM/YYYY"}
        : props.mask=="phone" ? { mask: "999999999"} : { mask: "9"}

    return (
        <>
        <Controller
            name={props.name}
            control={props.control}
            rules={props.rules}
            defaultValue={props.defaultValue}
            render={({field: {onChange, value}})  => {
                const [isFocused, setIsFocused] = useState<boolean>(false)

                return (
                    <>
                        { props.label &&
                            <View style={styles(isFocused).label}>
                                <Text style={{color: isFocused ? colors.blue : colors.black }}>{props.label}</Text>
                            </View>
                        }
                        {!!props.mask ? (
                            <TextInputMask
                                type={props.mask === "date" ? "datetime" : "custom"}
                                options={option}
                                value={value}
                                style={styles(isFocused).input}
                                onChangeText={(value: string) => onChange(value)}
                                onChange={props.onChange}
                                numberOfLines={props.multiline ? 5 : 1}
                                onBlur={() => setIsFocused(false)}
                                onFocus={() => setIsFocused(true)}
                                placeholder={props.placeholder}
                                secureTextEntry={!!props.isPassword}
                                placeholderTextColor={props.disabled ? colors.grey1 : colors.grey60}
                                keyboardType={props.keyboardType}
                                defaultValue={props.defaultValue}
                            />
                        ): (
                            <TextInput
                                blurOnSubmit={false}
                                onChangeText={(value: string) => onChange(value)}
                                onChange={props.onChange}
                                style={styles(isFocused).input}
                                value={value}
                                numberOfLines={props.multiline ? 5 : 1}
                                onBlur={() => setIsFocused(false)}
                                onFocus={() => setIsFocused(true)}
                                placeholder={props.placeholder}
                                secureTextEntry={!!props.isPassword}
                                placeholderTextColor={props.disabled ? colors.grey1 : colors.grey60}
                                keyboardType={props.keyboardType}
                                defaultValue={props.defaultValue}
                                onSubmitEditing={ ()=> Keyboard.dismiss()}
                                multiline={props.multiline}
                            />
                        )}
                    </>
                )
            }}
        />
        {props.errors !== undefined
            && Object.getOwnPropertyNames(props.errors).length>0 && props.errors[props.name] !== undefined
            && <Text  style={{marginTop:3, color:"red"}}>{props.errors[props.name].message}</Text>}
        </>
    )
}

const styles = (isFocused: boolean) => StyleSheet.create({
    label: {
        marginBottom:5
    },
    input:{
        borderWidth:1,
        minHeight: 40,
        borderRadius: 5,
        paddingLeft: 5,
        color: colors.black,
        borderColor: isFocused ? colors.blue : colors.black
    }
})

export default Input