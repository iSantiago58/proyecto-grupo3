import * as React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import ResetPassword from "../screens/ResetPassword";
import {CUSTOM_HEADER} from "./Tab";
import colors from "../constants/colors";
import EditProfile from "../screens/EditProfile";
import SearchResultsScreen from "../screens/SearchResultsScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/forgotPassword/Index";
import CodeScreen from "../screens/forgotPassword/CodeScreen";
import NewPasswordScreen from "../screens/forgotPassword/NewPasswordScreen";
import AccommodationDetailScreen from "../screens/AccommodationDetail";
import FilterScreen from "../screens/FilterScreen";
import BookingResume from "../screens/BookingResume";
import BookingDetail from "../screens/BookingDetail";
import chatDetail from "../screens/ChatDetail";
import PrivacyScreen from "../screens/PrivacyScreen";
import TermAndConditionsScreen from "../screens/TermAndConditionsScreen";

const Stack = createStackNavigator()
export default function FullScreenNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerBackTitleVisible: false }}>
            <Stack.Screen name={"ResetPassword"} component={ResetPassword} options={{title: "", ...CUSTOM_HEADER(colors.primary )}}/>
            <Stack.Screen name={"EditProfile"} component={EditProfile} options={{title: "", ...CUSTOM_HEADER(colors.primary )}}/>
            <Stack.Screen name={"SearchResults"} component={SearchResultsScreen} options={{title: "", ...CUSTOM_HEADER(colors.primary )}}/>
            <Stack.Screen name={'SignUpScreen'} component={SignUpScreen} options={{title: ""}}/>
            <Stack.Screen name={"ForgotPassword"} component={ForgotPasswordScreen} options={{title: "", ...CUSTOM_HEADER(colors.white, colors.black )}}/>
            <Stack.Screen name={"CodeScreen"} component={CodeScreen} options={{title: "", ...CUSTOM_HEADER(colors.white, colors.black ) }}/>
            <Stack.Screen name={"NewPassword"} component={NewPasswordScreen} options={{title: "", ...CUSTOM_HEADER(colors.white, colors.black)}} />
            <Stack.Screen name={"AccommodationDetail"} component={AccommodationDetailScreen} options={{title: "", headerShown:false}} />
            <Stack.Screen name={"FilterScreen"} component={FilterScreen} options={{title: "",  ...CUSTOM_HEADER(colors.primary, colors.white)}} />
            <Stack.Screen name={"BookingResume"} component={BookingResume} options={{title: "Detalle de la reserva", ...CUSTOM_HEADER(colors.white, colors.black)}} />
            <Stack.Screen name={"BookingDetail"} component={BookingDetail} options={{title: "Detalle de la reserva", ...CUSTOM_HEADER(colors.white, colors.black)}} />
            <Stack.Screen name={'ChatDetail'} component={chatDetail} options={{title: "", ...CUSTOM_HEADER(colors.white, colors.black)}}/>
            <Stack.Screen name={"Privacy"} component={PrivacyScreen} options={{title: "", ...CUSTOM_HEADER(colors.white, colors.black)}}/>
            <Stack.Screen name={"TermsAndConditions"} component={TermAndConditionsScreen} options={{title: "", ...CUSTOM_HEADER(colors.white, colors.black)}}/>

        </Stack.Navigator>
    )
}
