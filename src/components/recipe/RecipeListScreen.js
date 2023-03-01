import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
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
      style={styles.recipeCard}
      onPress={() => handleRecipePress(item)}
    >
      <View style={styles.recipeCardContent}>
        <Text style={styles.recipeName}>{item.name}</Text>
        <Text style={styles.brewStyle}>{item.style}</Text>
        <Text style={styles.fTime}>{item.fTime} days</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {recipes.length > 0 ? (
        <FlatList
          data={recipes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.noRecipesText}>
          You haven't created any recipes yet.
        </Text>
      )}
    </SafeAreaView>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  recipeCard: {
    backgroundColor: "#FFFFFF",
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 4,
  },
  recipeCardContent: {
    padding: 16,
  },
  brewStyle: {
    fontSize: 18,
  },
  fTime: {
    fontSize: 18,
  },
  noRecipesText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#777",
  },
});

export default RecipeListScreen;
