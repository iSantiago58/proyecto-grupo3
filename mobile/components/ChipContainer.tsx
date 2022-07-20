import React from "react"
import {StyleSheet, View} from "react-native"


interface Props {
    children: JSX.Element | JSX.Element[]
}

const ChipContainer = (props: Props) => {
    return (
        <View style={styles.wrapper}>
            {React.Children.map(props.children, (child) => (
                <View style={styles.child}>{child}</View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    child: {
        marginTop: 10,
        marginHorizontal:5
    },
    wrapper:{
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent: "center"
    }
})

export default ChipContainer