import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import FavoriteScreen from "../screens/FavoriteScreen";
import {CUSTOM_HEADER} from "./Tab";
import colors from "../constants/colors";

const FavoriteStack = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator >
            <Stack.Screen name={'FavoriteScreen'} options={{title: "", ...CUSTOM_HEADER(colors.primary )}} component={FavoriteScreen}/>
        </Stack.Navigator>
    )
}

export default FavoriteStack