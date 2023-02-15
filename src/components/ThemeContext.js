import React, { useState, createContext } from "react";
import { Appearance } from "react-native";

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
  const [theme, setTheme] = useState(
    Appearance.getColorScheme() === "dark" ? "dark" : "light"
  );

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme === "dark" ? "#000" : "#fff",
  },
});
