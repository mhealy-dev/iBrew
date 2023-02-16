import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const DetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { brew } = route.params;

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(brew.name);
  const [style, setStyle] = useState(brew.style);
  const [batchSize, setBatchSize] = useState(brew.batchSize.toString());
  const [ibu, setIbu] = useState(brew.ibu && brew.ibu.toString());
  const [abv, setAbv] = useState(brew.abv && brew.abv.toString());
  const [og, setOg] = useState(brew.og && brew.og.toString());
  const [fg, setFg] = useState(brew.fg && brew.fg.toString());
  const [notes, setNotes] = useState(brew.notes);

  const handleSave = async () => {
    const updatedBrew = {
      id: brew.id,
      date: brew.date,
      name,
      style,
      batchSize: parseFloat(batchSize),
      ibu: ibu ? parseFloat(ibu) : null,
      abv: abv ? parseFloat(abv) : null,
      og: og ? parseFloat(og) : null,
      fg: fg ? parseFloat(fg) : null,
      notes,
    };

    try {
      const existingBrews = await AsyncStorage.getItem("brews");
      const brews = existingBrews ? JSON.parse(existingBrews) : [];

      const updatedBrews = brews.map((b) => {
        if (b.id === brew.id) {
          return updatedBrew;
        } else {
          return b;
        }
      });

      await AsyncStorage.setItem("brews", JSON.stringify(updatedBrews));

      console.log("Brew saved successfully");
      navigation.navigate("Home");
    } catch (error) {
      console.log("Error saving brew:", error);
    }

    // Disable editing mode
    setEditing(false);
  };

  return (
    <View style={styles.container}>
      {editing ? (
        <>
          <Text style={styles.title}>Edit Brew</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            value={style}
            onChangeText={setStyle}
            placeholder="Style"
          />
          <TextInput
            style={styles.input}
            value={batchSize}
            onChangeText={setBatchSize}
            placeholder="Batch Size (gallons)"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={ibu}
            onChangeText={setIbu}
            placeholder="IBU"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={abv}
            onChangeText={setAbv}
            placeholder="ABV"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={og}
            onChangeText={setOg}
            placeholder="OG"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={fg}
            onChangeText={setFg}
            placeholder="FG"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={notes}
            onChangeText={setNotes}
            placeholder="Notes"
            multiline={true}
          />
          <Button title="Save" onPress={handleSave} />
        </>
      ) : (
        <>
          <Text style={styles.title}>{brew.name}</Text>
          <Text style={styles.text}>
            Brew Date: {brew.date.toLocaleDateString("en-US")}
          </Text>
          <Text style={styles.text}>Style: {brew.style}</Text>
          <Text style={styles.text}>Batch Size: {brew.batchSize} gallons</Text>
          <Text style={styles.text}>IBU: {brew.ibu}</Text>
          <Text style={styles.text}>ABV: {brew.abv}%</Text>
          <Text style={styles.text}>OG: {brew.og}</Text>
          <Text style={styles.text}>FG: {brew.fg}</Text>
          <Text style={styles.text}>Notes: {brew.notes}</Text>
          <Button title="Edit" onPress={() => setEditing(true)} />
        </>
      )}
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
    fontWeight: "bold",
  },
});

export default DetailsScreen;
