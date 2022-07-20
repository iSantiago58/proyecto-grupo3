import React, { useEffect, useState } from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from "./HomeStack";
import ProfileStack from "./ProfileStack";
import 'react-native-gesture-handler'
import AuthenticateStack from "./AuthenticateStack";
import ChatStack from "./ChatStack";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Storage} from "../constants/app";
import {useLogin} from "../context/AuthProvider";
import BookingStack from "./BookingStack";
import AboutUsStack from "./AboutUsStack";
import colors from "../constants/colors";
import SvgBookingIcon from "../components/svg/BookingSvg"
import {StyleSheet, Text, View} from "react-native";
import SvgChatIcon from "../components/svg/ChatSvg"
import SvgUserIcon from "../components/svg/UserSvg"
import SvgLogoIcon from "../assets/svg/logo-icon.svg"
import {StackHeaderOptions} from "@react-navigation/stack/lib/typescript/src/types"
import SvgArrowBack from "../components/svg/ArrowBack"
import {useSafeAreaInsets} from "react-native-safe-area-context";
import FavoriteIcon from "../components/svg/FavoriteIcon";
import FavoriteStack from "./FavoriteStack";

const Tabs = createBottomTabNavigator()

export const CUSTOM_HEADER = (
    color: string,
    arrowColor?: string
): StackHeaderOptions => {
    return{
        headerBackImage: () => <View style={{marginLeft: 24}}><SvgArrowBack color={ arrowColor}/></View>,
        headerStyle: {
            backgroundColor: color,
            shadowColor: color,
        },
        headerTintColor: color
    }
}

const Tab = () => {
    const insetsBottom = useSafeAreaInsets().bottom
    const [currentUser, setCurrentUser]= useState<string>("")
    const [countUnreadMessages, setCountUnreadMessages] = useState<number>(0)
    const [option, setOptions] = useState<Object>({})
    const {isLoggedIn, setIsLoggedIn} = useLogin()

    useEffect(()=>{
        const user =  async () => {
            const email = await AsyncStorage.getItem(Storage.USER_EMAIL)
            return email
        }
        user().then((response) => {
            setCurrentUser(response)
            setIsLoggedIn(!!response)
        })

    },[currentUser, isLoggedIn])

    useEffect(() => {
        if(!!currentUser || isLoggedIn ) {
            const usersRef = collection(db, 'ultimosMsg')
            const q = query(usersRef, where('para', "in", [currentUser]), where('noLeido', "==", true))
            const unsub = onSnapshot(q, querySnapshop => {
                let count = 0
                querySnapshop.forEach(doc => {
                    count++
                })

               setCountUnreadMessages(count)
                if(count>0) {
                    setOptions({tabBarBadge: count})
                } else {
                    setOptions({})
                }

                console.log(count)
            })
            return () => unsub()
        }
    },[currentUser, isLoggedIn])


    return (
        <Tabs.Navigator initialRouteName="Home" screenOptions={{
            headerShown: false,
            tabBarInactiveTintColor: colors.grey,
            tabBarActiveTintColor: colors.secondary,
            tabBarStyle: { height: 60 + insetsBottom },
            tabBarHideOnKeyboard: true,
        }} >
            <Tabs.Screen name={"Reservas"} component={BookingStack} options={{
                tabBarIcon: ({color}) => (
                    <View ><SvgBookingIcon color={color}/></View>
                ),
                tabBarLabel: ({color}) => (
                    <View style={styles.labelContainer}>
                       <Text style={{color:color, ...styles.text}}>Reservas</Text>
                    </View>
                )
            }}
            />
            <Tabs.Screen name={"Favoritos"} component={FavoriteStack} options={{
                tabBarIcon: ({color}) => (
                    <View><FavoriteIcon color={color}/></View>
                ),
                tabBarLabel: ({color}) => (
                    <View style={styles.labelContainer}>
                        <Text style={{color:color, ...styles.text}}>Favoritos</Text>
                    </View>
                )
            }}/>
            <Tabs.Screen name={"Home"} component={HomeStack} options={{
                tabBarIcon: () => (
                    <View><SvgLogoIcon/></View>
                ),
                tabBarLabel: ""
            }}/>
            <Tabs.Screen name={"Chat"} component={ChatStack} options={{
                tabBarIcon: ({color}) => (
                    <View><SvgChatIcon color={color}/></View>
                ),
                tabBarLabel: ({color}) => (
                    <View style={styles.labelContainer}>
                        <Text style={{color:color, ...styles.text}}>Chat</Text>
                    </View>
                ),
            tabBarBadge: countUnreadMessages>0 ? countUnreadMessages : undefined

            }}/>
            {isLoggedIn? (
                <>
                    <Tabs.Screen name={"Profile"} component={ProfileStack} options={{
                        tabBarIcon: ({color}) => (
                            <View><SvgUserIcon color={color}/></View>
                        ),
                        tabBarLabel: ({color}) => (
                            <View style={styles.labelContainer}>
                                <Text style={{color:color, ...styles.text}}>Perfil</Text>
                            </View>
                        )
                    }}/>
                </>
                ):(
                <>
                    <Tabs.Screen name={"Iniciar Sesión"} component={AuthenticateStack} options={{
                        tabBarIcon: ({color}) => (
                            <View><SvgUserIcon color={color}/></View>
                        ),
                        tabBarLabel: ({color}) => (
                            <View style={styles.labelContainer}>
                                <Text style={{color:color, ...styles.text}}>Iniciar Sesión</Text>
                            </View>
                        )
                    }}/>
                </>
            )}
        </Tabs.Navigator>
    )
}

const styles = StyleSheet.create({
    text:{
        fontSize:11
    },
    labelContainer:{
        marginBottom:5
    }
})

export default Tab