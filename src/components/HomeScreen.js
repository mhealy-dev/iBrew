import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const handleSettingsPress = () => {
    navigation.navigate("Settings");
  };

  const handleProfilePress = () => {
    navigation.navigate("Profile");
  };

  const handleCreateBrewPress = () => {
    navigation.navigate("Create a Brew");
  };

  const handleActiveBrewPress = () => {
    navigation.navigate("Active Brew");
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleProfilePress}
          style={styles.profileButton}
        >
          <Ionicons name="person" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSettingsPress}>
          <Ionicons name="settings-outline" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.tilesContainer}>
        <TouchableOpacity style={styles.tile} onPress={handleCreateBrewPress}>
          <Text style={styles.tileText}>Create a Brew</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tile} onPress={handleActiveBrewPress}>
          <Text style={styles.tileText}>Active Brews</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tile}>
          <Text style={styles.tileText}>Create a Recipe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tile}>
          <Text style={styles.tileText}>Recipe List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    backgroundColor: "#333333",
    height: 60,
    justifyContent: "flex-end",
    paddingEnd: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  profileButton: {
    paddingRight: 10,
  },
  tilesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tile: {
    width: "45%",
    aspectRatio: 1,
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
    marginHorizontal: "2.5%",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tileText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
});

export default HomeScreen;

HomeScreen.navigationOptions = {
  headerLeft: null,
};
