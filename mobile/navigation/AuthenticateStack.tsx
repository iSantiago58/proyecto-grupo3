import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import LoginScreen from "../screens/LoginScreen";

const AuthenticateStack = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen name={'LoginScreen'} options={{title: ""}} component={LoginScreen}/>
        </Stack.Navigator>
    )
}

export default AuthenticateStack