import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import HomeScreen from "../screens/HomeScreen"
import {backgroundColor} from "react-native-calendars/src/style";
import colors from "../constants/colors";


const HomeStack = () => {
    const HomeStack = createStackNavigator()
    return (
        <HomeStack.Navigator >
            <HomeStack.Screen name={'HomeScreen'} options={{title: "", headerShown:false}} component={HomeScreen}/>
        </HomeStack.Navigator>

    )
}

export default HomeStack