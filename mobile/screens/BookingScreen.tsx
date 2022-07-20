import React, {useEffect, useState} from "react"
import {RefreshControl, ScrollView, StyleSheet, View} from "react-native"
import {useAtom} from "jotai";
import {isUserLoggedInAtom, userAlias} from "../appState/atoms"
import colors from "../constants/colors"
import {LinearGradient} from "expo-linear-gradient"
import H6 from "../components/headline/H6"
import useBookings from "../hooks/useBookings"
import BookingCard from "../components/BookingCard"
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import VerticalSeparator from "../components/VerticalSeparator"
import {useNavigation} from "@react-navigation/native"
import moment from "moment"
import {imageUrl} from "../constants/app"
import Background from "../components/Background"
import EmptyBookingSvg from "../assets/svg/emptyStates/EmptyOvni.svg"
import H1 from "../components/headline/H1";

const BookingScreen = () => {
    const [isUserLogged] = useAtom(isUserLoggedInAtom)
    const [alias] = useAtom(userAlias)
    const { data, isFetching, isFetched, refetch, error } = useBookings(alias)
    const [indexSelectedFilter, setIndexSelectedFilter] = useState(0)
    const [filteredBookings, setFilteredBookings] = useState<any[]>([])
    const [isFiltering, setIsFiltering] = useState<boolean>(true)
    const navigation = useNavigation()
    const today = moment()
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

    const refresh= () => {
        setIsRefreshing(true)
        refetch()
        setIsRefreshing(false)
    }

    const applyFilter = () => {
        if (!data) {
            setIsFiltering(false)
            return
        }else{
            const filtered = data.filter((el: any) => {
                let date = el.endDate.split("/")
                date = date[2]+"-"+date[1]+"-"+date[0]
                date = moment(date, "YYYY-MM-DD")
                if(indexSelectedFilter === 1) {
                    if(el.bookingStatus === "RECHAZADA" || el.bookingStatus === "CANCELADA" || (el.bookingStatus === "ACEPTADA" && date.diff(today, 'days') < 0) ){
                        return true
                    }
                }else{
                    if(el.bookingStatus === "PENDIENTE" || (el.bookingStatus === "ACEPTADA" && date.diff(today, 'days') >= 0)){
                        return true
                    }
                }
            })
            setFilteredBookings(filtered)
            setIsFiltering(false)
        }
    }

    useEffect(() => {
        applyFilter()
    }, [indexSelectedFilter, data])

    return (
        <>
            <ScrollView style={{ backgroundColor:colors.white }} refreshControl={
                isUserLogged ? (
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={()=> refresh()}
                        tintColor={colors.white}
                        style={{position:"absolute", zIndex:100}}
                    />
                ) : (<></>)
            }>
                <View style={{height: "100%", width: "100%", position: "absolute", top:-400}}>
                    <Background x={0} y={0} topColor={colors.primary} bottomColor={colors.white} height={800}/>
                </View>
                <View style={{backgroundColor: colors.primary, paddingBottom: isUserLogged ? 20 : 0}}>
                    <H6 color={colors.white} textAlign={"center"}>Reservas</H6>
                    <VerticalSeparator height={20}/>
                </View>
                {isUserLogged &&
                    <View style={{backgroundColor: colors.primary, paddingBottom:20}}>
                        <SegmentedControl
                            selectedIndex={indexSelectedFilter}
                            values={["Actuales", "Finalizadas"]}
                            onChange={(event) => {
                                setIsFiltering(true)
                                setIndexSelectedFilter(event.nativeEvent.selectedSegmentIndex)
                            }}
                            fontStyle={{color: colors.black}}
                            activeFontStyle={{color: colors.black,}}
                            tintColor={colors.white}
                            style={{ height: 32, marginHorizontal: 24 }}
                            backgroundColor={colors.grey60}
                        />
                    </View>
                }
                {isFetching && isUserLogged? (
                <View>

                </View>
                ) : (
                    isUserLogged? (
                    <LinearGradient
                        colors={['#0064BB', 'transparent']}
                        style={styles.background}
                        start={{ x: 0, y: 0 }} >
                            { filteredBookings.length > 0 ? (
                                filteredBookings.map((el) => {
                                    const today = moment()
                                    let date
                                    date = el.endDate.split("/")
                                    date = date[2]+"-"+date[1]+"-"+date[0]
                                    date = moment(date, "YYYY-MM-DD")
                                    let isFinished = date.diff(today, 'days') < 0
                                    return  (
                                            <>
                                                <BookingCard
                                                    key={el.bookingId+el.startDate+el.endDate}
                                                    onPress={() => navigation.navigate("FullScreen", { screen: "BookingDetail", params: {id: el.bookingId} })}
                                                    bookingId={el.bookingId}
                                                    accommodationName={el.accommodationName}
                                                    startDate={el.startDate}
                                                    endDate={el.endDate}
                                                    hostName={el.hostName}
                                                    bookingStatus={isFinished ? "FINALIZADA" : el.bookingStatus}
                                                    photo={imageUrl+el.accommodationPhoto}/>
                                            </>
                                        )
                                    }
                                )
                            ): (
                                <View style={{flex:1,alignItems:"center"}}>
                                    <EmptyBookingSvg/>
                                    <View style={styles.emptyText}>
                                        <H1 fontSize={17} textAlign={"center"}>No tienes reservas</H1>
                                    </View>
                                </View>
                            )}
                        </LinearGradient>
                    ):(
                        <View style={{ alignItems:"center", marginTop: 50}}>
                            <EmptyBookingSvg/>
                            <View style={styles.emptyText}>
                                <H1 fontSize={17} >Inicia sesión para ver tus reservas</H1>
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

export default BookingScreen