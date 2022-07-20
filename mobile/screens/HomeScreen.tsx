import React from "react"
import {ScrollView, Text, TouchableOpacity, View, StyleSheet, SafeAreaView} from "react-native"
import {useNavigation} from "@react-navigation/native";
import colors from "../constants/colors";
import H1 from "../components/headline/H1";
import VerticalSeparator from "../components/VerticalSeparator";
import CityCard from "../components/homeCards/CityCard";
import HorizontalSeparator from "../components/HorizontalSeparator";
import ExploreCard from "../components/homeCards/ExploreCard";
import Background from "../components/Background";

const HomeScreen = () => {
    const navigation = useNavigation()
    const puntaImage = require("../assets/PuntaDesEste.png")
    const bestPlaces = require("../assets/BestPlaces.png")

    const citys = [
        {
            image: require("../assets/piriapolis.jpg"),
            country: "Uruguay",
            province: "Departamento de Maldonado",
            city: "Piriápolis"
        },
        {
            image: require("../assets/colonia.jpg"),
            country: "Uruguay",
            province: "Departamento de Colonia",
            city: "Colonia del Sacramento"
        },
        {
            image: require("../assets/punta.jpg"),
            country: "Uruguay",
            province: "Departamento de Maldonado",
            city: "Punta del Este"
        },
    ]

    return (
        <>
            <SafeAreaView style={{backgroundColor: colors.primary}}/>

            <ScrollView style={styles.wrapper}>
                <View style={{height: "100%", width: "100%", position: "absolute", top:-400}}>
                    <Background x={0} y={0} topColor={colors.primary} bottomColor={colors.white}/>
                </View>
                <View style={styles.header}>
                    <View style={{paddingHorizontal: 24, }}>
                        <Text style={styles.text}>Busca los mejores lugares donde descansar, disfrutar y conocer</Text>
                        <TouchableOpacity style={styles.searchBtn} onPress={() => navigation.navigate("FullScreen", {screen: "FilterScreen"})}>
                            <H1 fontSize={16} color={colors.white}>Buscar</H1>
                        </TouchableOpacity>
                    </View>
                </View>

                <ExploreCard text={"Encuentra nuevas novedades y experiencias de vida"} image={puntaImage} marginTop={-100} onPress={()=> {}}/>

                <VerticalSeparator height={30}/>
                <H1 textAlign={"center"} fontSize={22} lineHeight={25}>Visita los mejores lugares</H1>
                <VerticalSeparator height={10}/>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginHorizontal:24}}>
                    {citys.map((city, index) => (
                        <>
                            <CityCard key={index} image={city.image}  city={city.city} country={city.country} province={city.province} />
                            {index !==2 && <HorizontalSeparator width={10}/>}
                        </>

                    ))}
                </ScrollView>

                <ExploreCard text={"Encuentra los mejores lugares donde hospedarte"} image={bestPlaces} marginTop={20} onPress={()=> {}}/>
                <VerticalSeparator height={30}/>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        backgroundColor: colors.white,
    },
    text: {
        fontSize: 16,
        color: colors.white,
        textDecorationLine: "underline",
        lineHeight: 22
    },
    searchBtn: {
        height: 44,
        borderWidth:1,
        borderColor: colors.white,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 50,
        paddingLeft:10,
        justifyContent:"center"
    },
    header: {
        backgroundColor: colors.primary,
        height: 300,
        paddingTop:50
    }
})

export default HomeScreen