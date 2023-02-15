import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./src/components/MainScreen";
import HomeScreen from "./src/components/HomeScreen";
import SignupScreen from "./src/components/SignupScreen";
import LoginScreen from "./src/components/LoginScreen";
import ProfileScreen from "./src/components/ProfileScreen";
import SettingsScreen from "./src/components/SettingsScreen";
import ForgotScreen from "./src/components/ForgotScreen";
import CreateScreen from "./src/components/CreateScreen";
import ActiveScreen from "./src/components/ActiveScreen";
import DetailsScreen from "./src/components/DetailsScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Create a Brew" component={CreateScreen} />
        <Stack.Screen name="Active Brew" component={ActiveScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Settings" }}
        />
        <Stack.Screen name="Forgot Password" component={ForgotScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
