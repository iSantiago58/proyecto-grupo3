import React, {useState} from "react"
import {Image, ScrollView, View, StyleSheet, TouchableOpacity, ActivityIndicator, Modal, Text} from "react-native";
import H1 from "../components/headline/H1";
import colors from "../constants/colors";
import StarSvg from "../components/svg/StarSvg";
import Body from "../components/body/Body";
import VerticalSeparator from "../components/VerticalSeparator";
import moment from "moment";
import {PrimaryButton} from "../components/button/PrimaryButton";
import {useNavigation} from "@react-navigation/native";
import {useAtom} from "jotai";
import {loggedInUser, userAlias} from "../appState/atoms";
import BookingService from "../services/BookingService"
import {WebView} from 'react-native-webview';

const BookingResume = ({route}: any ) => {
    const {data} = route.params
    const [user] = useAtom(loggedInUser)
    const navigation = useNavigation()
    const [showGateway, setShowGateway] = useState(false);
    const [prog, setProg] = useState(false);
    const [progClr, setProgClr] = useState('#000');
    const [url, setUrl] = useState<string>("")
    const [alias] = useAtom(userAlias)

    let start =  moment(data.startDate, "DD-MM-YYYY")
    let end = moment(data.endDate, "DD-MM-YYYY")
    let range = end.diff(start, 'days')

    const payment = async () => {
        let payload = {
            idAccommodation: data.id,
            aliasGuest: alias,
            start_date: data.startDate,
            end_date: data.endDate
        }


        const verified = await BookingService.verify(payload)
        if (!!!verified) {
            payload.start_date = moment(payload.start_date, "DD/MM/YYYY").format("DD/MM/YYYY")
            payload.end_date = moment(payload.end_date, "DD/MM/YYYY").format("DD/MM/YYYY")

            const response = await BookingService.booking(payload)
            let split = response.split("redirect:")
            console.log(split[1])
            setUrl(split[1])
            setShowGateway(true)
        }

    }

    return (
        <ScrollView style={{flex:1}}>
            <View style={styles.wrapper}>
                <View style={styles.imgWrapper}>
                    <Image source={{uri: data.photo}} height={106} width={216} style={styles.img}/>
                </View>
                <View style={{flex:1, marginLeft: 10}}>
                    <H1 fontSize={16} lineHeight={20} numberOfLines={1}>{data.name}</H1>
                    <VerticalSeparator height={5}/>
                    <Body fontSize={14} lineHeight={18} numberOfLines={2}>{data.description}</Body>
                    <View style={styles.rating}>
                        <View style={{marginBottom: 3}}>
                            <StarSvg height={16} color={colors.primary} />
                        </View>
                        <Body lineHeight={19}>{data.rating}</Body>
                    </View>
                </View>
            </View>

            <View style={styles.cards}>
                <H1 fontSize={25}>Tu viaje </H1>
                <VerticalSeparator height={10}/>
                <H1 fontSize={18}>Inicio </H1>
                <Body fontSize={15}>{data.startDate}</Body>
                <VerticalSeparator height={10}/>
                <H1 fontSize={18}>Fin </H1>
                <Body fontSize={15}>{data.endDate}</Body>
            </View>

            <View style={styles.cards}>
                <H1 fontSize={25}>Detalles del precio</H1>
                <VerticalSeparator height={10}/>
                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <Body fontSize={15}>$ {data.price} x {range} noches</Body>
                    <Body fontSize={15}>$ {data.price*range}</Body>
                </View>
                <VerticalSeparator height={15}/>
                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <H1 fontSize={18}>TOTAL (USD)</H1>
                    <Body fontSize={15}>$ {data.price*range}</Body>
                </View>
            </View>

            <View style={styles.cards}>
                <H1 fontSize={25}>Política de cancelación</H1>
                <VerticalSeparator height={10}/>
                <Body fontSize={15} lineHeight={19}>
                    Si cancelas luego de que tu reserva haya sido aprobada, recibirás un reembolso 50% del precio total. {"\n\n"}
                    Si el anfitrion cancela tu reserva luego de haber sido aprobada, recibirás un reembolso del 100%.
                </Body>
                <VerticalSeparator height={40}/>
                <PrimaryButton text={"Pagar"} onPress={() => payment()}/>
            </View>
            <VerticalSeparator height={30}/>

            {showGateway && url!="" ? (
                <Modal
                    visible={showGateway}
                    onDismiss={() => setShowGateway(false)}
                    onRequestClose={() => setShowGateway(false)}
                    animationType={"fade"}
                    transparent>
                    <View style={styles.webViewCon}>
                        <View style={styles.wbHead}>
                            <TouchableOpacity
                                style={{paddingTop: 40, marginLeft:20}}
                                onPress={() => {setShowGateway(false), navigation.navigate("HomeScreen")}}>
                                <Text style={{color: colors.white}}>Salir</Text>
                            </TouchableOpacity>
                            <Text
                                style={{
                                    flex: 1,
                                    textAlign: 'center',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: colors.white,
                                    paddingTop: 40
                                }}>
                               Realizar pago
                            </Text>
                            <View style={{padding: 13, opacity: prog ? 1 : 0}}>
                                <ActivityIndicator size={24} color={progClr} />
                            </View>
                        </View>
                        <WebView
                            source={{uri: url}}
                            style={{flex: 1}}
                            onLoadStart={() => {
                                setProg(true);
                                setProgClr('#000');
                            }}
                            onLoadProgress={() => {
                                setProg(true);
                                setProgClr('#00457C');
                            }}
                            onLoadEnd={() => {
                                setProg(false);
                            }}
                            onLoad={() => {
                                setProg(false);
                            }}
                        />
                    </View>
                </Modal>
            ) : null}



        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        paddingHorizontal:20,
        flex:1,
        backgroundColor:colors.white,
        paddingVertical:10
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
    rating: {
        alignItems: "flex-end",
        flex:1,
        flexDirection:"row",
        marginBottom: 10
    },
    cards: {
        marginTop: 15,
        paddingHorizontal:20,
        flex:1,
        backgroundColor:colors.white,
        paddingVertical:10
    },
    webViewCon: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    wbHead: {
        height:100,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary,
        zIndex: 25,
        elevation: 2,
    },

})

export default BookingResume