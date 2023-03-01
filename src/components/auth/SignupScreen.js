import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  const handleSignup = () => {
    // Do something with the email, username, and password values
    // For example, make an API call to create a new account
    // Then navigate to the HomeScreen or a confirmation screen
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Create account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLoginPress}>
        <Text style={styles.altText}>Already have an Account?</Text>
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
  altText: {
    marginTop: 20,
    color: "#303030",
    textDecorationLine: "underline",
  },
});

export default SignupScreen;
