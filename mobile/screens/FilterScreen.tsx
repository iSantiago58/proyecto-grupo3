import React, {useEffect, useRef, useState} from "react"
import {Alert, Modal, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native"
import {Calendar} from "react-native-calendars"
import {PrimaryButton} from "../components/button/PrimaryButton"
import {useNavigation} from "@react-navigation/native"
import {cutDate} from "../utils/userUtils"
import colors from "../constants/colors"
import moment from "moment"
import Input from "../components/textInput/Input"
import VerticalSeparator from "../components/VerticalSeparator"
import H1 from "../components/headline/H1"
import useServices from "../hooks/useServices"
import {useForm} from "react-hook-form"
import Ionicons from "@expo/vector-icons/Ionicons"
import { FontAwesome5 } from '@expo/vector-icons'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import SvgIconClose from "../components/svg/SvgIconClose";
import {LinearGradient} from "expo-linear-gradient"
import Line from "../components/Line";

const FilterScreen = () => {
    const [markedDates, setMarkedDates] = useState({})
    const [isStartDatePicked, setIsStartDatePicked] = useState(false)
    const [isEndDatePicked, setIsEndDatePicked] = useState(false)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [showFilterModal, setShowFilterModal] = useState(false)
    const navigation = useNavigation()
    const {data, isFetched} = useServices()
    const {control, handleSubmit,  formState: { errors }} = useForm()
    const [services, setServices] = useState([])
    const [features, setFeatures] = useState([])
    const [arrayLenght, setArrayLenght] = useState(0)
    const [country, setCountry] = useState("Uruguay")
    const [province, setProvince] = useState("Canelones")
    const [city, setCity] = useState("Solymar")
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(999999)
    const [isDisabledButton, setIsDisabledButton] = useState<boolean>(true)

    const GOOGLE_PLACES_API_KEY = 'AIzaSyA3XmL2LFC7l7KoI5PxkrEHBPQ0682Qefg';

    let date = new Date()
    date.setDate(date.getDate() + 2)
    const minDate = cutDate(date)

    const ref = useRef();

    useEffect(() => {
        ref.current?.setAddressText('Some Text');
    }, []);

    const onPressDate = (date) => {
        if(!isStartDatePicked){
            let markedDays = {}
            markedDays[date.dateString] = {startingDay: true,  color: colors.primary, textColor: '#FFFFFF'}
            setMarkedDates(markedDays)
            setStartDate(date.dateString)
            setIsStartDatePicked(true)
            setIsEndDatePicked(false)
            setEndDate("")
        } else{
            let markedDays = markedDates
            let start =  moment(startDate)
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
                setEndDate(date.dateString)
            }else{
                Alert.alert("Error", "Debe seleccionar al menos dos dias.")
            }
        }
    }

    const saveFilter = async (feat: any) => {
        console.log(feat)

        if(feat.priceFrom != ""){
            setMinPrice(feat.priceFrom)
        }
        if(feat.priceTo!=""){
            setMaxPrice(feat.priceTo)
        }

        let resultFeatures = []
        let arrFeatureValues = Object.values(feat)
        arrFeatureValues.map((el, index) => {
            if(el!== " "){
                resultFeatures.push(data.caracteristicas[index].id+"-"+el)
            }
        })
        setFeatures(resultFeatures)
    }

    const serv = (ele: any) => {
        let arr = services
        if(services.length > 0 ){
            let find = services.findIndex(x => x === ele )
            if(find!== -1){
                arr.splice(find,1)
            }else{
                arr.push(ele)
            }
        }else{
            arr.push(ele)
        }
        setServices(arr)
        setArrayLenght(arr.length)
    }

    const serviceIsSelected = (id: number) => {
        let find = services.findIndex(x => x === id )
        return find!== -1
    }

    const search = async () => {
        let sDate = ""
        let eDate = ""
        if(isStartDatePicked && !isEndDatePicked){
            Alert.alert("Error", "Debe seleccionar fecha de finalizacion")
        }else{

            if(startDate!="" && endDate!=""){
                sDate = moment(startDate).format('DD-MM-YYYY')
                eDate = moment(endDate).format('DD-MM-YYYY')
            }
        }
        navigation.navigate("FullScreen", {screen: "SearchResults", params: {country:country, province:province, city:city,startDate:sDate, endDate:eDate, features:features, services:services, priceFrom: minPrice, priceTo: maxPrice }})
    }

    const setLocation = (location: any) => {
        if(location.terms.length === 3){
            setCity(location.terms[0].value)
            setProvince(location.terms[1].value)
            setCountry(location.terms[2].value)
            setIsDisabledButton(false)
        }else{
            setIsDisabledButton(true)
            Alert.alert("Localidad no válida", "Debe seleccionar una localidad válida.")
        }
    }

    return (
        <>

                <View style={styles.wrapper} >
                    <LinearGradient
                        colors={['#0064BB', 'transparent']}
                        style={{flex:1}}
                        start={{ x: 0, y: 0 }} >
                        <View style={{paddingHorizontal: 24, flex:1, paddingBottom: 30}}>
                            <View style={{ flexDirection: "row"}}>
                                <GooglePlacesAutocomplete
                                    styles={{
                                        textInputContainer: {
                                            borderWidth:1,
                                            borderRadius: 7,
                                            borderColor: colors.white,
                                            height: 44
                                        },
                                    }}
                                    placeholder="¿Dónde quieres ir?"
                                    query={{
                                        key: GOOGLE_PLACES_API_KEY,
                                        language: 'es', // language of the results
                                    }}
                                    textInputProps={{
                                        placeholderTextColor: colors.grey60,
                                    }}
                                    onPress={(data, details = null) => { setLocation(data) }}
                                    onFail={(error) => console.error(error)}
                                />
                                <TouchableOpacity style={styles.btnFilter} onPress={() => setShowFilterModal(true)}>
                                    <FontAwesome5 name="sliders-h" size={24} color="white" />
                                </TouchableOpacity>
                            </View>

                            <VerticalSeparator height={30}/>
                            <H1 fontSize={15} lineHeight={20} color={colors.white}>Seleccionar fechas</H1>
                            <VerticalSeparator height={20}/>
                            <Calendar
                                hideExtraDays={true}
                                style={styles.calendar}
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
                            <View style={styles.btnSearch}>
                                <PrimaryButton disabled={isDisabledButton} text={"Buscar"} onPress={() => search()}/>
                            </View>
                        </View>

            </LinearGradient>

                <Modal visible={showFilterModal} presentationStyle={"pageSheet"} animationType={"slide"}>
                    <View style={{paddingTop: 15,borderBottomColor: colors.primary, borderBottomWidth:1, flexDirection: "row", justifyContent:"center", paddingBottom:15}}>
                        <View style={{ alignSelf:"center"}}>
                            <H1 fontSize={18} lineHeight={20}> Filtros</H1>
                        </View>
                        <TouchableOpacity style={{marginTop:10, marginBottom: 10,  right:15, position: "absolute", height: 40, width: 40, alignItems:"center"}} onPress={() => setShowFilterModal(false)}>
                            <SvgIconClose stroke={"black"} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{paddingHorizontal: 24, flex:1}} >
                        <VerticalSeparator height={30}/>
                        <H1 fontSize={18} lineHeight={20}>Rango de precios</H1>
                        <VerticalSeparator height={20}/>
                        <View style={{flexDirection: "row", marginBottom: 30}}>
                            <View style={{width:"30%"}}>
                                <Input name={"priceFrom"} keyboardType={"numeric"} mask={"phone"} control={control} label={"Minimo"} placeholder={"$0"} defaultValue={""}  />
                            </View>
                            <View style={{width:"30%", marginLeft: 10}}>
                                <Input name={"priceTo"} keyboardType={"numeric"} mask={"phone"} control={control} label={"Maximo"} placeholder={"$9999999"} defaultValue={""} />
                            </View>
                        </View>

                        <Line/>
                        <VerticalSeparator height={30}/>
                        <H1 fontSize={18} lineHeight={20}>Caracteristicas</H1>
                        <VerticalSeparator height={30}/>
                        {isFetched && data.caracteristicas.map(elem =>
                            (
                                <View key={elem.name} style={styles.modalRow}>
                                    <H1 key={elem.id+"hghgch"} fontSize={16}>{elem.name}</H1>
                                    <View key={"view"+elem.id} style={styles.featureInput}>
                                        <Input mask={"number"} errors={errors} keyboardType={"number-pad"} name={`${elem.id}`} control={control} maxLength={1} defaultValue={""}/>
                                    </View>
                                </View>
                            )
                        )}
                        <VerticalSeparator height={20}/>
                        <Line/>
                        <VerticalSeparator height={30}/>
                        <H1 fontSize={18} lineHeight={20}>Servicios</H1>
                        <VerticalSeparator height={30}/>
                        {isFetched && arrayLenght!=-1 && data.servicios.map(elem =>
                            (
                                <View key={elem.name} style={styles.modalRow}>
                                    <H1 key={elem.id+"hghgch"} fontSize={16}>{elem.name}</H1>
                                    <TouchableOpacity key={`${elem.id}`} onPress={()=> serv(elem.id)}
                                                      style={{backgroundColor: serviceIsSelected(elem.id) ? colors.black: "white", borderWidth:1, borderRadius: 5, marginLeft: 10, width:30, alignItems:"center", justifyContent:"center", marginBottom:15}}>
                                        <Ionicons name="md-checkmark" size={25} color= "white" />
                                    </TouchableOpacity>
                                </View>
                            )
                        )}
                        <View style={styles.btnSearch}>
                            <PrimaryButton text={"Guardar"} onPress={handleSubmit((e) => {saveFilter(e), setShowFilterModal(false)})}/>
                            <VerticalSeparator height={30}/>
                        </View>
                    </ScrollView>
                </Modal>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex:1,
        backgroundColor: colors.white
    },
    inputFilter: {
        height: 44,
        borderRadius: 20,
        borderWidth:1,
        flex:1,
        paddingLeft: 10,
        marginRight: 3
    },
    btnFilter: {
        marginTop: 3,
        marginLeft:5,
        height: 44,
        width: 40,
        alignItems: "flex-end",
        justifyContent:"center"
    },
    calendar: {
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 8,
    },
    btnSearch: {
        flex:1,
        justifyContent:"flex-end",
        //paddingBottom: 35
       // marginBottom: 35
    },
    modalRow: {
        flexDirection:"row",
        justifyContent: "space-between",
        marginLeft:1
    },
    featureInput: {
        height: 50,
        width:50, marginLeft:15
    },
})

export default FilterScreen