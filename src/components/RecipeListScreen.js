import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RecipeListScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const recipeData = await getRecipes();
      setRecipes(recipeData);
    });
    return unsubscribe;
  }, [navigation]);

  const getRecipes = async () => {
    const recipes = await AsyncStorage.getItem("recipes");
    return recipes != null ? JSON.parse(recipes) : [];
  };

  const handleRecipePress = (item) => {
    navigation.navigate("Recipe Details", { recipe: item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeItem}
      onPress={() => handleRecipePress(item)}
    >
      <Text style={styles.recipeName}>{item.recipeName}</Text>
      <Text style={styles.beerStyle}>{item.beerStyle}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {recipes.length > 0 ? (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noRecipesText}>
          You haven't created any recipes yet.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  recipeItem: {
    backgroundColor: "#dadada",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  recipeName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  beerStyle: {
    fontSize: 14,
    color: "#777",
  },
  noRecipesText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#777",
  },
});

export default RecipeListScreen;
