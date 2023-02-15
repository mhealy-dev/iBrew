import React from "react";
import { StyleSheet, View, Text } from "react-native";

const DetailsScreen = ({ route }) => {
  const { brew } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{brew.brewName}</Text>
      <Text style={styles.text}>
        Brew Date: {brew.brewDate.toLocaleDateString("en-US")}
      </Text>
      <Text style={styles.text}>Style: {brew.brewStyle}</Text>
      <Text style={styles.text}>Batch Size: {brew.batchSize} gallons</Text>
      <Text style={styles.text}>IBU: {brew.ibu}</Text>
      <Text style={styles.text}>ABV: {brew.abv}%</Text>
      <Text style={styles.text}>OG: {brew.og}</Text>
      <Text style={styles.text}>FG: {brew.fg}</Text>
      <Text style={styles.text}>Notes: {brew.notes}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default DetailsScreen;
