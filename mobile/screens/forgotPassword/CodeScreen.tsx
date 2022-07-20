import React, {useState} from "react"
import {Text, StyleSheet, View} from "react-native"
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import colors from "../../constants/colors";
import H1 from "../../components/headline/H1";
import VerticalSeparator from "../../components/VerticalSeparator";
import {PrimaryButton} from "../../components/button/PrimaryButton";
import AuthenticateService from "../../services/AuthenticateService";
import {showMessage} from "react-native-flash-message";
import {useNavigation} from "@react-navigation/native";

const CELL_COUNT = 6;

const CodeScreen = ({route}: any) => {
    const {email} = route.params
    const [value, setValue] = useState<string>('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [sendingRequest, setSendingRequest] = useState<boolean>(false)
    const navigation = useNavigation()
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const sendCode = async () => {
        try {
            setSendingRequest(true)
            const response = await AuthenticateService.sendCode(email, value)
            console.log(response)
            navigation.navigate("FullScreen", {screen: "NewPassword", params: {email: email, code: value}} )


        } catch (error) {
            showMessage({
                message: error.mensaje,
                type: "danger",
            })
        } finally {
            setSendingRequest(false)
        }
    }

    const canConfirm = value.length === CELL_COUNT && !sendingRequest
    console.log(canConfirm)

    return (
        <View style={styles.wrapper}>
            <H1>Ingrese el código</H1>
            <VerticalSeparator height={30}/>
            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={{}}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />
            <View style={styles.btn}>
                <PrimaryButton disabled={!canConfirm} text={"Enviar"} onPress={() => sendCode()}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.white,
        flex: 1,
        paddingHorizontal: 24
    },
    cell: {
        width: 40,
        height: 50,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: colors.grey60,
        textAlign: 'center',
        paddingTop: 5
    },
    focusCell: {
        borderColor: colors.primary,
    },
    btn: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 35
    }
});

export default CodeScreen