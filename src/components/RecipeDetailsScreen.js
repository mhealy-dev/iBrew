import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

const RecipeDetailsScreen = ({ route, navigation }) => {
  const { recipe } = route.params;

  const [editing, setEditing] = useState(false);
  const [name, setRecipeName] = useState(recipe.name);
  const [style, setBeerStyle] = useState(recipe.style);
  const [batchSize, setBatchSize] = useState(recipe.batchSize.toString());
  const [og, setOg] = useState(recipe.og ? recipe.og.toString() : "");
  const [fg, setFg] = useState(recipe.fg ? recipe.fg.toString() : "");
  const [fTemp, setFTemp] = useState(
    recipe.fTemp ? recipe.fTemp.toString() : ""
  );
  const [fTime, setFTime] = useState(
    recipe.fTime ? recipe.fTime.toString() : ""
  );
  const [notes, setNotes] = useState(recipe.notes);

  const handleSave = async () => {
    const updatedRecipe = {
      ...recipe,
      name,
      style,
      batchSize: parseFloat(batchSize),
      og: parseFloat(og),
      fg: parseFloat(fg),
      fTemp: parseFloat(fTemp),
      fTime: parseFloat(fTime),
      notes,
    };

    try {
      const recipeData = await AsyncStorage.getItem("recipes");
      if (recipeData !== null) {
        const recipes = JSON.parse(recipeData);
        const index = recipes.findIndex((r) => r.id === recipe.id);
        if (index !== -1) {
          recipes[index] = updatedRecipe;
          await AsyncStorage.setItem("recipes", JSON.stringify(recipes));
          navigation.navigate("Recipe List");
        }
      }
    } catch (error) {
      console.error("Error saving recipe: ", error);
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    // Reset the form to the original values
    setRecipeName(recipe.name);
    setBeerStyle(recipe.style);
    setBatchSize(recipe.batchSize.toString());
    setOg(recipe.og ? recipe.og.toString() : "");
    setFg(recipe.fg ? recipe.fg.toString() : "");
    setFTime(recipe.fTemp ? recipe.fTemp.toString() : "");
    setFTime(recipe.fTime ? recipe.fTime.toString() : "");
    setNotes(recipe.notes);
    console.log("Recipe changes cancelled successfully");
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this brew?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const existingRecipes = await AsyncStorage.getItem("recipes");
              const recipes = existingRecipes
                ? JSON.parse(existingRecipes)
                : [];

              const recipeIndex = recipes.findIndex((b) => b.id === recipe.id);
              if (recipeIndex !== -1) {
                const updatedRecipes = [...recipes];
                updatedRecipes.splice(recipeIndex, 1);
                await AsyncStorage.setItem(
                  "recipes",
                  JSON.stringify(updatedRecipes)
                );
                console.log("Recipe deleted successfully");
                console.log(recipe.id);
                navigation.goBack();
              }
            } catch (error) {
              console.log("Error deleting recipe:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {editing ? (
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <View style={styles.formRow}>
                <Text style={styles.label}>Recipe Name:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Recipe Name"
                  value={name}
                  key="name"
                  onChangeText={setRecipeName}
                />
              </View>

              <View style={styles.formRow}>
                <Text style={styles.label}>Beer Style:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Beer Style"
                  value={style}
                  key="style"
                  onChangeText={setBeerStyle}
                />
              </View>

              <View style={styles.formRow}>
                <Text style={styles.label}>Batch Size:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Batch Size"
                  value={batchSize}
                  key="batchSize"
                  onChangeText={setBatchSize}
                />
              </View>

              <View style={styles.formRow}>
                <Text style={styles.label}>Original Gravity:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Original Gravity"
                  value={og}
                  key="og"
                  onChangeText={setOg}
                />
              </View>

              <View style={styles.formRow}>
                <Text style={styles.label}>Final Gravity:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Final Gravity"
                  value={fg}
                  key="fg"
                  onChangeText={setFg}
                />
              </View>

              <View style={styles.formRow}>
                <Text style={styles.label}>Fermentation Temperature:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Fermentation Temp"
                  value={fTemp}
                  key="fTemp"
                  onChangeText={setFTemp}
                />
              </View>

              <View style={styles.formRow}>
                <Text style={styles.label}>Fermentation Time:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Fermentation Time"
                  value={fTime}
                  key="fTime"
                  onChangeText={setFTime}
                />
              </View>
              <View style={styles.formRow}>
                <Text style={styles.label}>Notes:</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Notes"
                value={notes}
                multiline={true}
                key="notes"
                onChangeText={setNotes}
              />
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.button}
                title="save Changes"
                onPress={handleSave}
              >
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.detailsContainer}>
            <View style={styles.detailsRow}>
              <Text style={styles.label}>Recipe Name:</Text>
              <Text style={styles.detailsText}>{recipe.name}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.label}>Beer Style:</Text>
              <Text style={styles.detailsText}>{recipe.style}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.label}>Batch Size:</Text>
              <Text style={styles.detailsText}>{recipe.batchSize} gallons</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.label}>Original Gravity:</Text>
              <Text style={styles.detailsText}>{recipe.og}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.label}>Final Gravity:</Text>
              <Text style={styles.detailsText}>{recipe.fg}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.label}>Fermentation Temperature:</Text>
              <Text style={styles.detailsText}>{recipe.fTemp} °F</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.label}>Fermentation Time:</Text>
              <Text style={styles.detailsText}>{recipe.fTime} days</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.label}>Notes:</Text>
              <Text style={styles.detailsText}>{recipe.notes}</Text>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.button}
                title="Edit Brew"
                onPress={() => {
                  setEditing(true);
                }}
              >
                <Text style={styles.buttonText}>Edit Brew</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                title="Delete Brew"
                onPress={handleDelete}
              >
                <Text style={styles.buttonText}>Delete Brew</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: 120,
  },
  detailsText: {
    fontSize: 16,
    color: "#666",
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 10,
  },
  formRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
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
  cancelButton: {
    backgroundColor: "#d33a3a",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default RecipeDetailsScreen;
