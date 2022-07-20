import React, {useEffect, useState} from "react"
import {StyleSheet, TouchableOpacity, View} from "react-native"
import colors from "../constants/colors"
import FormContainer from "../components/form/FormContainer"
import { useMutation } from "react-query"
import AuthenticateService from "../services/AuthenticateService"
import { useNavigation } from "@react-navigation/native"
import H1 from "../components/headline/H1"
import VerticalSeparator from "../components/VerticalSeparator"
import Body from "../components/body/Body"
import Input from "../components/textInput/Input"
import { PrimaryButton } from "../components/button/PrimaryButton"
import { useForm } from "react-hook-form"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { showMessage } from "react-native-flash-message"
import {DateRules, EmailRules, OnlyLettersRules, PasswordRules} from "../components/textInput/inputRules"
import SvgGenericAvatar from "../components/svg/GenericAvatar";
import SvgWomanAvatar from "../components/svg/WomanAvatar";
import SvgManAvatar from "../components/svg/ManAvatar";

export interface Authenticate {
    alias: string,
    email: string,
    password: string
    name: string,
    lastName: string
    phone: string
    birthday: string
    picture?: string
}

const SignUpScreen = () => {
    const navigation = useNavigation()
    const {mutateAsync, error} = useMutation("signup",(payload: Authenticate) => AuthenticateService.signup(payload))
    const {control, handleSubmit, formState: { errors }} = useForm()
    const [userIcon, setUserIcon] = useState("2")

    useEffect(()=>{
        if(error){
          showMessage({
           message: error.mensaje,
              type: "danger"})
        }
    },[error])

    const signUp = async ({ alias, email, password, username, lastName, phone, birthday, repeatPassword } :
                              {alias: string, email: string, password: string, username: string, lastName: string, phone: string, birthday: string, repeatPassword: string}) => {
        const payload: Authenticate = {
            alias: alias,
            email: email,
            password: password,
            name: username,
            lastName: lastName,
            phone: phone,
            birthday: birthday,
            picture: userIcon
        }
        if(password !== repeatPassword) {
            showMessage({
                message: "Las contraseñas no coinciden",
                type: "danger",
            })
            return
        }else{
            const auth = await mutateAsync(payload)
            if(auth===201) {
                showMessage({
                    message: "Usuario creado exitosamente",
                    type: "success",
                })

                navigation.goBack()
            }
        }
    }

    return (
        <KeyboardAwareScrollView style={styles.wrapper}>
            <H1>Registro</H1>
            <VerticalSeparator height={25}/>
            <Body color={colors.grey1}>Regístrate para planificar tu próximo viaje </Body>
            <FormContainer>
                <Input name={"alias"}
                       placeholder={"Ingrese alias"}
                       control={ control }
                       label={"Alias"}
                       errors={errors}
                       rules={{required: {
                               value: true,
                               message: "Ingresar alias"
                           }}}/>
                <Input name={"username"}
                       placeholder={"Ingrese nombre"}
                       control={ control }
                       label={"Nombre"}
                       errors={errors}
                       rules={{required: {
                               value: true,
                               message: "Ingresar nombre"
                           },
                           ...OnlyLettersRules}}/>
                <Input name={"lastName"}
                       placeholder={"Ingrese apellido"}
                       control={ control }
                       label={"Apellido"}
                       errors={errors}
                       rules={{required: {
                               value: true,
                               message: "Ingresar apellido"
                           },
                           ...OnlyLettersRules}}/>
                <Input name={"email"}
                       placeholder={"Ingrese email"}
                       control={ control }
                       label={"Email"}
                       rules={{required: {
                               value: true,
                               message: "Ingresar email"
                           },
                           ...EmailRules}}
                       errors={errors}
                       keyboardType={'email-address'}/>
                <Input name={"phone"}
                       placeholder={"Ingrese telefono"}
                       control={ control }
                       label={"Teléfono"}
                       errors={errors}
                       keyboardType={'phone-pad'}
                       rules={{required: {
                               value: true,
                               message: "Ingresar telefono"
                           }}}
                       />
                <Input name={"birthday"}
                       placeholder={"dd/mm/aaaa"}
                       control={ control }
                       label={"Fecha de Nacimiento"}
                       errors={errors}
                       keyboardType={'phone-pad'}
                       mask={"date"}
                       rules={{required: {
                                value: true,
                                message: "Ingresar fecha de nacimiento"
                            },
                           ...DateRules}}/>
                <Input name={"password"}
                       placeholder={"Ingrese contraseña"}
                       control={ control }
                       label={"Contraseña"}
                       errors={errors}
                       isPassword={true}
                       rules={{required: {
                               value: true,
                               message: "Ingresar contraseña"
                           },
                           ...PasswordRules}}
                      />
                <Input name={"repeatPassword"}
                       placeholder={"Repite la contraseña"}
                       control={ control } label={"Repetir contraseña"}
                       errors={errors}
                       isPassword={true}
                       errorFieldText={"Ingresar contraseña"}
                       rules={{required: {
                               value: true,
                               message: "Ingresar contraseña"
                           },
                           ...PasswordRules}}/>
            </FormContainer>
            <VerticalSeparator height={10}/>
            <H1 fontSize={15}>Selecciona un icono</H1>
            <View style={{flexDirection:"row", justifyContent:"space-around", marginTop: 10 }}>
                <TouchableOpacity style={{borderColor: userIcon === "0" ? colors.primary : "#FFFFFF", borderWidth:2 }} onPress={()=> setUserIcon("0")}>
                    <SvgManAvatar/>
                </TouchableOpacity>
                <TouchableOpacity style={{borderColor: userIcon === "1" ? colors.primary : "#FFFFFF", borderWidth:2 }} onPress={()=> setUserIcon("1")}>
                    <SvgWomanAvatar/>
                </TouchableOpacity>
                <TouchableOpacity style={{borderColor: userIcon === "2" ? colors.primary : "#FFFFFF", borderWidth:2 }} onPress={()=> setUserIcon("2")}>
                    <SvgGenericAvatar/>
                </TouchableOpacity>
            </View>

            <View style={styles.btn}>
                <PrimaryButton text={"Registrar"} onPress={handleSubmit(signUp)}/>
            </View>
        </KeyboardAwareScrollView>


    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.white,
        flex:1,
        paddingHorizontal:24
    },
    btn: {
        marginTop: 40,
        marginBottom: 30
    }
})

export default SignUpScreen