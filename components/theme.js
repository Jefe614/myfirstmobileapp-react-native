import { useColorScheme } from "react-native";

export const lightTheme = {
  background: "#f4f4f4",
  text: "#333",
  card: "#fff",
  button: "#6200EA",
  buttonText: "#fff",
  icon: "#333",
};

export const darkTheme = {
  background: "#121212",
  text: "#fff",
  card: "#1E1E1E",
  button: "#BB86FC",
  buttonText: "#000",
  icon: "#fff",
};

export const useTheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme === "dark" ? darkTheme : lightTheme;
};
