import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const MainScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleSignupPress = () => {
    navigation.navigate("Signup");
  };

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>iBrew</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignupPress}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#333333",
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 70, // Increase marginTop to move the text higher
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#dadada",
    borderColor: "#999999",
    paddingVertical: 20, // Adjust paddingVertical to increase button height
    paddingHorizontal: 30, // Adjust paddingHorizontal to increase button width
    marginHorizontal: 10,
    borderRadius: 10, // Adjust borderRadius to make button edges more round
    marginBottom: 50, // Increase marginTop to move the buttons higher
  },
  buttonText: {
    color: "#333333",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default MainScreen;
