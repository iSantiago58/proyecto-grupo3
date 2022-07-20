import * as React from "react"
import {createStackNavigator} from "@react-navigation/stack";
import Tab from "./Tab";
import FullScreenNavigator from "./FullScreenNavigator";
import FlashMessage from "react-native-flash-message";
import {Platform} from "react-native";

const Stack = createStackNavigator()
const Navigation = () => {
    return (
        <>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name={"Tab"} component={Tab}/>
                <Stack.Screen name={"FullScreen"} component={FullScreenNavigator}/>
            </Stack.Navigator>
            <FlashMessage position="top" floating={true} style={{marginTop: Platform.OS === "android" ? 30 : 0 }}/>
        </>
    )
}

export default Navigation