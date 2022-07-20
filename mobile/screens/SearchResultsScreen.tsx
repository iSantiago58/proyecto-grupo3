import React, { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient"
import H6 from "../components/headline/H6"
import Card from "../components/card";
import {useNavigation} from "@react-navigation/native";
import useSearch from "../hooks/useSearch";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu'
import AccommodationService from "../services/AccommodationService";
import VerticalSeparator from "../components/VerticalSeparator";
import Svg, {Rect} from "react-native-svg";
import Background from "../components/Background";
import {imageUrl, Storage} from "../constants/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchLoader from "../components/SearchLoader";
import EmptyBookingSvg from "../assets/svg/emptyStates/EmptyOvni.svg";
import H1 from "../components/headline/H1";

const SearchResultsScreen = ({route}: any) => {
    const {country,province,city, startDate, endDate, services, features, priceFrom, priceTo } = route.params
    const { data, isFetching, isFetched } = useSearch(country,province,city,startDate,endDate,features,services, priceFrom, priceTo)
    const navigation = useNavigation()
    const [visible, setVisible] = useState(false)
    const [isSorting, setIsSorting] = useState(false)
    const [result, setResult] = useState(null)
    const hideMenu = () => setVisible(false)
    const [userAlias, setUserAlias] = useState<string>("")

    const user =  async () => {
        let alias = await AsyncStorage.getItem(Storage.USER_ALIAS)
        return alias
    }

    useEffect(() => {
        user().then(async response => {
            setUserAlias(response)
        })
    })

    const showMenu = () => {
        setVisible(true);}

    useEffect(()=> {
        if(data!=undefined){
            console.log("search",data)
        }
    },[data])

    useEffect(()=> {
        if(isFetched){
            setResult(data)
        }
    },[isFetched])

    useEffect(()=> {
        console.log(result)
    })

    const orderBy = async (param: string) => {
        hideMenu()
        setIsSorting(true)
        let result
        if(param === "desc"){
            result = await AccommodationService.orderBy(data,'desc')

        }else if(param==="asc"){
            result = await AccommodationService.orderBy(data,'asc')
        }else{
            result = await AccommodationService.orderBy(data,'rating')
        }
        setResult(result)
        setIsSorting(false)
    }

    return (
        <ScrollView style={{ flex:1, backgroundColor:colors.white }} >
                <>
                    <View style={{height: "100%", width: "100%", position: "absolute", top:-400}}>
                        <Background x={0} y={0} topColor={colors.primary} bottomColor={colors.white} height={800}/>
                    </View>

                    <LinearGradient
                    colors={['#0064BB', 'transparent']}
                    style={styles.background}
                    start={{ x: 0, y: 0.1 }}
                >
                    <>
                    {isFetching || isSorting  ? (
                        <SearchLoader/>
                    ): (
                        <>
                        <H6 color={colors.white} textAlign={"center"}>¿Que estás buscando?</H6>
                        <View style={{alignItems: "flex-end", paddingRight:24}}>
                            <Menu
                                visible={visible}
                                anchor={<Text style={{color: colors.white}} onPress={showMenu}>Ordenar</Text>}
                                onRequestClose={hideMenu}>
                                <MenuItem onPress={()=>orderBy('asc')}>Menor precio</MenuItem>
                                <MenuItem onPress={()=>orderBy('desc')}>Mayor precio</MenuItem>
                                <MenuItem onPress={()=>orderBy('rating')}>Mejor calificación</MenuItem>
                                <MenuDivider />

                            </Menu>
                        </View>
                            {!!result && result.length>0 ? (
                            data.map(el => (
                                <Card key={el.id}
                                      onPress={() => navigation.navigate("FullScreen", { screen: "AccommodationDetail", params: { id: el.id, startDate: startDate, endDate: endDate, userAlias: userAlias }})}
                                      title={el.name}
                                      description={el.description}
                                      qualification={el.rating}
                                      price={el.price}
                                      photo={imageUrl+el.photo}
                                />
                                ))

                            ):(
                                <View style={{flex:1,alignItems:"center"}}>
                                    <EmptyBookingSvg/>
                               </View>
                            )}
                        </>
                        )}
                    </>
            </LinearGradient>
                </>
            <VerticalSeparator height={50}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    background: {
        flex:1,
    }
})

export default SearchResultsScreen