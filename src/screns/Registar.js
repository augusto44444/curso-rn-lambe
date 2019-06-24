import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from "react-native";
import { connect } from 'react-redux'
import { createUser } from '../store/actions/user'

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    }

    componentDidUpdate = prevProps => {
        if (prevProps.isLoading && !this.props.isLoading) {
            this.setState({
                name: '',
                email: '',
                password: ''
            })
            this.props.navigation.navigate('Feed')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder='Nome'
                    style={styles.input}
                    autoFocus={true}
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                />

                <TextInput
                    placeholder='E-mail'
                    style={styles.input}
                    keyboardType='email-address'
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                />

                <TextInput
                    placeholder='Senha'
                    style={styles.input}
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                />

                <TouchableOpacity
                    disabled={this.props.isLoading}
                    onPress={() => { this.props.onCreateUser(this.state) }}
                    style={[styles.button, this.props.isLoading ? styles.lock : {}]}>
                    <Text style={styles.buttomText}> Salvar </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#EEE',
        height: 40,
        borderWidth: 1,
        borderColor: '#333',
        paddingLeft: 15
    },
    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4',

    },
    buttomText: {
        fontSize: 20,
        color: '#FFF',
    },
    lock: {
        backgroundColor: '#AAA'
    }
});

const mapStateToProps = ({ user }) => {
    return {
        isLoading: user.isLoading
    }
}

const mapdispatchToProps = dispatach => {
    return {
        onCreateUser: user => dispatach(createUser(user))
    }
}

export default connect(mapStateToProps, mapdispatchToProps)(Register);