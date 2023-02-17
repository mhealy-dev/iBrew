import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const DetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { brew, refreshBrews } = route.params;

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(brew.name);
  const [date, setDate] = useState(new Date(brew.date));
  const [style, setStyle] = useState(brew.style);
  const [batchSize, setBatchSize] = useState(brew.batchSize.toString());
  const [ibu, setIbu] = useState(brew.ibu ? brew.ibu.toString() : "");
  const [abv, setAbv] = useState(brew.abv ? brew.abv.toString() : "");
  const [og, setOg] = useState(brew.og ? brew.og.toString() : "");
  const [fg, setFg] = useState(brew.fg ? brew.fg.toString() : "");
  const [notes, setNotes] = useState(brew.notes);

  const handleSave = async () => {
    const updatedBrew = {
      id: brew.id,
      date: date.getTime(),
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

      const brewIndex = brews.findIndex((b) => b.id === brew.id);
      if (brewIndex !== -1) {
        const updatedBrews = [...brews];
        updatedBrews[brewIndex] = updatedBrew;
        await AsyncStorage.setItem("brews", JSON.stringify(updatedBrews));
        console.log("Brew saved successfully");
        navigation.goBack();
        refreshBrews(true); // Set to true to refresh the brews
      }
    } catch (error) {
      console.log("Error saving brew:", error);
    }

    setEditing(false);
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
              const existingBrews = await AsyncStorage.getItem("brews");
              const brews = existingBrews ? JSON.parse(existingBrews) : [];

              const brewIndex = brews.findIndex((b) => b.id === brew.id);
              if (brewIndex !== -1) {
                const updatedBrews = [...brews];
                updatedBrews.splice(brewIndex, 1);
                await AsyncStorage.setItem(
                  "brews",
                  JSON.stringify(updatedBrews)
                );
                console.log("Brew deleted successfully");
                navigation.goBack();
                refreshBrews(true);
              }
            } catch (error) {
              console.log("Error deleting brew:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    if (!editing) {
      setName(brew.name);
      setDate(new Date(brew.date));
      setStyle(brew.style);
      setBatchSize(brew.batchSize.toString());
      setIbu(brew.ibu && brew.ibu.toString());
      setAbv(brew.abv && brew.abv.toString());
      setOg(brew.og && brew.og.toString());
      setFg(brew.fg && brew.fg.toString());
      setNotes(brew.notes);
    }
  }, [editing]);

  return (
    <View style={styles.container}>
      {editing ? (
        <View style={styles.inputContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Name"
              key="name"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date:</Text>
            <TextInput
              style={styles.input}
              value={date}
              onChangeText={(text) => setDate(new Date(text))} // convert to Date object
              placeholder={brew.date.toISOString().slice(0, 10)}
              key="date"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Style:</Text>
            <TextInput
              style={styles.input}
              value={style}
              onChangeText={setStyle}
              placeholder="Style"
              key="style"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Batch Size:</Text>
            <TextInput
              style={styles.input}
              value={batchSize}
              onChangeText={setBatchSize}
              placeholder="Batch Size (gallons)"
              keyboardType="numeric"
              key="batch-size"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>IBU:</Text>
            <TextInput
              style={styles.input}
              value={ibu}
              onChangeText={setIbu}
              placeholder="IBU"
              keyboardType="numeric"
              key="ibu"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>ABV:</Text>
            <TextInput
              style={styles.input}
              value={abv}
              onChangeText={setAbv}
              placeholder="ABV"
              keyboardType="numeric"
              key="abv"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>OG:</Text>
            <TextInput
              style={styles.input}
              value={og}
              onChangeText={setOg}
              placeholder="Original Gravity"
              keyboardType="numeric"
              key="og"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>FG:</Text>
            <TextInput
              style={styles.input}
              value={fg}
              onChangeText={setFg}
              placeholder="Final Gravity"
              keyboardType="numeric"
              key="fg"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes:</Text>
            <TextInput
              style={styles.input}
              value={notes}
              onChangeText={setNotes}
              placeholder="Notes"
              multiline={true}
              key="notes"
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            title="save Changes"
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <Text style={styles.title}>{brew.name}</Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Brew Date:</Text>{" "}
            {brew.date.toISOString().slice(0, 10)}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Style:</Text> {brew.style}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Batch Size:</Text> {brew.batchSize}{" "}
            gallons
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>IBU:</Text> {brew.ibu}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>ABV:</Text> {brew.abv}%
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>OG:</Text> {brew.og}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>FG:</Text> {brew.fg}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Notes:</Text> {brew.notes}
          </Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "normal",
  },
  bold: {
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  label: {
    flex: 1,
    marginRight: 10,
    fontWeight: "bold",
    textAlign: "right",
  },
  input: {
    flex: 2,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
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
});

export default DetailsScreen;
