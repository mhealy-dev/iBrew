import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ActiveScreen = ({ navigation }) => {
  const [brews, setBrews] = useState([]);

  useEffect(() => {
    loadBrews();
  }, []);

  const loadBrews = async () => {
    try {
      const brewsJson = await AsyncStorage.getItem("brews");
      if (brewsJson !== null) {
        const storedBrews = JSON.parse(brewsJson).map((brew) => ({
          ...brew,
          date: new Date(brew.date),
        }));
        setBrews(storedBrews);
      }
    } catch (e) {
      console.log("Failed to load stored brews", e);
    }
  };

  const handleBrewPress = (brew) => {
    navigation.navigate("Details", { brew: brew });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.brewCard}
      onPress={() => handleBrewPress(item)}
    >
      <View style={styles.brewCardContent}>
        <Text style={styles.brewName}>{item.name}</Text>
        <Text style={styles.brewDate}>
          {item.date.toLocaleDateString("en-US")}
        </Text>
        <Text style={styles.brewStyle}>{item.style}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={brews}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  brewCard: {
    backgroundColor: "#FFFFFF",
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 4,
  },
  brewCardContent: {
    padding: 16,
  },
  brewName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  brewDate: {
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: 4,
  },
  brewStyle: {
    fontSize: 18,
  },
});

export default ActiveScreen;
