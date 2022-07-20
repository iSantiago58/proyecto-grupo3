import React from "react"
import colors from "../constants/colors"
import {Image, TouchableOpacity, View, StyleSheet} from "react-native"
import H1 from "./headline/H1"
import VerticalSeparator from "./VerticalSeparator"
import Body from "./body/Body"
import BookingStatusChip from "./BookingStatusChip";


interface Props {
    bookingId: string
    accommodationName: string
    startDate: string
    endDate: string
    hostName: string
    bookingStatus: string
    photo: string
    onPress: () => void
}

const BookingCard = (props: Props) => {

    return (
        <TouchableOpacity style={styles.wrapper} onPress={props.onPress}>
            <View style={{flexDirection:"row"}}>
                <View style={styles.imgContainer}>
                    <Image source={{uri: props.photo}} height={80} width={110} style={styles.img} />
                </View>
                <View style={{marginHorizontal: 10, flex: 1}}>
                    <H1 numberOfLines={1} lineHeight={19} fontSize={18}>{props.accommodationName}</H1>
                    <VerticalSeparator height={5}/>
                    <Body fontSize={14} lineHeight={16}>{props.hostName}</Body>
                    <VerticalSeparator height={5}/>
                    <Body fontSize={14} lineHeight={16}>Desde: {props.startDate}</Body>
                    <Body fontSize={14} lineHeight={16}>Hasta: {props.endDate}</Body>
                    <BookingStatusChip type={props.bookingStatus}/>

                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create ({
    wrapper: {
        backgroundColor: colors.white,
        borderRadius: 20,
        marginHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 15
    },
    imgContainer: {
        height:115,
        width: 110,
        marginHorizontal: 10
    },
    img: {
        borderRadius: 10,
        height: "100%",
        width: "100%"
    }

})

export default BookingCard