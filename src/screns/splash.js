import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

class Splash extends Component {
    componentDidMount = () => {
        setTimeout(
            () => { this.props.navigation.navigate("App") },
            2000
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../assets/imgs/icon.png')} 
                    style={styles.img}/>
                <Text style={styles.header}>Craudio</Text>
            </View>
        );
    }
}
export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        height: 200,
        width: 200,
        resizeMode: 'contain',

    },
    header: {
        fontFamily: 'shelter',
        color: 'black',
        fontSize: 50,
        fontWeight: 'bold'
    }
});