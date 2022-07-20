import React, {useEffect, useState} from "react"
import {ScrollView, StyleSheet, View} from "react-native"
import colors from "../constants/colors"
import {db} from "../firebase"
import {collection, query, where, onSnapshot} from 'firebase/firestore'
import UserItem from "../components/chat/UserItem"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {Storage} from "../constants/app"
import {useNavigation} from "@react-navigation/native"
import Background from "../components/Background"
import H6 from "../components/headline/H6"
import {LinearGradient} from "expo-linear-gradient"
import {useAtom} from "jotai"
import {isUserLoggedInAtom} from "../appState/atoms"
import EmptyChatSvg from "../assets/svg/emptyStates/EmpyChat.svg"
import H1 from "../components/headline/H1";

const ChatListScreen = () => {
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState<string>("")
    const navigation = useNavigation()
    const [isUserLogged] = useAtom(isUserLoggedInAtom)

    // console.log("usuario logueado",isUserLogged)

    useEffect(()=>{
        const getCurrentUser = async () => {
            AsyncStorage.getItem(Storage.USER_ALIAS).then(res => {setCurrentUser(res)}
            )
        }
        getCurrentUser().then()
    },[])

    useEffect(() => {
        // console.log("useEffect",!!currentUser)
        if(!!currentUser) {
            const usersRef = collection(db, 'chats')
            const q = query(usersRef, where('huesped', "in", [currentUser]))
            const unsub = onSnapshot(q, querySnapshop => {
                let user = []
                querySnapshop.forEach(doc => {
                    user.push({
                        startDate: doc.data().fechaInicioReserva,
                        guest: doc.data().huesped,
                        alias: doc.data().anfitrion,
                        endDate: doc.data().fechaFinReserva,
                        housingName:doc.data().nombreAlojamiento,
                        housingId:doc.data().idAlojamiento,
                        bookingId: doc.data().idReserva,

                    })
                })
                setUsers(user.reverse())
            })
            return () => unsub()
        }else{
            return
        }
    },[currentUser])

    return(
        <ScrollView style={styles.container}>
            <View style={{height: "100%", width: "100%", position: "absolute", top:-400}}>
                <Background x={0} y={0} topColor={colors.primary} bottomColor={colors.white} height={800}/>
            </View>
            <View style={{backgroundColor: colors.primary, paddingBottom:20}}>
                <H6 color={colors.white} textAlign={"center"}>Mensajería</H6>
            </View>
            {isUserLogged ? (
                users.length === 0 ? (
                    <LinearGradient
                        colors={['#0064BB', 'transparent']}
                        style={styles.background}
                        start={{ x: 0, y: 0 }} >
                            <View style={{flex:1, alignItems: "center", justifyContent: "center", paddingTop: 50 }}>
                                <EmptyChatSvg/>
                                <View style={styles.emptyText}>
                                    <H1 fontSize={17} textAlign={"center"}>No tienes mensajes</H1>
                                </View>
                            </View>
                    </LinearGradient>
                ):(
                    users.map(user => <UserItem key={currentUser+user.alias+user.housingId+user.bookingId} user={user} navigation={navigation} />)
                )
            ):(
                <View style={{flex:1, alignItems: "center", justifyContent: "center", paddingTop: 50 }}>
                    <EmptyChatSvg/>
                    <View style={styles.emptyText}>
                        <H1 fontSize={17} numberOfLines={2} textAlign={"center"} lineHeight={22}>Inicia sesión para ver tus mensajes</H1>
                    </View>
                </View>

            )




            }
            {/*{users.length === 0 ? (*/}
            {/*    <LinearGradient*/}
            {/*        colors={['#0064BB', 'transparent']}*/}
            {/*        style={styles.background}*/}
            {/*        start={{ x: 0, y: 0 }} >*/}

            {/*    </LinearGradient>*/}

            {/*): (*/}
            {/*    users.map(user => <UserItem key={currentUser+user.alias+user.housingId+user.bookingId} user={user} navigation={navigation} />)*/}
            {/*)}*/}

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    background: {
        flex:1,
        minHeight: 400
    },
    emptyText: {
        flex:1,
        marginTop: 30
    }

})

export default ChatListScreen