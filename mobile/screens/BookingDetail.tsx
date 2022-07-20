import React, {useEffect, useState} from "react"
import {View, StyleSheet, Image, TouchableOpacity, Text} from "react-native"
import useBookingDetail from "../hooks/useBookingDetail"
import H1 from "../components/headline/H1"
import colors from "../constants/colors"
import {AirbnbRating} from "react-native-ratings"
import VerticalSeparator from "../components/VerticalSeparator"
import {imageUrl, Storage} from "../constants/app"
import Body from "../components/body/Body"
import BookingStatusChip from "../components/BookingStatusChip"
import moment from "moment"
import {useForm} from "react-hook-form"
import Input from "../components/textInput/Input"
import {PrimaryButton} from "../components/button/PrimaryButton"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import BookingService from "../services/BookingService"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {showMessage} from "react-native-flash-message"
import { db } from "../firebase"
import {
    collection,
    query,
    onSnapshot,
    doc,
    addDoc,
    Timestamp,
    orderBy,
    setDoc,
    getDoc,
    updateDoc
} from 'firebase/firestore'

const BookingDetail = ({route}: any) => {
    const {id} = route.params
    const {data, isFetching, isFetched, refetch} = useBookingDetail(id)
    const [isBookingFinalized, setIsBookingFinalized] = useState<boolean>(false)
    const [reviewRating, setReviewRating] = useState(0)
    const {control, handleSubmit, formState: { errors }} = useForm()
    const [hostRating, setHostRating] = useState(0)
    const [isRequestOnFlight, setIsRequestOnFlight] = useState<boolean>(false)
    const [isCurrent, setIsCurrent] = useState<boolean>(false)
    let date = new Date()
    date.setFullYear(date.getFullYear()-1)

    useEffect(() => {
        if(isFetched){
            let today = moment()
            let date
            date = data.endDate.split("/")
            date = date[2]+"-"+date[1]+"-"+date[0]
            date = moment(date, "YYYY-MM-DD")
            setIsBookingFinalized(date.diff(today, 'days') < 0)
            setReviewRating(data.reviewQualification)
            setHostRating(data.hostQualification)

            date = data.startDate.split("/")
            date = date[2]+"-"+date[1]+"-"+date[0]
            date = moment(date, "YYYY-MM-DD")
            setIsCurrent(today.diff(date, 'days') > 0)
        }
    },[isFetched])

    const saveHostRating = async (number: number) => {
        const alias = await AsyncStorage.getItem(Storage.USER_ALIAS)
        await BookingService.saveHosRating(data.hostAlias, alias, number)
        setHostRating(number)
    }

    const deleteHostRating = async () => {
        const alias = await AsyncStorage.getItem(Storage.USER_ALIAS)
        await BookingService.deleteHostRating(alias,data.hostAlias )
        setHostRating(0)

    }

    const saveReview = async ({review}: {review: string}) => {
        if(reviewRating === 0){
            showMessage({
                message: "La calificación debe ser mayor a 0 ",
                type: "danger",
            })
            return
        }else{
            setIsRequestOnFlight(true)
            let response
            if(data.bookingId !== 0){
                //modify
                let payload = {
                    reviewId: data.reviewId,
                    description: review,
                    qualification: reviewRating
                }
                response = await BookingService.editReview(payload)
            }else{
                let payload = {
                    bookingId: id,
                    description: review,
                    qualification: reviewRating
                }
                //add
                response = await BookingService.saveReview(payload)
            }
            setIsRequestOnFlight(false)
            showMessage({
                message: response.mensaje,
                type: "success",
            })
            return
        }
    }

    const cancelBooking = async () => {
        setIsRequestOnFlight(true)
        const payload = {
            booking_id: id,
            reimbursedBy: "GUEST"
        }
        try {
            const response = await BookingService.cancel(payload)

            if (response.success) {
                const alias = await AsyncStorage.getItem(Storage.USER_ALIAS)
                const idChat = `${alias}`+ "-" + `${data.hostAlias}` + "-" + `${data.accommodationId}`+ "-" + `${id}`

                await updateDoc(doc(db,'chats', idChat),{
                    fechaFinReserva: Timestamp.fromDate(date)
                })
                showMessage({
                    message: "Reserva cancelada",
                    type: "success",
                })
                refetch()
            } else {
                showMessage({
                    message: "Error. Intente nuevamente",
                    type: "success",
                })
            }

        } catch (e) {
            showMessage({
                message: "Error",
                type: "danger",
            })
        }
        setIsRequestOnFlight(false)
    }

    return (
        <KeyboardAwareScrollView style={styles.wrapper}>
            <View>
                {!isFetching && !isRequestOnFlight &&
                    <>
                        <View style={{backgroundColor:colors.white, paddingHorizontal:20, paddingVertical:10}}>
                            <H1 fontSize={20}>Hospedaje</H1>
                            <View style={{ flexDirection: "row",marginTop: 5}}>
                                <View style={styles.imgWrapper}>
                                    <Image source={{uri: imageUrl+data.accommodationPhoto}} height={106} width={216} style={styles.img}/>
                                </View>
                                <View style={{flex:1, marginLeft: 10}}>
                                    <H1 fontSize={16} lineHeight={20} numberOfLines={1}>{data.accommodationName}</H1>
                                    <VerticalSeparator height={5}/>
                                    <Body fontSize={14} lineHeight={16}>Desde: {data.startDate}</Body>
                                    <Body fontSize={14} lineHeight={16}>Hasta: {data.endDate}</Body>
                                    {!isBookingFinalized && <Body fontSize={14} lineHeight={16}>Pago: {data.paymentStatus}</Body>}
                                    <BookingStatusChip type={isBookingFinalized ? "FINALIZADA" : data.bookingStatus}/>
                                </View>
                            </View>
                        </View>
                        {isBookingFinalized ? (
                            <>
                                <View style={{ backgroundColor:colors.white, marginTop: 30, paddingHorizontal: 24, justifyContent:"center", height:100}}>
                                    <H1 fontSize={20}>Califica a {data.hostName} </H1>
                                    <VerticalSeparator height={15}/>
                                    <View style={{flexDirection: "row", alignItems: "center", justifyContent:"center"}}>
                                        <AirbnbRating
                                            count={5}
                                            defaultRating={hostRating}
                                            size={30}
                                            isDisabled={false}
                                            showRating={false}
                                            selectedColor={colors.primary}
                                            unSelectedColor={colors.white}
                                            starContainerStyle={{backgroundColor: 'rgba(63, 55, 165, 0.3)', borderRadius: 10}}
                                            onFinishRating = {(number => saveHostRating(number))}
                                        />
                                        { (data.hostQualification > 0 || hostRating > 0) &&
                                            <TouchableOpacity style={{marginLeft: 10}} onPress={()=> deleteHostRating()}>
                                                <Text style={{
                                                    color: colors.primary,
                                                    textDecorationLine: 'underline',
                                                }}>Eliminar</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                </View>

                                <View style={{ backgroundColor: colors.white, marginTop: 30, paddingTop: 10, paddingHorizontal:24 }}>
                                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                        <H1 fontSize={20}>Reseña</H1>
                                        <AirbnbRating
                                            count={5}
                                            defaultRating={data.reviewQualification}
                                            size={30}
                                            isDisabled={false}
                                            showRating={false}
                                            selectedColor={colors.primary}
                                            unSelectedColor={colors.white}
                                            starContainerStyle={{backgroundColor: 'rgba(63, 55, 165, 0.3)', borderRadius: 10}}
                                            minValue={0}
                                            onFinishRating = {(number => setReviewRating(number))}
                                        />
                                    </View>

                                    <View style={{ backgroundColor: colors.white, marginTop: 10 }}>
                                        <VerticalSeparator height={10}/>
                                        <Input name={"review"}
                                               control={control}
                                               multiline={true}
                                               defaultValue={data.reviewDesc}
                                               rules={{required: {
                                                       value: true,
                                                       message: "Ingresar texto"
                                                   }}}
                                        />
                                    </View>
                                    <VerticalSeparator height={30}/>

                                    <PrimaryButton disabled={isRequestOnFlight} text={"Guardar reseña"} onPress={ handleSubmit(saveReview)}/>
                                    <VerticalSeparator height={30}/>
                                </View>
                            </>
                            ):(
                                data.bookingStatus === "ACEPTADA" && !isCurrent &&
                                    <View style={{marginHorizontal: 24, paddingTop: 25}}>
                                        <PrimaryButton text={"Cancelar reserva"} onPress={() => cancelBooking()}/>

                                    </View>
                            )
                        }
                    </>
                }
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
       flex: 1,
    },
    imgWrapper: {
        height:100,
        width: 100
    },
    img: {
        height: "100%",
        width: "100%",
        borderRadius: 10
    },
})

export default BookingDetail