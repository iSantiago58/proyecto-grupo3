import React from "react"
import colors from "../../constants/colors";
import {Image, View, StyleSheet, TouchableOpacity} from "react-native";
import H1 from "../headline/H1";
import VerticalSeparator from "../VerticalSeparator";
import StarSvg from "../svg/StarSvg";
import Body from "../body/Body";

interface Props {
    imageSource?: string
    title: string
    description: string
    qualification: string
    price: string
    onPress: () => void
    photo: string
}

const Card = (props: Props) => {
    return(
        <TouchableOpacity style={styles.wrapper} onPress={props.onPress}>
            <View style={styles.imgContainer}>
                <Image source={{uri: props.photo}} height={106} width={216} style={styles.img}/>
            </View>
            <View style={styles.titleContainer}>
                <View style={styles.title}>
                    <H1 numberOfLines={2} lineHeight={19} fontSize={18} textAlign={"left"}>{props.title}</H1>
                </View>
                <VerticalSeparator height={7}/>
                <View style={styles.qualification}>
                    <StarSvg height={16} color={colors.primary} />
                    <Body lineHeight={19}> {props.qualification}</Body>
                </View>
            </View>
            <View style={{paddingHorizontal:5}}>
                <H1 color={colors.grey60} fontSize={14} lineHeight={16} numberOfLines={2}>{props.description}</H1>
            </View>
            <View style={styles.price}>
                <H1 fontSize={14} lineHeight={15}>$ {props.price} x noche</H1>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.white,
        borderRadius: 20,
        height: 300,
        marginHorizontal: 15,
        marginTop: 15
    },
    imgContainer: {
        flexDirection:"row",
        height:"65%",
        marginBottom:10
    },
    img: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: "100%",
        width: "100%"
    },
    titleContainer: {
        flexDirection: "row",
        marginBottom: 8,
        paddingHorizontal: 5
    },
    title: {
        alignItems:"flex-start",
        flex:5
    },
    qualification: {
        alignItems:"flex-start",
        flexDirection:"row",
        flex:1,
        justifyContent:"flex-end",
    },
    price: {
        paddingHorizontal:5,
        justifyContent:"flex-end",
        flex:1,
        marginBottom: 6
    }

})

export default Card
