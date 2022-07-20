import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import ChatListScreen from "../screens/ChatListScreen"
import {CUSTOM_HEADER} from "./Tab";
import colors from "../constants/colors";


const ChatStack = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator >
            <Stack.Screen name={'ChatList'} options={{title: "", ...CUSTOM_HEADER(colors.primary )}} component={ChatListScreen}/>
        </Stack.Navigator>

    )
}

export default ChatStack