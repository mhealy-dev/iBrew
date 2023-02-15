import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Switch } from "react-native";

function SettingsScreen({ navigation }) {
  const handleResetPassword = () => {
    // Navigate to the reset password screen
  };

  const handleLogout = () => {
    navigation.navigate("Login");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login", params: { showBackButton: false } }],
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.option} onPress={handleResetPassword}>
        <Text style={styles.optionText}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleLogout}>
        <Text style={styles.optionText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  darkMode: {
    backgroundColor: "#161616",
    color: "#333333",
  },
  option: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    marginBottom: 10,
    width: "80%",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  darkModeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  switchText: {
    color: "#fff",
  },
});

export default SettingsScreen;
