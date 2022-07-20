import React, {useEffect, useState} from "react"
import { View, RefreshControl, ScrollView, StyleSheet} from "react-native"
import {useNavigation} from "@react-navigation/native"
import {useAtom} from "jotai"
import {isUserLoggedInAtom, userAlias} from "../appState/atoms"
import colors from "../constants/colors"
import Background from "../components/Background"
import {LinearGradient} from "expo-linear-gradient"
import H6 from "../components/headline/H6"
import useFavorites from "../hooks/useFavorites"
import Card from "../components/card"
import {imageUrl, Storage} from "../constants/app"
import AuthenticateService from "../services/AuthenticateService"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {useLogin} from "../context/AuthProvider"
import EmptyFavoritesSvg from "../assets/svg/emptyStates/EmptyFavorites.svg"
import H1 from "../components/headline/H1";

const FavoriteScreen = () => {
    const navigation = useNavigation()
    const [isUserLogged] = useAtom(isUserLoggedInAtom)
    const [alias] = useAtom(userAlias)
    const { data, isFetching, refetch, error } =  useFavorites(alias)
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
    const {isLoggedIn,setIsLoggedIn} = useLogin()
    const [,setUserLogged] = useAtom(isUserLoggedInAtom)

    const refresh= () => {
        setIsRefreshing(true)
        refetch()
        setIsRefreshing(false)
    }
        useEffect(() => {
        if(!!error && error === 401) {
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
                //navigation.goBack()
            })
        }

    },[error])


    return (
        <>
            <ScrollView style={{ backgroundColor:colors.white }}
                        refreshControl={ isUserLogged ? (
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={()=> refresh()}
                                tintColor={colors.white}
                                style={{position:"absolute", zIndex:100}}
                            /> ):(<></>)}>
                <View style={{height: "100%", width: "100%", position: "absolute", top:-400}}>
                    <Background x={0} y={0} topColor={colors.primary} bottomColor={colors.white} height={800}/>
                </View>
                <View style={{backgroundColor: colors.primary, paddingBottom:20}}>
                    <H6 color={colors.white} textAlign={"center"}>Favoritos</H6>
                </View>
                { isFetching || isRefreshing ? (
                    <></>
                ):(
                    isUserLogged ? (
                        <LinearGradient
                            colors={['#0064BB', 'transparent']}
                            style={styles.background}
                            start={{ x: 0, y: 0 }} >
                            {isUserLogged && data.length > 0 ? (
                                data.map(el => (
                                    <Card key={el.id}
                                          onPress={() => navigation.navigate("FullScreen", { screen: "AccommodationDetail", params: { id: el.id, startDate: "", endDate: "", userAlias: alias }})}
                                          title={el.name}
                                          description={el.description}
                                          qualification={el.qualification}
                                          price={el.price}
                                          photo={imageUrl+el.photo}
                                    />
                                ))
                            ) : (
                                <View style={{flex:1, alignItems: "center", justifyContent: "center", paddingTop: 35 }}>
                                    <EmptyFavoritesSvg/>
                                    <View style={styles.emptyText}>
                                        <H1 fontSize={17} textAlign={"center"}>No tienes favoritos</H1>
                                    </View>
                                </View>
                            )}
                        </LinearGradient>
                        ) : (
                        <View style={{flex:1, alignItems: "center", justifyContent: "center", paddingTop: 50 }}>
                            <EmptyFavoritesSvg/>
                            <View style={styles.emptyText}>
                                <H1 fontSize={17} numberOfLines={2} textAlign={"center"} lineHeight={22}>Inicia sesión para ver tus alojamientos favoritos</H1>
                            </View>
                        </View>
                    )
                    )}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    background: {
        flex:1,
        minHeight: 600
    },
    emptyText: {
        flex:1,
        marginTop: 30
    }
})

export default FavoriteScreen