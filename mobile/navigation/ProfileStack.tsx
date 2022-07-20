import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import ProfileScreen from "../screens/ProfileScreen"
import LoginScreen from "../screens/LoginScreen"
import {CUSTOM_HEADER} from "./Tab";
import colors from "../constants/colors"

const ProfileStack = () => {
    const ProfileStack = createStackNavigator()
    return(
        <ProfileStack.Navigator >
            <ProfileStack.Screen name={"ProfileScreen"} component={ProfileScreen} options={{title: "", ...CUSTOM_HEADER(colors.primary )}}/>
            <ProfileStack.Screen name={"Login"} component={LoginScreen} />
        </ProfileStack.Navigator>
    )
}

export default ProfileStack