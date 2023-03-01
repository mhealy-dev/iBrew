import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginPress = () => {
    // Navigate to HomeScreen and remove the back button from the navigation header
    navigation.reset({
      index: 0,
      routes: [{ name: "Home", params: { showBackButton: false } }],
    });
  };

  const handleSignupPress = () => {
    navigation.navigate("Signup");
  };

  const handleForgotPassword = () => {
    navigation.navigate("Forgot Password");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Log in</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignupPress}>
        <Text style={styles.createAccount}>Create an Account?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  darkMode: {
    backgroundColor: "#000",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999999",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: "80%",
  },
  button: {
    backgroundColor: "#dadada",
    borderColor: "#999999",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#303030",
    fontWeight: "bold",
  },
  forgotPassword: {
    marginTop: 20,
    color: "#303030",
    textDecorationLine: "underline",
  },
  createAccount: {
    marginTop: 10,
    color: "#303030",
    textDecorationLine: "underline",
  },
  altText: {
    marginTop: 10,
    color: "#303030",
  },
});

export default LoginScreen;
