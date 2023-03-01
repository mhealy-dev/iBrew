import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainAppScreen from "./src/components/MainAppScreen";
import HomeScreen from "./src/components/HomeScreen";
import SignupScreen from "./src/components/auth/SignupScreen";
import LoginScreen from "./src/components/auth/LoginScreen";
import ForgotPasswordScreen from "./src/components/auth/ForgotPasswordScreen";
import ProfileScreen from "./src/components/user/ProfileScreen";
import SettingsScreen from "./src/components/settings/SettingsScreen";
import CreateBrewScreen from "./src/components/brew/CreateBrewScreen";
import ActiveBrewListScreen from "./src/components/brew/ActiveBrewListScreen";
import BrewDetailsScreen from "./src/components/brew/BrewDetailsScreen";
import CreateRecipeScreen from "./src/components/recipe/CreateRecipeScreen";
import RecipeListScreen from "./src/components/recipe/RecipeListScreen";
import RecipeDetailsScreen from "./src/components/recipe/RecipeDetailsScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainAppScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Create a Brew" component={CreateBrewScreen} />
        <Stack.Screen name="Active Brews" component={ActiveBrewListScreen} />
        <Stack.Screen name="Brew Details" component={BrewDetailsScreen} />
        <Stack.Screen name="Create a Recipe" component={CreateRecipeScreen} />
        <Stack.Screen name="Recipe List" component={RecipeListScreen} />
        <Stack.Screen name="Recipe Details" component={RecipeDetailsScreen} />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Settings" }}
        />
        <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
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
