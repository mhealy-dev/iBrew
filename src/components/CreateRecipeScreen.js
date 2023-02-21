import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { nanoid } from "nanoid/non-secure";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const CreateRecipe = () => {
  const navigation = useNavigation();
  const newId = nanoid(16);
  const [name, setRecipeName] = useState("");
  const [style, setRecipeStyle] = useState("");
  const [batchSize, setBatchSize] = useState("");
  const [og, setOg] = useState("");
  const [fg, setFg] = useState("");
  const [fTemp, setFermentationTemp] = useState("");
  const [fTime, setFermentationTime] = useState("");

  const saveRecipe = async () => {
    try {
      const recipeData = {
        id: newId,
        name,
        style,
        batchSize,
        og,
        fg,
        fTemp,
        fTime,
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.textTitle}>Recipe Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Recipe name!"
        onChangeText={setRecipeName}
        value={name}
        key="name"
      />
      <Text style={styles.textTitle}>Brew Style:</Text>
      <TextInput
        style={styles.input}
        placeholder="IPA, Lager, Pilsner, etc."
        onChangeText={setRecipeStyle}
        value={style}
        key="style"
      />
      <Text style={styles.textTitle}>Batch Size:</Text>
      <TextInput
        style={styles.input}
        placeholder="Batch Size (gallons)"
        onChangeText={setBatchSize}
        value={batchSize}
        key="batchSize"
        keyboardType="numeric"
      />
      <Text style={styles.textTitle}>Original Gravity:</Text>
      <TextInput
        style={styles.input}
        placeholder="Original Gravity"
        onChangeText={setOg}
        value={og}
        key="og"
        keyboardType="numeric"
      />
      <Text style={styles.textTitle}>Final Gravity:</Text>
      <TextInput
        style={styles.input}
        placeholder="Final Gravity"
        onChangeText={setFg}
        value={fg}
        key="fg"
        keyboardType="numeric"
      />
      <Text style={styles.textTitle}>Fermentation Temperature:</Text>
      <TextInput
        style={styles.input}
        placeholder="Fermentation Temperature (F)"
        onChangeText={setFermentationTemp}
        value={fTemp}
        key="fTemp"
        keyboardType="numeric"
      />
      <Text style={styles.textTitle}>Fermentation Time:</Text>
      <TextInput
        style={styles.input}
        placeholder="Fermentation Time (days)"
        onChangeText={setFermentationTime}
        value={fTime}
        key="fTime"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={saveRecipe}>
        <Text style={styles.buttonText}>Create Recipe</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  textTitle: {
    fontWeight: "bold",
    marginTop: 10,
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
  placeholder: {
    color: "#ccc",
  },
});

export default CreateRecipe;
