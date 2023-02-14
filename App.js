import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>iBrew</Text>
      <Text style={styles.title}>The home brew app!</Text>
      <Button title="Click me!" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    backgroundColor: "#a4a4a4",
    padding: 5,
    color: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
