import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ActiveBrewsScreen = ({ navigation }) => {
  const [brews, setBrews] = useState([]);
  const [refreshActiveScreen, setRefreshActiveScreen] = useState(false);

  useEffect(() => {
    loadBrews();
  }, [refreshActiveScreen]);

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
    navigation.navigate("Brew Details", {
      brew: brew,
      refreshBrews: refreshBrews,
    });
  };

  const refreshBrews = (refresh) => {
    setRefreshActiveScreen(refresh);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.brewCard}
      onPress={() => handleBrewPress(item)}
    >
      <View style={styles.brewCardContent}>
        <Text style={styles.brewName}>{item.name}</Text>
        <Text style={styles.brewDate}>
          {item.date.toISOString().slice(0, 10)}
        </Text>
        <Text style={styles.brewStyle}>{item.style}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {brews.length > 0 ? (
        <FlatList
          data={brews}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.noBrewsText}>
          You haven't created any brews yet.
        </Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 5,
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
  noBrewsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#777",
  },
});

export default ActiveBrewsScreen;
