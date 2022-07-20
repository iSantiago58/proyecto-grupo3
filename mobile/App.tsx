import { NavigationContainer } from "@react-navigation/native"
import { QueryClient, QueryClientProvider } from "react-query"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {Storage} from "./constants/app"
import {useEffect, useRef, useState} from "react"
import React from "react";
import AuthProvider, {useLogin} from "./context/AuthProvider"
import Navigation from "./navigation/Navigations"
import {LogBox, Platform} from "react-native"
import {useAtom} from "jotai";
import {isUserLoggedInAtom, userAlias} from "./appState/atoms"
import * as Notifications from 'expo-notifications'


const queryClient = new QueryClient()

LogBox.ignoreAllLogs(true)

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default  function App() {
    const [completed, setCompleted] = useState(false)
    const [ ,setUserLogged] = useAtom(isUserLoggedInAtom)
    const [,setAlias] = useAtom(userAlias)
    const { setIsLoggedIn } = useLogin()

    const [expoPushToken, setExpoPushToken] = useState('')
    const [notification, setNotification] = useState(false)
    const notificationListener = useRef()
    const responseListener = useRef()

    useEffect(() => {
        registerForPushNotificationsAsync().then()

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    async function registerForPushNotificationsAsync() {
        // let token;
        // if (Device.isDevice) {
        //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
        //     let finalStatus = existingStatus;
        //     if (existingStatus !== 'granted') {
        //         const { status } = await Notifications.requestPermissionsAsync();
        //         finalStatus = status;
        //     }
        //     if (finalStatus !== 'granted') {
        //         alert('Failed to get push token for push notification!');
        //         return;
        //     }
        //     token = (await Notifications.getExpoPushTokenAsync()).data;
        //     console.log(token);
        // } else {
        //     alert('Must use physical device for Push Notifications');
        // }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
         }
        //
        // return token;
    }



    const user =  async () => {
        let email = await AsyncStorage.getItem(Storage.USER_EMAIL)
        return email
    }

    useEffect(() => {
        user().then(async response => {
            setUserLogged(!!response)
            const alias = await AsyncStorage.getItem(Storage.USER_ALIAS)
            setAlias(alias)
            setIsLoggedIn(!!response)
        }).finally(() => setCompleted(true))
    })

    if(completed){
        return (
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <NavigationContainer>
                        <Navigation/>
                    </NavigationContainer>
                </QueryClientProvider>
            </AuthProvider>
        );
    }else{
        return null
    }


}
