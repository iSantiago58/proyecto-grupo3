import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import BookingScreen from "../screens/BookingScreen"
import {CUSTOM_HEADER} from "./Tab";
import colors from "../constants/colors";

const BookingStack = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator >
            <Stack.Screen name={'BookingScreen'} options={{title: "", ...CUSTOM_HEADER(colors.primary )}} component={BookingScreen}/>
        </Stack.Navigator>
    )
}

export default BookingStack