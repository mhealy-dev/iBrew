import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const handleSettingsPress = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSettingsPress}>
          <Ionicons name="settings-outline" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.tilesContainer}>
        <TouchableOpacity style={styles.tile}>
          <Text style={styles.tileText}>Tile 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tile}>
          <Text style={styles.tileText}>Tile 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tile}>
          <Text style={styles.tileText}>Tile 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tile}>
          <Text style={styles.tileText}>Tile 4</Text>
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
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
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

export default ProfileScreen;
