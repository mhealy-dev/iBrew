import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
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
        console.log(brew.id);
        navigation.navigate("Active Brews");
        refreshBrews(true); // Set to true to refresh the brews
      }
    } catch (error) {
      console.log("Error saving brew:", error);
    }

    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    // Reset the form to the original values
    setName(brew.name);
    setDate(new Date(brew.date));
    setStyle(brew.style);
    setBatchSize(brew.batchSize.toString());
    setIbu(brew.ibu ? brew.ibu.toString() : "");
    setAbv(brew.abv ? brew.abv.toString() : "");
    setOg(brew.og ? brew.og.toString() : "");
    setFg(brew.fg ? brew.fg.toString() : "");
    setNotes(brew.notes);
    console.log("Brew changes cancelled successfully");
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
                console.log(brew.id);
                refreshBrews(true);
                navigation.goBack();
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {editing ? (
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <View style={styles.formRow}>
                <Text style={styles.label}>Brew Name:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Brew Name"
                  value={name}
                  key="name"
                  onChangeText={setName}
                />
              </View>
              <View style={styles.formRow}>
                <Text style={styles.label}>Brew Date:</Text>
                <TextInput
                  style={styles.input}
                  placeholder={brew.date.toISOString().slice(0, 10)}
                  value={date}
                  key="date"
                  onChangeText={(text) => setDate(new Date(text))} // convert to Date object
                />
              </View>
              <View style={styles.formRow}>
                <Text style={styles.label}>Style:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Style"
                  value={style}
                  key="style"
                  onChangeText={setStyle}
                />
              </View>
              <View style={styles.formRow}>
                <Text style={styles.label}>Batch Size:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Batch Size (gallons)"
                  value={batchSize}
                  key="batch-size"
                  keyboardType="numeric"
                  onChangeText={setBatchSize}
                />
              </View>
              <View style={styles.formRow}>
                <Text style={styles.label}>IBU:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="IBU"
                  value={ibu}
                  key="ibu"
                  keyboardType="numeric"
                  onChangeText={setIbu}
                />
              </View>
              <View style={styles.formRow}>
                <Text style={styles.label}>ABV:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="ABV"
                  value={abv}
                  key="abv"
                  keyboardType="numeric"
                  onChangeText={setAbv}
                />
              </View>
              <View style={styles.formRow}>
                <Text style={styles.label}>OG:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Original Gravity"
                  value={og}
                  key="og"
                  keyboardType="numeric"
                  onChangeText={setOg}
                />
              </View>
              <View style={styles.formRow}>
                <Text style={styles.label}>FG:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Final Gravity"
                  value={fg}
                  key="fg"
                  keyboardType="numeric"
                  onChangeText={setFg}
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
                title="Cancel Changes"
                onPress={handleCancel}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.detailsContainer}>
            <View style={styles.detailsRow}>
              <Text style={styles.label}>Brew Name:</Text>
              <Text style={styles.detailsText}>{brew.name}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.label}>Brew Date:</Text>
              <Text style={styles.detailsText}>
                {brew.date.toISOString().slice(0, 10)}
              </Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.label}>Style:</Text>
              <Text style={styles.detailsText}>{brew.style}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.label}>Batch Size:</Text>
              <Text style={styles.detailsText}>{brew.batchSize} gallons</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.label}>IBU:</Text>
              <Text style={styles.detailsText}>{brew.ibu}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.label}>ABV:</Text>
              <Text style={styles.detailsText}>{brew.abv}%</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.label}>OG:</Text>
              <Text style={styles.detailsText}>{brew.og}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.label}>FG:</Text>
              <Text style={styles.detailsText}>{brew.fg}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.label}>Notes:</Text>
              <Text style={styles.detailsText}>{brew.notes}</Text>
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
export default DetailsScreen;
