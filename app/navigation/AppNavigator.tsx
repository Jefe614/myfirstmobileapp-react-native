import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Icons for the tabs

// Import Screens
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DashboardScreen from "../screens/DashboardScreen";
import MessagesScreen from "../screens/MessagesScreen";

// Create the Tab Navigator
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case "Home":
                iconName = "home-outline";
                break;
              case "Dashboard":
                iconName = "stats-chart-outline";
                break;
              case "Messages":
                iconName = "chatbubble-ellipses-outline";
                break;
              case "Profile":
                iconName = "person-outline";
                break;
              case "Settings":
                iconName = "settings-outline";
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#2D9CDB",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#F5F5F5",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            height: 60,
            paddingBottom: 10,
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
  );
}
