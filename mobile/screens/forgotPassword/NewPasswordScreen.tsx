import React from "react"
import { StyleSheet, View } from "react-native";
import colors from "../../constants/colors";
import Input from "../../components/textInput/Input";
import FormContainer from "../../components/form/FormContainer";
import { PasswordRules } from "../../components/textInput/inputRules";
import { useForm } from "react-hook-form";
import H1 from "../../components/headline/H1";
import VerticalSeparator from "../../components/VerticalSeparator";
import { PrimaryButton } from "../../components/button/PrimaryButton";
import { useMutation } from "react-query";
import AuthenticateService from "../../services/AuthenticateService";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";

export interface ChangePasswordPayload {
    email: string
    password: string
    code: string
}

const NewPasswordScreen = ({route}: any) => {
    const { email, code } = route.params
    const { control, handleSubmit, formState: { errors } } = useForm()
    const navigation = useNavigation()
    const { mutateAsync } = useMutation("new_password", ( payload: ChangePasswordPayload) =>
        AuthenticateService.changePassword(payload))

    const sendPassword = async ({password, repeatPassword}: {password: string, repeatPassword: string}) => {
        if(password === repeatPassword){
            const payload = {
                password: password,
                email: email,
                code: code
            }
            const response = await mutateAsync(payload)
            if(response == 200){
                showMessage({
                    message: "Se cambió la contraseña correctamente",
                    type: "success"})

                navigation.navigate("Tab", { screen: "Login"})
            }
        }else{
            showMessage({
                message: "Las contraseñas no coinciden",
                type: "danger"})
            return
        }
    }

    return (
        <View style={styles.wrapper}>
            <H1>Cambiar contraseña</H1>
            <VerticalSeparator height={30}/>
            <FormContainer>
                <Input name={"password"}
                       placeholder={"Ingrese contraseña"}
                       control={ control }
                       label={"Contraseña"}
                       errors={errors}
                       isPassword={true}
                       rules={PasswordRules}
                       errorFieldText={"Ingresar contraseña"}/>
                <Input name={"repeatPassword"}
                       placeholder={"Repite la contraseña"}
                       control={ control } label={"Repetir contraseña"}
                       errors={errors}
                       isPassword={true}
                       errorFieldText={"Ingresar contraseña"}/>
            </FormContainer>
            <View style={styles.btn}>
                <PrimaryButton text={"Enviar"} onPress={handleSubmit(sendPassword)}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        backgroundColor: colors.white,
        flex: 1,
        paddingHorizontal: 24
    },
    btn: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 35
    }
})

export default NewPasswordScreen