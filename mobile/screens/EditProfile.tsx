import React, {useEffect, useState} from "react"
import colors from "../constants/colors"
import { ScrollView, StyleSheet, View } from "react-native"
import H6 from "../components/headline/H6"
import SvgStar from "../assets/svg/star.svg"
import VerticalSeparator from "../components/VerticalSeparator"
import FormContainer from "../components/form/FormContainer"
import Input from "../components/textInput/Input"
import { useForm } from "react-hook-form"
import { PrimaryButton } from "../components/button/PrimaryButton"
import useUser from "../hooks/useUser"
import { useAtom } from "jotai";
import {isUserLoggedInAtom, loggedInUser, userAlias} from "../appState/atoms"
import {DateRules, OnlyLettersRules} from "../components/textInput/inputRules"
import { useMutation } from "react-query"
import { UserService } from "../services/UserService"
import { showMessage } from "react-native-flash-message"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {Storage} from "../constants/app"
import AuthenticateService from "../services/AuthenticateService"
import {useLogin} from "../context/AuthProvider"
import {StackActions, useNavigation} from "@react-navigation/native"
import SvgManAvatar from "../components/svg/ManAvatar";
import SvgWomanAvatar from "../components/svg/WomanAvatar";
import SvgGenericAvatar from "../components/svg/GenericAvatar";

export type UserProfile = {
    alias: string
    name: string
    lastName: string
    email: string
    phone: string
    birthday: string
    picture: string
}

const EditProfile = ({route}: any) => {
    const {alias} = route.params
    const { control, handleSubmit, formState: { errors } } = useForm()
    const { data, error, isFetching } = useUser(alias)
    const { mutateAsync, error: errorUpdating } = useMutation((payload: UserProfile) => UserService.updateUser(payload))
    const [scrollEnabled, setScrollEnabled] = useState<boolean>(false)
    const [contentHeight, setContentHeight] = useState<number>(0)
    const [scrollViewHeight, setScrollViewHeight] = useState<number>(0)
    const {isLoggedIn,setIsLoggedIn} = useLogin()
    const [,setUserLogged] = useAtom(isUserLoggedInAtom)
    const navigation = useNavigation()

    useEffect(()=>{
        if(errorUpdating){
            showMessage({
                message: errorUpdating.mensaje,
                type: "danger"})
        }
    },[errorUpdating])

    useEffect(() => {
        if(error==401){
            AuthenticateService.logout().then( async () => {
                setIsLoggedIn(false)
                setUserLogged(false)
                await AsyncStorage.removeItem(Storage.USER_EMAIL)
                await AsyncStorage.removeItem(Storage.USER_ALIAS)
                //Limpia el stack
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
                navigation.goBack()
            })
        }
    },[error])


    const saveData = async ({  name, lastName, phone, birthday } : { name: string, lastName: string, phone: string, birthday: string}) => {
        const payload: UserProfile = {
            alias: alias,
            email: data.email,
            name: name,
            lastName: lastName,
            phone: phone,
            birthday: birthday,
            picture: data.picture ?? "2"
        }

        const response = await mutateAsync(payload)
        await AsyncStorage.setItem(Storage.USER_NAME, name)
        showMessage({
            message: response.mensaje,
            type: "success"})
    }

    useEffect(() => {
        if (contentHeight > 0 && scrollViewHeight > 0) {
            setScrollEnabled(contentHeight > scrollViewHeight)
        }
    }, [contentHeight, scrollViewHeight])

    return(
        <KeyboardAwareScrollView style={{backgroundColor: colors.white}}
                    onLayout={(event) => setScrollViewHeight(event.nativeEvent.layout.height)}
                    onContentSizeChange={(w, h) => setContentHeight(h)}
                    scrollEnabled={scrollEnabled}>
            <View style={styles.headerContainer}>
                <H6 color={colors.white} textAlign={"center"}>{alias}</H6>
                <VerticalSeparator height={5}/>
                <View style={{alignSelf:"center", flexDirection:"row"}}>
                    <SvgStar/>
                    <H6 color={colors.white}> 4.7</H6>
                </View>
            </View>
                {!isFetching && !!!error &&(
                    <View style={{ paddingHorizontal: 24}}>
                        <FormContainer>
                            <View style={{alignItems:"center"}}>
                                {data.picture === "0" ? (
                                    <SvgManAvatar/>
                                ) : data.picture === "1" ? (
                                    <SvgWomanAvatar/>
                                ) : (
                                    <SvgGenericAvatar/>
                                )}
                            </View>
                            <Input
                                label={"Nombre"}
                                name={"name"}
                                control={control}
                                placeholder={"Ingresar nombre"}
                                defaultValue={data.name}
                                rules={{ required: {
                                    value: true,
                                    message: "Ingresar nombre"
                                },
                                ...OnlyLettersRules}}
                            />
                            <Input
                                label={"Apellido"}
                                name={"lastName"}
                                control={control}
                                placeholder={"Ingresar apellido"}
                                defaultValue={data.lastName}
                                rules={{ required: {
                                        value: true,
                                        message: "Ingresar apellido"
                                    },
                                    ...OnlyLettersRules}}
                            />
                            <Input name={"phone"}
                                   placeholder={"Ingrese telefono"}
                                   control={ control }
                                   label={"Teléfono"}
                                   errors={errors}
                                   keyboardType={'phone-pad'}
                                   errorFieldText={"Ingresar telefono"}
                                   defaultValue={data.phone}
                            />
                            <Input
                                name={"birthday"}
                                placeholder={"dd/mm/aaaa"}
                                control={ control }
                                label={"Fecha de Nacimiento"}
                                errors={errors}
                                keyboardType={'phone-pad'}
                                mask={"date"}
                                defaultValue={data.birthday}
                                errorFieldText={"Ingresar fecha de nacimiento"}
                                rules={{ required: {
                                        value: true,
                                        message: "Ingresar fecha de nacimiento"
                                    },
                                    ...DateRules}}
                            />
                        </FormContainer>
                        <View style={styles.buttonContainer}>
                        <PrimaryButton text={"Guardar"} onPress={handleSubmit(saveData)}/>
                    </View>
                    </View>
                )}
        </KeyboardAwareScrollView>

    )

}
const styles = StyleSheet.create({
    headerContainer: {
        height: 70,
        backgroundColor:colors.primary,
        justifyContent: "flex-end",
        paddingBottom: 15
    },
    buttonContainer: {
        marginTop: 20,
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 20
    }
})

export default EditProfile