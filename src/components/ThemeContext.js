import React, { createContext, useState } from "react";

const DarkModeContext = React.createContext(false);

export default DarkModeContext;

// export const ThemeContext = createContext({
//   darkMode: false,
//   toggleDarkMode: () => {},
// });

// export const ThemeProvider = ({ children }) => {
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   return (
//     <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

const dark = {
  background: "#222",
  color: "#fff",
  // add other styles for dark mode here
};
