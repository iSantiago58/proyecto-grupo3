import React, { useEffect, useState } from "react"
import { onSnapshot, doc } from "firebase/firestore"
import { db } from "../../firebase"
import {TouchableOpacity, StyleSheet, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Storage} from "../../constants/app";
import {useNavigation} from "@react-navigation/native";
import H1 from "../headline/H1";
import Line from "../Line";
import VerticalSeparator from "../VerticalSeparator";
import Body from "../body/Body";
import colors from "../../constants/colors";
import moment from "moment";


const UserItem = ({ user }) => {
    const host = user.alias
    const housingId = user.housingId
    const currentUser = user.guest
    const bookingId = user.bookingId
    const sDate = user.startDate
    const [data, setData] = useState("")
    const navigation = useNavigation()
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const startDay = moment(sDate.toDate()).format("DD/MM").toString()
    const endDay = moment(user.endDate.toDate()).format("DD/MM")
    const endDateFormated = moment(user.endDate.toDate()).format("YYYY-MM-DD")
    const end = moment(endDateFormated)
    const today = moment()
    const diff = end.diff(today, 'days')

    useEffect(()=> {
        const id = `${currentUser}`+ "-" + `${host}` + "-" + `${housingId}`+"-" +`${bookingId}`
        let unsub = onSnapshot(doc(db, "ultimosMsg", id), (doc) =>{
            setData(doc.data())
        })
        setIsFetching(false)
        return ()=>unsub()
    },[])


    return (
        <>
            {!!data && !isFetching && (
                <TouchableOpacity style={styles.container} onPress={() => {navigation.navigate("FullScreen", {screen:'ChatDetail', params: {usuario:user, currentUser:currentUser }})}}>
                    <View style={styles.row}>
                        <H1 fontSize={18} lineHeight={22} numberOfLines={1}>{host} - {user.housingName}</H1>
                        <Body numberOfLines={1} color={colors.primary} fontSize={15} lineHeight={18}>{data.fechaCreacion.toDate().getHours()+":"+data.fechaCreacion.toDate().getMinutes()}</Body>
                    </View>
                    <H1 fontSize={16} lineHeight={20}>{startDay} - {endDay}</H1>
                    <VerticalSeparator height={10}/>
                        <>
                            <View style={styles.row}>
                                <View style={{ width: "70%"}}>
                                    {data.de === currentUser ? (
                                    <Body numberOfLines={1} color={colors.grey90} fontSize={16}>Yo: {data.texto}</Body>
                                    ):(
                                    <Body numberOfLines={1} fontSize={16}>{data.texto}</Body>
                                    )}

                                </View>
                                <View style={{flexDirection: "row"}}>
                                {diff >= 0 ? (
                                    <View style={styles.pillActive}>
                                        <H1 fontSize={10} lineHeight={13} color={colors.white}>Activo</H1>
                                    </View >
                                    ):(
                                    <View style={styles.pillInactive}>
                                        <H1 fontSize={10} lineHeight={13} color={colors.white}>Inactivo</H1>
                                    </View>
                                )}
                                {!!data.noLeido && data.de !== currentUser &&
                                    <View style={styles.pill}>
                                    <H1 fontSize={10} lineHeight={13} color={colors.white}>Nuevo</H1>
                                </View >}
                                </View>
                            </View>

                        </>
                    <VerticalSeparator height={10}/>
                    <Line/>
                </TouchableOpacity>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: 24,
        marginTop: 15,
        height: 100,
    },
    row: {
        flexDirection:"row",
        justifyContent: "space-between",
    },
    pill: {
        backgroundColor: "green",
        justifyContent: "center",
        paddingHorizontal: 5,
        borderRadius: 15,
        marginLeft: 5
    },
    pillActive: {
        backgroundColor: colors.secondary,
        justifyContent: "center",
        paddingHorizontal: 5,
        borderRadius: 15,
    },
    pillInactive: {
        backgroundColor: "black",
        justifyContent: "center",
        paddingHorizontal: 5,
        borderRadius: 15
    }
})

export default UserItem


