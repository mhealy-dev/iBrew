import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }

      try {
        // Retrieve the saved data from the local storage
        const data = await AsyncStorage.getItem("userData");

        if (data !== null) {
          // Parse the string back into an object
          const savedData = JSON.parse(data);

          // Update the state variables with the saved data
          setImage(savedData.image);
          setFirstName(savedData.firstName);
          setLastName(savedData.lastName);
          setUsername(savedData.username);
          setEmail(savedData.email);
        }
      } catch (error) {
        console.error("Error loading data: ", error);
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveData = async () => {
    try {
      // Create an object with the data to be saved
      const data = {
        image: image,
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
      };

      // Convert the object to a string and save it to the local storage
      await AsyncStorage.setItem("userData", JSON.stringify(data));
    } catch (error) {
      console.error("Error saving data: ", error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage} disabled={!isEditing}>
          {image ? (
            <Image style={styles.profileImage} source={{ uri: image }} />
          ) : (
            <View style={styles.profilePlaceholder}>
              <Text style={styles.profileInitials}>
                {firstName.charAt(0) + lastName.charAt(0)}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileText}>{`${firstName} ${lastName}`}</Text>
          <Text style={styles.profileText}>{`${username}`}</Text>
          <Text style={styles.profileText}>{email}</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={setFirstName}
          value={firstName}
          editable={isEditing}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={setLastName}
          value={lastName}
          editable={isEditing}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
          editable={isEditing}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          editable={isEditing}
        />
        {isEditing ? (
          <TouchableOpacity style={styles.button}>
            <Text
              style={styles.buttonText}
              title="Save"
              onPress={async () => {
                try {
                  // Save the data asynchronously here
                  console.log("Saving data...");
                  await saveData();
                  console.log("Data saved successfully!");
                  setIsEditing(false);
                } catch (error) {
                  console.error("Error saving data: ", error);
                }
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profilePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#cccccc",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitials: {
    color: "#ffffff",
    fontSize: 40,
  },
  profileTextContainer: {
    marginTop: 12,
    alignItems: "center",
  },
  profileText: {
    fontWeight: "bold",
    marginTop: 1,
  },
  formContainer: {
    marginVertical: 10,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
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
  errorText: {
    color: "red",
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default ProfileScreen;
