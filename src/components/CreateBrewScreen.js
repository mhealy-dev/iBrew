import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { nanoid } from "nanoid/non-secure";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const CreateBrew = () => {
  const navigation = useNavigation();
  const newId = nanoid(16);
  const [name, setBrewName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [style, setBrewStyle] = useState("");
  const [batchSize, setBatchSize] = useState("");
  const [notes, setBrewNotes] = useState("");
  const [ibu, setIbu] = useState("");
  const [abv, setAbv] = useState("");
  const [og, setOg] = useState("");
  const [fg, setFg] = useState("");

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleStartDateChange = (event, selectedStartDate) => {
    if (selectedStartDate === undefined) {
      // User cancelled the date picker
      return;
    }

    try {
      setShowStartDatePicker(false);
      const currentStartDate = selectedStartDate || startDate;
      setStartDate(currentStartDate);
    } catch (error) {
      console.log("Error setting start date:", error);
    }
  };

  const handleEndDateChange = (event, selectedEndDate) => {
    if (selectedEndDate === undefined) {
      // User cancelled the date picker
      return;
    }

    try {
      setShowEndDatePicker(false);
      const currentEndDate = selectedEndDate || endDate;
      setEndDate(currentEndDate);
    } catch (error) {
      console.log("Error setting end date:", error);
    }
  };

  const handleSubmit = async () => {
    console.log("Brew ID: ", newId);
    console.log("Brew Name: ", name);
    console.log("Start Date: ", startDate.toISOString("en-US").slice(0, 10));
    console.log("End Date: ", endDate.toISOString("en-US").slice(0, 10));
    console.log("Brew Style: ", style);
    console.log("Batch Size: ", batchSize);
    console.log("Brew Notes: ", notes);

    const newBrew = {
      id: newId,
      name,
      startDate: startDate.toISOString().slice(0, 10),
      endDate: endDate.toISOString().slice(0, 10),
      style,
      batchSize,
      notes,
      ibu,
      abv,
      og,
      fg,
    };

    try {
      // Save the brew data to AsyncStorage
      const existingBrews = await AsyncStorage.getItem("brews");
      const newBrews = existingBrews
        ? [...JSON.parse(existingBrews), newBrew]
        : [newBrew];

      await AsyncStorage.setItem("brews", JSON.stringify(newBrews));

      console.log("Brew saved successfully");
      navigation.navigate("Home");
    } catch (error) {
      console.log("Error saving brew:", error);
      // Display an error message to the user
      alert("Error saving brew: " + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textTitle}>Brew Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Homebrew name!"
        value={name}
        key="name"
        onChangeText={(text) => setBrewName(text)}
      />
      <Text style={styles.textTitle}>Start Date:</Text>
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowStartDatePicker(true)}
      >
        <Text style={styles.text}>
          {startDate ? startDate.toISOString().slice(0, 10) : "Start Date"}
        </Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          key="startDate"
          onChange={handleStartDateChange}
        />
      )}
      <Text style={styles.textTitle}>End Date:</Text>
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowEndDatePicker(true)}
      >
        <Text style={styles.text}>
          {endDate ? endDate.toISOString().slice(0, 10) : "End Date"}
        </Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          key="endDate"
          onChange={handleEndDateChange}
        />
      )}
      <Text style={styles.textTitle}>Brew Style:</Text>
      <TextInput
        style={styles.input}
        placeholder="IPA, Lager, Pilsner, etc."
        value={style}
        key="style"
        onChangeText={setBrewStyle}
      />
      <Text style={styles.textTitle}>Brew Size:</Text>
      <TextInput
        style={styles.input}
        placeholder="Batch Size in Gallons"
        value={batchSize}
        key="batch-size"
        onChangeText={(text) => setBatchSize(text)}
      />
      <Text style={styles.textTitle}>Brew Notes:</Text>
      <TextInput
        style={styles.input}
        placeholder="Notes (These can be added later!)"
        value={notes}
        key="notes"
        onChangeText={(text) => setBrewNotes(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Brew</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  textTitle: {
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  dateInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  dateText: {
    flex: 1,
    fontSize: 18,
    textAlign: "left",
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
  placeholder: {
    color: "#ccc",
  },
});

export default CreateBrew;
