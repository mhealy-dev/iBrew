import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

const RecipeDetailsScreen = ({ route, navigation }) => {
  const { recipe } = route.params;
  const [recipeName, setRecipeName] = useState(recipe.recipeName);
  const [beerStyle, setBeerStyle] = useState(recipe.beerStyle);
  const [batchSize, setBatchSize] = useState(recipe.batchSize.toString());
  const [originalGravity, setOriginalGravity] = useState(
    recipe.originalGravity.toString()
  );
  const [finalGravity, setFinalGravity] = useState(
    recipe.finalGravity.toString()
  );
  const [fermentationTemp, setFermentationTemp] = useState(
    recipe.fermentationTemp.toString()
  );
  const [fermentationTime, setFermentationTime] = useState(
    recipe.fermentationTime.toString()
  );
  const [editing, setEditing] = useState(false);

  const saveRecipe = async () => {
    const updatedRecipe = {
      ...recipe,
      recipeName,
      beerStyle,
      batchSize: parseFloat(batchSize),
      originalGravity: parseFloat(originalGravity),
      finalGravity: parseFloat(finalGravity),
      fermentationTemp: parseFloat(fermentationTemp),
      fermentationTime: parseFloat(fermentationTime),
    };

    try {
      const recipeData = await AsyncStorage.getItem("recipes");
      if (recipeData !== null) {
        const recipes = JSON.parse(recipeData);
        const index = recipes.findIndex((r) => r.id === recipe.id);
        if (index !== -1) {
          recipes[index] = updatedRecipe;
          await AsyncStorage.setItem("recipes", JSON.stringify(recipes));
          navigation.goBack();
        }
      }
    } catch (error) {
      console.error("Error saving recipe: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity> */}
        <Text style={styles.headerText}>{recipe.recipeName}</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setEditing(true)}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      {editing ? (
        <View style={styles.formContainer}>
          <View style={styles.formRow}>
            <Text style={styles.label}>Recipe Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Recipe Name"
              value={recipeName}
              onChangeText={setRecipeName}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Beer Style:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Beer Style"
              value={beerStyle}
              onChangeText={setBeerStyle}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Batch Size:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Batch Size"
              value={batchSize}
              onChangeText={setBatchSize}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Original Gravity:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Original Gravity"
              value={originalGravity}
              onChangeText={setOriginalGravity}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Final Gravity:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Final Gravity"
              value={finalGravity}
              onChangeText={setFinalGravity}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Fermentation Temperature:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Fermentation Temperature"
              value={fermentationTemp}
              onChangeText={setFermentationTemp}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Fermentation Time:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Fermentation Time"
              value={fermentationTime}
              onChangeText={setFermentationTime}
            />
          </View>
          <View style={styles.formRow}>
            <TouchableOpacity style={styles.saveButton} onPress={saveRecipe}>
              <Text style={styles.saveButtonText}>Save Recipe</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setEditing(false);
                setRecipeName(recipe.recipeName);
                setBeerStyle(recipe.beerStyle);
                setBatchSize(recipe.batchSize.toString());
                setOriginalGravity(recipe.originalGravity.toString());
                setFinalGravity(recipe.finalGravity.toString());
                setFermentationTemp(recipe.fermentationTemp.toString());
                setFermentationTime(recipe.fermentationTime.toString());
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.detailsContainer}>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Recipe Name:</Text>
            <Text style={styles.detailsText}>{recipe.recipeName}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Beer Style:</Text>
            <Text style={styles.detailsText}>{recipe.beerStyle}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Batch Size:</Text>
            <Text style={styles.detailsText}>{recipe.batchSize} gallons</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Original Gravity:</Text>
            <Text style={styles.detailsText}>{recipe.originalGravity}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Final Gravity:</Text>
            <Text style={styles.detailsText}>{recipe.finalGravity}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Fermentation Temperature:</Text>
            <Text style={styles.detailsText}>{recipe.fermentationTemp} °F</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Fermentation Time:</Text>
            <Text style={styles.detailsText}>
              {recipe.fermentationTime} days
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  editButton: {
    backgroundColor: "blue",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detailsText: {
    fontSize: 16,
    color: "#666",
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  formRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "green",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default RecipeDetailsScreen;
