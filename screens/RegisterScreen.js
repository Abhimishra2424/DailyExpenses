import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    SafeAreaView,
    Pressable,
    Alert,
} from "react-native";
import { useAppContext } from "../context/appContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
    const { registerUser, token } = useAppContext();
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const requestOptions = {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    };

    const handleRegister = async () => {
        try {
            if (name.trim() === "") {
                Alert.alert("Error", "Please enter your name");
                return;
            }

            if (email.trim() === "") {
                Alert.alert("Error", "Please enter your email");
                return;
            }

            if (password.trim() === "") {
                Alert.alert("Error", "Please enter your password");
                return;
            }

            await fetch("http://192.168.0.110:5000/api/register", requestOptions).then(
                (response) => {
                    response.json().then((data) => {
                        navigation.navigate("Home")
                    });
                }
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior="padding" style={styles.flexContainer}>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>Register</Text>
                    <Text style={styles.subtitle}>Create a new Account</Text>

                    <TextInput
                        placeholder="Name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                        placeholderTextColor="black"
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholderTextColor="black"
                        style={styles.input}
                    />

                    <TextInput
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                        placeholder="Password"
                        placeholderTextColor="black"
                        style={styles.input}
                    />

                    <Pressable onPress={handleRegister} style={styles.registerButton}>
                        <Text style={styles.buttonText}>Register</Text>
                    </Pressable>

                    <Pressable>
                        <Text style={styles.loginText}>
                            Already have an account? Sign in
                        </Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
    },
    flexContainer: {
        flex: 1,
    },
    innerContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
    },
    title: {
        fontSize: 20,
        color: "#FF1493",
        fontWeight: "bold",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 20,
    },
    input: {
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        width: 300,
        marginVertical: 10,
    },
    registerButton: {
        width: 300,
        backgroundColor: "#FF1493",
        padding: 15,
        borderRadius: 7,
        marginTop: 50,
        alignItems: "center",
    },
    buttonText: {
        fontSize: 18,
        textAlign: "center",
        color: "white",
    },
    loginText: {
        textAlign: "center",
        fontSize: 17,
        color: "gray",
        fontWeight: "500",
        marginTop: 20,
    },
});

export default RegisterScreen;
