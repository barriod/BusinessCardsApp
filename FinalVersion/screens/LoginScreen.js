import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";

export default class LoginScreen extends React.Component {
    /*
    * navigates to the contact list screen
    * */
    login = () => {
        this.props.navigation.navigate("Main");
    };

    /*
    * lifecycle function to render the login screen
    * */
    render() {
        return (
            <TouchableOpacity style={styles.touchableOpacityStyle} onPress={() => this.login()}>
                <View style={styles.containerViewStyle}>
                    <ImageBackground source={require("../Photos/Wave1.jpg")}
                                     style={[styles.imageBackgroundStyle, {justifyContent: 'center'}]}>
                        <View>
                            <View style={styles.hermesView}/>
                            <Text style={styles.hermesText}>Hermes</Text>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    touchableOpacityStyle: {
        flex: 1,
    },
    containerViewStyle: {
      flex: 1,
    },
    imageBackgroundStyle: {
        flex: 1,
    },
    hermesView: {
        width: 200,
        height: 65,
        alignSelf: 'center',
        backgroundColor: 'black',
        opacity: .75
    },
    hermesText: {
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 50,
        color: 'white'
    }
});
