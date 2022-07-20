import React from "react"
import {Image, View, StyleSheet, Dimensions} from "react-native";
import H1 from "../headline/H1";
import colors from "../../constants/colors";
import {PrimaryButton} from "../button/PrimaryButton";

interface Props {
    text: string
    image: string
    marginTop: number
    onPress: () => void
}


const ExploreCard = (props: Props) => {
    const windowWidth = Dimensions.get("window").width
    return (
        <View style={styles(windowWidth,props.marginTop).wrapper}>
            <Image style={styles(windowWidth,props.marginTop).img} source={props.image} width={windowWidth-48} height={200} borderRadius={15}/>
            <View style={styles(windowWidth,props.marginTop).text}>
                <H1 textAlign={"center"} numberOfLines={2} fontSize={19} lineHeight={22} color={colors.white}>{props.text}</H1>
            </View>
            {/*<View style={styles(windowWidth,props.marginTop).btn}>*/}
            {/*    <PrimaryButton text={"Explora"} onPress={props.onPress}/>*/}
            {/*</View>*/}
        </View>
    )
}

const styles = (width: number, marginTop: number) =>  StyleSheet.create({
    wrapper: {
        flex:1,
        marginTop: marginTop,
        paddingHorizontal: 24
    },
    img: {
        height: 200,
        width: width-48,
        borderRadius: 15
    },
    text: {
        position: "absolute",
        overflow:"visible",
        alignItems: "center",
        alignSelf:"center",
        marginTop:25,
        paddingHorizontal: 10
    },
    btn: {
        position: "absolute",
        overflow:"visible",
        marginTop: 145,
        width: 130,
        alignSelf:"center"
    }

})



export default ExploreCard