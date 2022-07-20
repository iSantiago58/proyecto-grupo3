import React, { useEffect } from "react"
import {StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, View, Alert} from "react-native"
import FormContainer from "../components/form/FormContainer"
import colors from "../constants/colors"
import { useNavigation } from "@react-navigation/native"
import { useMutation } from "react-query"
import AuthenticateService from "../services/AuthenticateService"
import {isUserLoggedIn, isUserLoggedInAtom, loggedInUser, userAlias} from "../appState/atoms"
import {useAtom} from "jotai"
import {useLogin} from "../context/AuthProvider"
import Input from "../components/textInput/Input"
import { useForm } from "react-hook-form"
import { AuthTokens } from "../utils/axios-jwt"
import { setupLogin } from "../utils/userUtils"
import VerticalSeparator from "../components/VerticalSeparator"
import H1 from "../components/headline/H1"
import Body from "../components/body/Body"
import { PrimaryButton } from "../components/button/PrimaryButton"
import { showMessage } from "react-native-flash-message"
import {EmailRules, PasswordRules} from "../components/textInput/inputRules"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {Storage} from "../constants/app"
import 'react-native-get-random-values'
import * as Notifications from "expo-notifications"
import * as Device from 'expo-device'

export interface User {
    email: string,
    password: string
}

const LoginScreen = () => {
    const {control, handleSubmit, formState: { errors }} = useForm()
    const navigation = useNavigation()
    const {mutateAsync, error} = useMutation((payload: User) => AuthenticateService.login(payload))
    const [, setUserAlias] = useAtom(userAlias)
    const [,setUser] = useAtom(loggedInUser)
    const [,setUserLogged] = useAtom(isUserLoggedInAtom)
    const {isLoggedIn, setIsLoggedIn} = useLogin()

    const registerForPushNotificationsAsync = async () =>{
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
            alert('Must use physical device for Push Notifications');
        }

        // if (Platform.OS === 'android') {
        //     Notifications.setNotificationChannelAsync('default', {
        //         name: 'default',
        //         importance: Notifications.AndroidImportance.MAX,
        //         vibrationPattern: [0, 250, 250, 250],
        //         lightColor: '#FF231F7C',
        //     });
        //}

        return token;
    }

    const login = async ({email, password} : User) => {
        let deviceId = await registerForPushNotificationsAsync()

        const payload = {
            email: email,
            password: password,
            deviceId: deviceId
        }

        const auth = await mutateAsync(payload)
        let token: AuthTokens = {
            accessToken: "",
            refreshToken: ""
        }

        token.accessToken = auth.token
        setUserAlias(auth.alias)
        setUser({name: "", email: email, alias:auth.alias})
        setUserLogged(true)
        await AsyncStorage.setItem(Storage.USER_ALIAS, auth.alias)
        setupLogin(token, "").then( ()=> {setIsLoggedIn(true), setUserLogged(true)})
        navigation.navigate("Home")

        //CONTROLAR FECHA DE EXPIRACION
        // const time = new Date().getTime() / 1000
        // if(decode.exp < time){
        //     return false
        // }else{
        //     return true
        // }
    }

    useEffect(()=>{
        if(error){
            showMessage({
                message: error.mensaje,
                type: "danger",
            })
        }
    },[error])

    return (
        <>
            <KeyboardAvoidingView style={styles.container}>
                <H1>Iniciar Sesión</H1>
                <VerticalSeparator height={25}/>
                <Body color={colors.grey1}>Inicia sesión y empieza a planificar tu próximo viaje </Body>

                <FormContainer>
                    <Input name={"email"}
                           placeholder={"Ingrese correo"}
                           control={ control }
                           label={"Email"}
                           rules={{
                               ...EmailRules,
                               required: {
                                   value: true,
                                   message: "Ingresar email"
                                }
                            }}
                           errors={errors}
                           keyboardType={'email-address'}
                    />

                    <Input name={"password"}
                           placeholder={"Ingrese contraseña"}
                           control={ control }
                           label={"Contraseña"}
                           rules={{required: {
                                   value: true,
                                   message: "Ingresar contraseña"
                               },
                               ...PasswordRules}}
                           isPassword={true}
                           errors={errors}
                    />
                </FormContainer>
                <VerticalSeparator height={40}/>
                <PrimaryButton text={"Iniciar Sesión"} onPress={handleSubmit(login)}/>
                <VerticalSeparator height={30}/>
                <View style={{flex:1,  justifyContent:"center", marginBottom: 20}}>
                    <TouchableOpacity style={styles.link} onPress={() => navigation.navigate("FullScreen", {screen: "ForgotPassword"})}>
                        <Text>¿Olvidaste la contraseña?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.link} onPress={() => navigation.navigate("FullScreen", {screen:"SignUpScreen"})}>
                        <Text>¿No tienes una cuenta? Registrate</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: colors.white,
    },
    textInput: {
        borderWidth:1,
        minHeight: 40,
        borderRadius: 5,
        paddingLeft: 5
    },
    link:{
        alignSelf: "center",
        marginTop:20
    }
})

export default LoginScreen