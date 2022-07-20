import React, {useEffect, useState} from "react"
import {View, StyleSheet} from "react-native"
import H1 from "../components/headline/H1"
import colors from "../constants/colors"
import Input from "../components/textInput/Input"
import {useForm} from "react-hook-form"
import FormContainer from "../components/form/FormContainer"
import {PrimaryButton} from "../components/button/PrimaryButton"
import {PasswordRules} from "../components/textInput/inputRules"
import {showMessage} from "react-native-flash-message"
import {useMutation} from "react-query"
import AuthenticateService from "../services/AuthenticateService"
import {useAtom} from "jotai";
import {userAlias} from "../appState/atoms"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import VerticalSeparator from "../components/VerticalSeparator"

export interface resetPassword {
    alias: string,
    oldPassword: string
    newPassword: string
}

const ResetPassword = () => {
    const [alias] = useAtom(userAlias)
    const {control, handleSubmit, formState: { errors }} = useForm()
    const {mutateAsync, error} = useMutation("resetPassword",(payload: resetPassword) => AuthenticateService.changePasswordReset(payload))
    const [isRequestOnFlight, setIsRequestOnFlight] = useState<boolean>(false)
    const [scrollEnabled, setScrollEnabled] = useState<boolean>(false)
    const [contentHeight, setContentHeight] = useState<number>(0)
    const [scrollViewHeight, setScrollViewHeight] = useState<number>(0)

    const resetPassword = async ({old_password, new_password, repeat_password}: { old_password: string, new_password: string, repeat_password: string }) => {
        setIsRequestOnFlight(true)
        if (new_password !== repeat_password) {
            showMessage({
                message: "Las contraseñas no coinciden",
                type: "danger",
            })
            return
        } else {

            const payload: resetPassword = {
                alias: alias,
                oldPassword: old_password,
                newPassword: new_password
            }
            const response = await mutateAsync(payload)
            showMessage({
                message: response.mensaje,
                type: "success",
            })
        }
        setIsRequestOnFlight(false)
    }

    useEffect(()=>{
        if(error){
            showMessage({
                message: error.mensaje,
                type: "danger"})
        }
    },[error])

    return (
        <KeyboardAwareScrollView  style={{backgroundColor: colors.white}}
                                 onLayout={(event) => setScrollViewHeight(event.nativeEvent.layout.height)}
                                 onContentSizeChange={(w, h) => setContentHeight(h)}
                                 scrollEnabled={scrollEnabled}>
            <View style={styles.headerContainer}>
                <H1 color={colors.white} fontSize={24}>Cambiar Contraseña</H1>
            </View>
            <View style={{paddingHorizontal: 24, flex:1}}>
                <FormContainer>
                    <Input label={"Contraseña anterior"}
                           errors={errors}
                           name={"old_password"}
                           control={control}
                           placeholder={"Ingresar contraseña anterior"}
                           rules={{required: {
                            value: true,
                            message: "Ingresar contraseña"
                        },
                        ...PasswordRules}}/>
                    <Input label={"Contraseña nueva"}
                           errors={errors}
                           name={"new_password"}
                           control={control}
                           rules={{required: {
                                   value: true,
                                   message: "Ingresar contraseña"
                               },
                               ...PasswordRules}}
                           placeholder={"Ingresar contraseña nueva"} />
                    <Input label={"Repetir contraseña"}
                           name={"repeat_password"}
                           control={control}
                           errors={errors}
                           rules={{required: {
                                   value: true,
                                   message: "Ingresar contraseña"
                               },
                               ...PasswordRules}}
                           placeholder={"Repetir contraseña"}/>
                </FormContainer>
                <VerticalSeparator height={50}/>
                <View style={styles.buttonContainer}>
                    <PrimaryButton disabled={isRequestOnFlight} text={"Aceptar"} onPress={handleSubmit(resetPassword)}/>
                </View>

            </View>

        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 70,
        backgroundColor:colors.primary,
        justifyContent:"flex-end",
        paddingBottom:15,
        paddingHorizontal: 24
    },
    buttonContainer: {
        flex:1,
        justifyContent:"flex-end",
        marginBottom: 20
    }
})

export default ResetPassword