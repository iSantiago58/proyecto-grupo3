import React from "react"
import { View, StyleSheet } from "react-native"
import Avatar from "../assets/svg/Sasuke.svg"
import H1 from "./headline/H1"
import {AirbnbRating} from "react-native-ratings"
import colors from "../constants/colors"
import SvgManAvatar from "./svg/ManAvatar";
import SvgWomanAvatar from "./svg/WomanAvatar";
import SvgGenericAvatar from "./svg/GenericAvatar";

interface Props {
    rating: number
    hostName: string
    photo: string
}

const HostCard = (props: Props) => {

    return (
        <View style={styles.wrapper}>
            <View style={styles.avatar}>
                {props.photo === "0" ? (
                    <SvgManAvatar/>
                ) : props.photo === "1" ? (
                    <SvgWomanAvatar/>
                ) : (
                    <SvgGenericAvatar/>
                )}
            </View>
            <View style={{ marginLeft:60 }}>
                <H1 textAlign={"center"} fontSize={15} lineHeight={18}>{props.hostName}</H1>
                <AirbnbRating
                    count={5}
                    defaultRating={props.rating}
                    size={15}
                    isDisabled={true}
                    showRating={false}
                    selectedColor={colors.primary}
                    unSelectedColor={colors.white}
                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'rgba(63, 55, 165, 0.3)',
        borderWidth: 3,
        borderColor: "#3F37A5",
        borderRadius: 10,
        paddingVertical: 0
    },
    avatar: {
        position:"absolute",
        overflow:"visible",
        bottom:-12,
        left:-11,
    }


})

export default HostCard