import React, {useEffect, useState} from "react"
import {View, StyleSheet, Platform, ScrollView, TouchableOpacity, Alert, Dimensions} from "react-native"
import H1 from "../components/headline/H1"
import VerticalSeparator from "../components/VerticalSeparator"
import Line from "../components/Line"
import useAccommodation from "../hooks/useAccommodation"
import colors from "../constants/colors"
import Chip from "../components/Chip"
import { SliderBox } from "react-native-image-slider-box"
import {useSafeAreaInsets} from "react-native-safe-area-context"
import Body from "../components/body/Body"
import ChipContainer from "../components/ChipContainer"
import HostCard from "../components/HostCard"
import ArrowBack from "../components/svg/ArrowBack"
import { useNavigation } from "@react-navigation/native"
import {PrimaryButton} from "../components/button/PrimaryButton"
import {Calendar} from "react-native-calendars"
import {cutDate} from "../utils/userUtils"
import moment from "moment"
import Modal from 'react-native-modal'
import SvgIconClose from "../components/svg/SvgIconClose"
import Carousel from 'react-native-reanimated-carousel'
import Avatar from "../assets/svg/Sasuke.svg"
import {AirbnbRating} from "react-native-ratings"
import {useAtom} from "jotai";
import {isUserLoggedInAtom} from "../appState/atoms"
import BookingService from "../services/BookingService"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {imageUrl, Storage} from "../constants/app"
import { MaterialIcons } from '@expo/vector-icons';
import AccommodationService from "../services/AccommodationService";
import AuthenticateService from "../services/AuthenticateService";
import {useLogin} from "../context/AuthProvider";

const AccommodationDetailScreen = ({route}: any) => {
    const {id,startDate,endDate, userAlias} =  route.params
    const [isUserLogged, setUserLogged]= useAtom(isUserLoggedInAtom)
    const [markedDates, setMarkedDates] = useState({})
    const [isStartDatePicked, setIsStartDatePicked] = useState(false)
    const [isEndDatePicked, setIsEndDatePicked] = useState(false)
    const [startDateCalendar, setStartDateCalendar] = useState(startDate)
    const [endDateCalendar, setEndDateCalendar] = useState(endDate)
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const { data, isFetching, isFetched, error } = useAccommodation(id, userAlias)
    const [images, setImages] = useState([])
    const [isLoadingImages, setIsLoadingImages] = useState<boolean>(true)
    const [showFavoriteIcon, setShowFavoriteIcon]= useState<boolean>(false)
    const [favIcon, setFavIcon] = useState<string>("favorite-border")
    const {isLoggedIn,setIsLoggedIn} = useLogin()

    const navigation = useNavigation()
    const SLIDER_WIDTH = Dimensions.get("window").width
    let date = new Date()
    date.setDate(date.getDate() + 2)
    const minDate = cutDate(date)
    let arr = []
    const baseOptions = {
        vertical: false,
        width: SLIDER_WIDTH
    }

    useEffect(() => {
        arr = []
        if(!isFetching) {
            data.photos.map(el => {
                arr.push(imageUrl+el.photo)
            })
            setImages(arr)
            setIsLoadingImages(false)
            if(isUserLogged){
                if(data.isFavorite){
                    setFavIcon("favorite")
                    setShowFavoriteIcon(true)
                }else{
                    setFavIcon("favorite-border")
                    setShowFavoriteIcon(true)
                }


            }
        }
    }, [isFetching])

    const onPressDate = (date) => {
        if(!isStartDatePicked){
            let markedDays = {}
            markedDays[date.dateString] = {startingDay: true,  color: colors.primary, textColor: '#FFFFFF'}
            setMarkedDates(markedDays)
            setStartDateCalendar(date.dateString)
            setIsStartDatePicked(true)
            setIsEndDatePicked(false)
            setEndDateCalendar("")
        } else {
            let markedDays = markedDates
            let start =  moment(startDateCalendar)
            let end = moment(date.dateString)
            let range = end.diff(start, 'days')
            if(range > 0){
                for (let i = 1; i <= range; i++) {
                    let tempDate = start.add(1, 'day');
                    tempDate = moment(tempDate).format('YYYY-MM-DD')
                    if (i < range) {
                        markedDays[tempDate] = { color: colors.primary, textColor: '#FFFFFF' };
                    } else {
                        markedDays[tempDate] = { endingDay: true, color: colors.primary, textColor: '#FFFFFF' };
                    }
                }
                setMarkedDates(markedDays)
                setIsStartDatePicked(false)
                setIsEndDatePicked(true)
                setEndDateCalendar(date.dateString)
            }else{
                Alert.alert("Error", "Debe seleccionar al menos dos dias.")
            }
        }
    }

    const goToLogin = () => {
        Alert.alert(
            "Inicia Sesión",
            "Para reservar inicia sesión.",
        )
    }

    const verifyDates = async () => {
        const alias = await AsyncStorage.getItem(Storage.USER_ALIAS)
        let payload = {
            idAccommodation: id,
            aliasGuest: alias,
            start_date: isEndDatePicked ? moment(startDateCalendar).format("DD-MM-YYYY") : startDateCalendar,
            end_date: isEndDatePicked ? moment(endDateCalendar).format("DD-MM-YYYY") : endDateCalendar,
        }

        try{
            const verified = await BookingService.verify(payload)
            if (verified) {
                setStartDateCalendar("")
                setEndDateCalendar("")
                Alert.alert(
                    "Elige otra fecha",
                    "Las fechas seleccionadas ya se encuentran ocupadas.",
                )
            } else {
                navigateTo()
            }
        }catch (e){
            if(e.status === 401){
                console.log("catch", e)
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
                    navigation.navigate("Home")
                })
            }
        }

    }

    const navigateTo = () => {
        let accommodation = {
            id: id,
            startDate: isEndDatePicked ? moment(startDateCalendar).format("DD-MM-YYYY") : startDateCalendar,
            endDate: isEndDatePicked ? moment(endDateCalendar).format("DD-MM-YYYY") : endDateCalendar,
            photo: images[0],
            name: data.accommodation.name,
            rating: 2,
            price: data.accommodation.price,
            description: data.accommodation.description
        }
        navigation.navigate("FullScreen", {screen: "BookingResume", params: {data: accommodation}})
    }

    const sendFavorite = async () => {
        const response = await AccommodationService.sendFavorite(id,userAlias)
        if(response === 200 ){
            if(favIcon === "favorite"){
                setFavIcon("favorite-border")
            }else{
                setFavIcon("favorite")
            }
        }
    }

    return (
        <>
            <ScrollView style={styles().wrapper}>
                <VerticalSeparator height={30}/>
                {isFetching || isLoadingImages ? (
                    <></>
                ): (
                    <>
                        {!isLoadingImages &&
                            <View style={styles().slider}>
                                <TouchableOpacity style={styles().arrow} onPress={ ()=> navigation.goBack() }>
                                    <ArrowBack/>
                                </TouchableOpacity>
                                {showFavoriteIcon &&
                                <TouchableOpacity style={styles().favIcon} onPress={ () =>sendFavorite()}>
                                    <MaterialIcons name={favIcon} size={24} color={favIcon === "favorite" ? "red" : "black"} />
                                </TouchableOpacity>}
                                <SliderBox
                                    images={images}
                                    sliderBoxHeight={250}
                                    resizeMethod={'resize'}
                                    resizeMode={'cover'}
                                    dotColor= {colors.white}
                                    inactiveDotColor={colors.grey60}
                                    disableOnPress={true}
                                    ImageComponentStyle = {styles().image}
                                />
                            </View>
                        }
                        <View style={{paddingHorizontal:24}}>
                            <H1 textAlign={"center"} fontSize={20} lineHeight={25}>{data.accommodation.name}</H1>
                            <VerticalSeparator height={5}/>
                            <Line/>
                            <VerticalSeparator height={20}/>
                            <View style={styles().detail}>
                                <H1 textAlign={"left"} fontSize={16} lineHeight={20}>Descripción</H1>
                                <VerticalSeparator height={10}/>
                                <Body fontSize={15} lineHeight={18}>{data.accommodation.description}</Body>
                                <VerticalSeparator height={20}/>
                                <Line/>
                                <VerticalSeparator height={20}/>
                                <H1 textAlign={"left"} fontSize={16} lineHeight={20}>Servicios</H1>
                                <VerticalSeparator height={10}/>
                                <ChipContainer>
                                    {data.services.map (el =>(
                                        el.value && <Chip key={el.name} text={el.name}/>
                                        )
                                    )}
                                </ChipContainer>
                                <VerticalSeparator height={20}/>
                                <H1 textAlign={"left"} fontSize={16} lineHeight={20}>Características</H1>
                                <VerticalSeparator height={20}/>
                                {data.features.map(el =>
                                    <>
                                        <H1 key={el.name} textAlign={"left"} fontSize={16} lineHeight={20}>{el.name}: {el.value}</H1>
                                        <VerticalSeparator height={5}/>
                                    </>
                                )}
                                <VerticalSeparator height={20}/>
                                <Line/>
                                <VerticalSeparator height={20}/>
                               <HostCard rating={data.host.qualification} hostName={data.host.name} photo={data.host.photo}/>
                               <VerticalSeparator height={40}/>
                            </View>
                        </View>
                        {data.reviews.length > 0 &&

                            <Carousel
                                {...baseOptions}
                                style={{ height:120, backgroundColor: "#F5F5F5",}}
                                mode={"parallax"}
                                modeConfig={{
                                    parallaxScrollingScale: 1,
                                    parallaxScrollingOffset: 0
                                }}
                                data={data.reviews}
                                renderItem={({ item, index }) =>
                                    <View style={{ backgroundColor: colors.white, width: SLIDER_WIDTH-48, borderRadius:10, padding:10, marginTop:10, elevation: 4,shadowOpacity: 0.26,
                                        shadowOffset: { width: 0, height: 2}, height: 100 }}>
                                        <View key={index} style={{ alignSelf:"flex-end", position: "absolute", overflow:"visible", top: 10, right:10 }}>
                                            <AirbnbRating
                                                count={5}
                                                defaultRating={2}
                                                size={15}
                                                isDisabled={true}
                                                showRating={false}
                                                selectedColor={colors.primary}
                                                unSelectedColor={colors.white}
                                                starContainerStyle={{backgroundColor: 'rgba(63, 55, 165, 0.3)', borderRadius: 10}}
                                            />
                                        </View>
                                        <View style={{flexDirection: "row", }}>
                                            <Avatar/>
                                            <View style={{marginLeft: 10, marginTop: 5, flex:1}}>
                                                <H1 fontSize={16} lineHeight={20}>{item.guestName}</H1>
                                                <H1 fontSize={14} lineHeight={18} numberOfLines={3}>{item.description}</H1>
                                            </View>
                                        </View>

                                    </View>
                                }
                            />
                        }
                    </>
                )}
            </ScrollView>
            {isFetched &&
                <View style={styles().bottom}>
                    <View>
                        <H1 textAlign={"left"} fontSize={15} lineHeight={18}>${data.accommodation.price} x noche</H1>
                        {!!startDateCalendar &&
                            <H1 textAlign={"left"} fontSize={10} lineHeight={18}>{ isEndDatePicked ? moment(startDateCalendar).format("DD-MM-YYYY") : startDateCalendar} - { isEndDatePicked ? moment(endDateCalendar).format("DD-MM-YYYY") : endDateCalendar }</H1>
                        }
                    </View>
                    <View style={{width: 150}}>
                        { !!!startDateCalendar ? (
                            <PrimaryButton text={"Seleccionar Fechas"} onPress={()=> setModalVisible(true)}/>
                        ):(
                            <PrimaryButton text={"Reservar"} onPress={ ()=> {!isUserLogged ? goToLogin() : verifyDates() }} />
                            )
                        }
                    </View>
                </View>
            }

            <Modal isVisible={modalVisible}
                   hasBackdrop={true}
                   animationInTiming={1000}
                   backdropColor={"rgba(0,0,0,1)"}
                   animationIn={"slideInUp"}
                   animationOut={"slideOutDown"}>
                <View style={{ borderRadius:10, backgroundColor: colors.white, paddingHorizontal:10 }}>
                    <TouchableOpacity style={{ alignItems: "flex-end", marginVertical:10 }} onPress={() => setModalVisible(false)}>
                        <SvgIconClose width={32} height={32} stroke={colors.white} fill={ colors.grey60 }/>
                    </TouchableOpacity>
                    <Calendar
                        hideExtraDays={true}
                        style={styles().calendar}
                        theme={{
                            arrowColor: colors.primary,
                        }}
                        current={minDate}
                        minDate={minDate}
                        markingType={'period'}
                        onDayPress={day => {
                            onPressDate(day);
                        }}
                        markedDates={markedDates}
                    />
                    <View style={{marginVertical: 20}}>
                        <PrimaryButton text={"Seleccionar"} onPress={() => setModalVisible(false)}/>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = () => {
    const insets = useSafeAreaInsets()
    return StyleSheet.create({
        wrapper: {
            backgroundColor: colors.white,
            flex: 1,
        },
        slider: {
            width: "100%",
            marginTop: Platform.OS === "android" ? -insets.top - 10 : -insets.top,
            marginBottom: 15
        },
        image:{
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20
        },
        detail: {
            flex:1,
        },
        arrow: {
            marginLeft: 10 ,
            position: "absolute",
            backgroundColor: colors.primary,
            overflow:"visible",
            top:20 + insets.top,
            zIndex:20,
            height: 40,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20
        },
        bottom:{
            height:50 + insets.bottom,
            backgroundColor:colors.white,
            alignItems:"center",
            paddingHorizontal:24 ,
            justifyContent:"space-between",
            flexDirection: "row",
            borderTopWidth: 1,
            borderTopColor: colors.grey60,
        },
        calendar: {
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 8,
        },
        btnSearch: {
            flex:1,
            justifyContent:"flex-end",
        },
        favIcon:{
            position: "absolute",
            backgroundColor: colors.white,
            overflow:"visible",
            top:20 + insets.top,
            right:10,
            zIndex:20,
            height: 40,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20
        }
    })
}

export default AccommodationDetailScreen