import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometricLogin, setBiometricLogin] = useState(false);
  const [dataSync, setDataSync] = useState(true);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="settings-sharp" size={32} color="#2D9CDB" />
          <Text style={styles.title}>Settings</Text>
        </View>
        <Text style={styles.subtitle}>Adjust your preferences here.</Text>

        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={notifications ? "#2D9CDB" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Appearance Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={darkMode ? "#2D9CDB" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Security Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Biometric Login</Text>
            <Switch
              value={biometricLogin}
              onValueChange={setBiometricLogin}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={biometricLogin ? "#2D9CDB" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Data Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Sync Data</Text>
            <Switch
              value={dataSync}
              onValueChange={setDataSync}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={dataSync ? "#2D9CDB" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.logoutButton]}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.versionText}>App Version 1.2.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D9CDB",
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  settingLabel: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#ffefef",
    marginTop: 10,
  },
  logoutText: {
    fontSize: 16,
    color: "#e74c3c",
    textAlign: "center",
  },
  versionText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
});