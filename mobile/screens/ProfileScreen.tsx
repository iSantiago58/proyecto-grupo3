import React, {useEffect, useState} from "react"
import {View, Alert, StyleSheet, TouchableOpacity, Text, ScrollView} from "react-native"
import {useLogin} from "../context/AuthProvider";
import AuthenticateService from "../services/AuthenticateService"
import colors from "../constants/colors"
import H1 from "../components/headline/H1"
import SvgUserIcon from "../components/svg/UserSvg"
import ListItemWithArrow from "../components/ListItemWithArrow"
import SvgSecurityIcon from "../assets/svg/security.svg"
import SvgJusticeIcon from "../assets/svg/justice.svg"
import SvgMailIcon from "../assets/svg/mail.svg"
import SvgInfoIcon from "../assets/svg/info.svg"
import SvgLogoutIcon from "../assets/svg/logout.svg"
import {useNavigation, useNavigationContainerRef} from "@react-navigation/native"
import ResetPassword from "./ResetPassword";
import UserNameLoader from "../components/loaders/UserNameLoader"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {Storage} from "../constants/app"
import {useAtom} from "jotai"
import {isUserLoggedInAtom, loggedInUser, userAlias} from "../appState/atoms"
import {UserService} from "../services/UserService"
import {showMessage} from "react-native-flash-message"
import SvgPrivacy from "../assets/svg/privacy.svg"

const ProfileScreen = () => {
    const {isLoggedIn,setIsLoggedIn} = useLogin()
    const navigation = useNavigation()
    const navigationRef = useNavigationContainerRef()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [userEmail, setUserEmail] = useState<string>("")
    const [,setUserLogged] = useAtom(isUserLoggedInAtom)
    const [alias] = useAtom(userAlias)

    useEffect(() => {
       AsyncStorage.getItem(Storage.USER_EMAIL).then((response) => setUserEmail(response))
           .finally(() => AsyncStorage.getItem(Storage.USER_NAME).finally(() => setIsLoading(false)))
    },[])

    const onPressRemoveUser = () => {
        Alert.alert(
            "¿Estás seguro?",
            "Confirma si quieres eliminar tu cuenta.",
            [
                {   text : "Cancelar",
                    style: "cancel"
                },{
                text: "Si",
                onPress: async () => {
                    try{
                        const response = await UserService.delete(alias)
                        setIsLoggedIn(false)
                        setUserLogged(false)
                        await AsyncStorage.removeItem(Storage.USER_EMAIL)
                        await AsyncStorage.removeItem(Storage.USER_ALIAS)
                        //Limpia el stack
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'Home'}],
                        });
                        if(!!response.mensaje){
                            showMessage({
                                message: response.mensaje,
                                type: "success"})
                        }
                    }catch (e){
                        let error
                        if(!!e.error) {
                            error = "Error. Intentar nuevamente"
                        }else{
                            error = e.mensaje
                        }
                        showMessage({
                            message: error,
                            type: "danger"})
                    }
                }
            }
            ],
            {cancelable: true}
        )
    }


    const onPressLogout = () => {
        Alert.alert(
            "¿Estás seguro?",
            "Confirma si quieres cerrar sesión.",
            [
                {   text : "Cancelar",
                    style: "cancel"
                },{
                    text: "Si",
                    onPress: () => {
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
                        })
                    }
                }
            ],
            {cancelable: true}
        )
    }

    return (
        <View style={{backgroundColor: colors.white, flex:1}}>
            <View style={styles.headerContainer}>
                {isLoading ? (
                    <UserNameLoader/>
                ):(
                    <>
                        <H1 color={colors.white} fontSize={24} lineHeight={27}>{alias}</H1>
                        <H1 color={colors.white} fontSize={16}>{userEmail}</H1>
                    </>
                )}
            </View>
            <ScrollView style={{flex:1}}>
                <ListItemWithArrow icon={<SvgUserIcon color={"#323232"}/>} text={"Perfil"} onPress={() => navigation.navigate('FullScreen',{screen: "EditProfile", params: {alias: alias} } )}/>
                <ListItemWithArrow icon={<SvgSecurityIcon/>} text={"Cambiar Contraseña"} onPress={() => navigation.navigate('FullScreen',{screen: "ResetPassword" } )}/>
                <ListItemWithArrow icon={<SvgPrivacy/>} text={"Política de privacidad"} onPress={()=>navigation.navigate('FullScreen',{screen: "Privacy" } )}/>
                <ListItemWithArrow icon={<SvgJusticeIcon/>} text={"Términos y Condiciones"} onPress={()=>navigation.navigate('FullScreen',{screen: "TermsAndConditions" } )}/>
                <ListItemWithArrow icon={<SvgMailIcon/>} text={"Contactanos"} onPress={()=>{}}/>
                <ListItemWithArrow icon={<SvgInfoIcon/>} text={"Sobre nosotros"} onPress={()=>{}}/>
                <ListItemWithArrow icon={<SvgLogoutIcon/>} text={"Cerrar sesión"} onPress={ onPressLogout }/>
                <View style={{flex:1, marginBottom: 30, alignItems:"center"}}>
                    <TouchableOpacity style={{height: 40, justifyContent:"flex-end"}} onPress={ onPressRemoveUser}>
                        <Text style={{color: colors.black, fontSize: 15, textDecorationLine: "underline"}}>Eliminar cuenta</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 72,
        backgroundColor:colors.primary,
        justifyContent:"flex-end",
        paddingBottom:15,
        paddingHorizontal:24
    }
})

export default ProfileScreen