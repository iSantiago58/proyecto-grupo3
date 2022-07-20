import React from "react"
import colors from "../../constants/colors";
import {Image, View, StyleSheet, TouchableOpacity} from "react-native";
import H1 from "../headline/H1";
import {useNavigation} from "@react-navigation/native";

interface Props {
    image: string
    city: string
    province: string
    country: string
}

const CityCard = (props: Props) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.wrapper}
                          onPress={ () => navigation.navigate("FullScreen", {screen: "SearchResults", params: {country:props.country, province:props.province, city:props.city,startDate:"", endDate:"", features:[], services:[], priceFrom: 0, priceTo: 999999 }})
        }>
            <Image source={props.image} style={styles.img}/>
            <View style={styles.text}>
                <H1 fontSize={16} textAlign={"center"} lineHeight={19} color={colors.white} numberOfLines={2}>{props.city}</H1>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        height: 150,
        width: 130,
        backgroundColor: colors.primary,
        //marginLeft: 10,
        borderTopLeftRadius:5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    img: {
        width: 130,
        height: 90,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    text: {
        justifyContent:"center",
        flex:1
    }
})

export  default CityCard