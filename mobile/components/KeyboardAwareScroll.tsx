import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import React from "react"
import colors from "../constants/colors"

interface Props {
    children: React.ReactNode
}

const KeyboardAwareScroll = (props: Props) => (
    <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}
        keyboardShouldPersistTaps={"handled"}
        children={props.children}
        keyboardDismissMode={"interactive"}
        style={{backgroundColor: colors.white, paddingHorizontal: 24}}
    />
)

export default KeyboardAwareScroll