import React, {useEffect, useState} from "react"
import {KeyboardAvoidingView, View, StyleSheet} from "react-native";
import Input from "../../components/textInput/Input";
import {EmailRules} from "../../components/textInput/inputRules";
import {useForm} from "react-hook-form";
import {PrimaryButton} from "../../components/button/PrimaryButton";
import colors from "../../constants/colors"
import H1 from "../../components/headline/H1";
import Body from "../../components/body/Body";
import VerticalSeparator from "../../components/VerticalSeparator";
import useForgotPassword from "../../hooks/useForgotPassword";
import {useNavigation} from "@react-navigation/native";
import {showMessage} from "react-native-flash-message";


const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState<string>("")
    const [sendingRequest, setSendingRequest] = useState<boolean>(false)
    const navigation = useNavigation()
    const {control,handleSubmit, formState: { errors }} = useForm()
    const { refetch, error } = useForgotPassword(email)


    useEffect(()=>{
        if(error){
            if(error.status === 400){
                showMessage({
                    message: error.data.mensaje,
                    type: "danger"})
            }
        }
    },[error])

    const resetPassword = async () => {
        setSendingRequest(true)

        const response = await refetch()
        if(response.status === "success") {
            navigation.navigate("FullScreen", {screen: "CodeScreen", params: {email: email}})
        }

        setSendingRequest(false)

    }

    return (
        <KeyboardAvoidingView style={styles.wrapper} >
            <H1>Recuperar contraseña</H1>
            <VerticalSeparator height={10}/>
            <Body>Enviaremos un email a su casilla de correo.</Body>
            <View style={styles.inputContainer}>
                <Input name={"email"}
                       placeholder={"Ingrese correo"}
                       control={ control }
                       rules={EmailRules}
                       errors={errors}
                       keyboardType={'email-address'}
                       errorFieldText={"Ingresar email"}
                       onChange={(e) => setEmail(e.nativeEvent.text)}
                />
            </View>
            <View style={styles.btn}>
             <PrimaryButton disabled={sendingRequest} text={"Continuar"} onPress={handleSubmit(resetPassword)}/>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor:colors.white,
        flex:1,
        paddingHorizontal: 24
    },
    inputContainer: {
        flex:1,
        marginTop:30
    },
    btn: {
        flex:1,
        justifyContent:"flex-end",
        marginBottom: 40
    }
})

export default ForgotPasswordScreen