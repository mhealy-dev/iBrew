import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const CreateScreen = () => {
  const navigation = useNavigation();
  const [name, setBrewName] = useState("");
  const [date, setBrewDate] = useState(new Date());
  const [style, setBrewStyle] = useState("");
  const [batchSize, setBatchSize] = useState("");
  const [notes, setBrewNotes] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    const currentDate = selectedDate || date;
    setBrewDate(currentDate);
  };

  const handleSubmit = async () => {
    console.log("Brew Name: ", name);
    console.log("Brew Date: ", date.toLocaleDateString("en-US"));
    console.log("Brew Style: ", style);
    console.log("Batch Size: ", batchSize);
    console.log("Brew Notes: ", notes);

    const newBrew = {
      name,
      date: date.toLocaleDateString("en-US"),
      style,
      batchSize,
      notes,
    };

    try {
      const existingBrews = await AsyncStorage.getItem("brews");
      const newBrews = existingBrews
        ? [...JSON.parse(existingBrews), newBrew]
        : [newBrew];

      await AsyncStorage.setItem("brews", JSON.stringify(newBrews));

      console.log("Brew saved successfully");
      navigation.navigate("Home");
    } catch (error) {
      console.log("Error saving brew:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Brew Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Brew Name"
        value={name}
        onChangeText={(text) => setBrewName(text)}
      />
      <Text style={styles.textTitle}>Brew Date:</Text>
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.text}>
          {date ? date.toLocaleDateString("en-US") : "Brew Date"}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Text style={styles.textTitle}>Brew Style:</Text>
      <TextInput
        style={styles.input}
        placeholder="Brew Style"
        value={style}
        onChangeText={setBrewStyle}
      />
      <Text style={styles.textTitle}>Brew Size:</Text>
      <TextInput
        style={styles.input}
        placeholder="Batch Size"
        value={batchSize}
        onChangeText={(text) => setBatchSize(text)}
      />
      <Text style={styles.textTitle}>Brew Notes:</Text>
      <TextInput
        style={styles.input}
        placeholder="Notes"
        value={notes}
        onChangeText={(text) => setBrewNotes(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Brew</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  textTitle: {
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    height: 40,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
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

export default CreateScreen;
