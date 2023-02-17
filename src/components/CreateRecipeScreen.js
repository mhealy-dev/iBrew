import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const CreateRecipe = () => {
  const navigation = useNavigation();
  const [recipeName, setRecipeName] = useState("");
  const [beerStyle, setBeerStyle] = useState("");
  const [batchSize, setBatchSize] = useState("");
  const [originalGravity, setOriginalGravity] = useState("");
  const [finalGravity, setFinalGravity] = useState("");
  const [fermentationTemp, setFermentationTemp] = useState("");
  const [fermentationTime, setFermentationTime] = useState("");

  const saveRecipe = async () => {
    try {
      // Generate a unique ID for the recipe
      const id = Date.now().toString();
      const recipeData = {
        id,
        recipeName,
        beerStyle,
        batchSize,
        originalGravity,
        finalGravity,
        fermentationTemp,
        fermentationTime,
      };
      // Save the recipe data to AsyncStorage
      const existingRecipes = await getRecipes();
      const updatedRecipes = [...existingRecipes, recipeData];
      await AsyncStorage.setItem("recipes", JSON.stringify(updatedRecipes));
      console.log("Recipe saved successfully!");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error saving recipe: ", error);
    }
  };

  const getRecipes = async () => {
    const recipes = await AsyncStorage.getItem("recipes");
    return recipes != null ? JSON.parse(recipes) : [];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Recipe</Text>
      <TextInput
        style={styles.input}
        placeholder="Recipe Name"
        onChangeText={setRecipeName}
        value={recipeName}
      />
      <TextInput
        style={styles.input}
        placeholder="Beer Style"
        onChangeText={setBeerStyle}
        value={beerStyle}
      />
      <TextInput
        style={styles.input}
        placeholder="Batch Size (gallons)"
        onChangeText={setBatchSize}
        value={batchSize}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Original Gravity"
        onChangeText={setOriginalGravity}
        value={originalGravity}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Final Gravity"
        onChangeText={setFinalGravity}
        value={finalGravity}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Fermentation Temperature (F)"
        onChangeText={setFermentationTemp}
        value={fermentationTemp}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Fermentation Time (days)"
        onChangeText={setFermentationTime}
        value={fermentationTime}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={saveRecipe}>
        <Text style={styles.buttonText}>Save Recipe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
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
    textAlign: "center",
    fontSize: 18,
  },
});

export default CreateRecipe;
