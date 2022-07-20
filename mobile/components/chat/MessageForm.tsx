import React from "react"
import {Button, StyleSheet, TextInput, TouchableOpacity, View} from "react-native"
import colors from "../../constants/colors"
import { MaterialIcons } from '@expo/vector-icons'

const MessageForm = ({handleSubmit, text, setText}) => {
    return (
        <View style={styles.view}>
            <TextInput placeholderTextColor={colors.grey60} placeholder={"Escribir mensaje..."} style={styles.input} value={text} onChangeText={e => setText(e)} />
            <TouchableOpacity style={styles.sendBtn} onPress={handleSubmit} >
                <MaterialIcons name="send" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}

export default MessageForm

const styles = StyleSheet.create({
    view: {
        flexDirection: "row",
        marginBottom: 10,
        alignItems:"center",
        paddingHorizontal: 3,
    },
    input: {
        flex:1,
        marginTop: 10,
        borderColor: colors.secondary,
        borderWidth: 1,
        backgroundColor: colors.white,
        fontSize: 14,
        minHeight: 50,
        borderRadius: 25,
        paddingHorizontal: 7,
        marginRight: 1
    },
    sendBtn: {
        height: 50,
        width: 50,
        alignSelf: "flex-end",
        borderRadius: 25,
        borderWidth:1,
        alignItems:"center",
        justifyContent:"center"
    }
});