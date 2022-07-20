import React from "react"
import {StyleSheet, View} from "react-native"


interface Props {
    children: JSX.Element | JSX.Element[]
}

const FormContainer = (props: Props) => {
    return (
        <View>
            {React.Children.map(props.children, (child) => (
                <View style={styles.child}>{child}</View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    child: {
        marginTop: 20,
    }


})


export default FormContainer