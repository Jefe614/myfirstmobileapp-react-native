import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../components/theme"; // Import theme

export default function ProfileScreen({ navigation }) {
  const theme = useTheme(); // Get the current theme
  const [darkMode, setDarkMode] = useState(theme.dark);
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);

  // User information
  const user = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Product Manager",
    joined: "March 2023",
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    stats: {
      projects: 12,
      tasks: 124,
      completed: 98
    }
  };

  const renderSettingsItem = (icon, title, value, onToggle, description = null) => (
    <View style={[styles.settingsItem, { borderBottomColor: theme.border }]}>
      <View style={styles.settingsLeft}>
        <Ionicons name={icon} size={24} color={theme.accent} style={styles.settingsIcon} />
        <View>
          <Text style={[styles.settingsTitle, { color: theme.text }]}>{title}</Text>
          {description && (
            <Text style={[styles.settingsDescription, { color: theme.textSecondary }]}>{description}</Text>
          )}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: "#767577", true: theme.accentLight }}
        thumbColor={value ? theme.accent : "#f4f3f4"}
      />
    </View>
  );

  const renderProfileMenuItem = (icon, title, onPress) => (
    <TouchableOpacity 
      style={[styles.menuItem, { borderBottomColor: theme.border }]} 
      onPress={onPress}
    >
      <View style={styles.menuLeft}>
        <Ionicons name={icon} size={24} color={theme.accent} style={styles.menuIcon} />
        <Text style={[styles.menuTitle, { color: theme.text }]}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Profile</Text>
        <TouchableOpacity onPress={() => alert("Settings")}>
          <Ionicons name="settings-outline" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <View style={[styles.profileCard, { backgroundColor: theme.card }]}>
        <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
        <Text style={[styles.profileName, { color: theme.text }]}>{user.name}</Text>
        <Text style={[styles.profileRole, { color: theme.accent }]}>{user.role}</Text>
        <Text style={[styles.profileEmail, { color: theme.textSecondary }]}>{user.email}</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.text }]}>{user.stats.projects}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Projects</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.text }]}>{user.stats.tasks}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Tasks</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.text }]}>{user.stats.completed}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Completed</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.editButton, { backgroundColor: theme.accent }]}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Account Settings */}
      <View style={[styles.sectionContainer, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Account Settings</Text>
        
        {renderProfileMenuItem("person-outline", "Personal Information", () => navigation.navigate("PersonalInfo"))}
        {renderProfileMenuItem("lock-closed-outline", "Privacy & Security", () => navigation.navigate("PrivacySecurity"))}
        {renderProfileMenuItem("notifications-outline", "Notification Preferences", () => navigation.navigate("NotificationPreferences"))}
        {renderProfileMenuItem("card-outline", "Payment Methods", () => navigation.navigate("PaymentMethods"))}
      </View>

      {/* App Settings */}
      <View style={[styles.sectionContainer, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>App Settings</Text>
        
        {renderSettingsItem(
          "moon-outline", 
          "Dark Mode", 
          darkMode, 
          () => setDarkMode(!darkMode),
          "Switch between light and dark themes"
        )}
        
        {renderSettingsItem(
          "notifications-outline", 
          "Push Notifications", 
          notifications, 
          () => setNotifications(!notifications),
          "Receive alerts for new messages and updates"
        )}
        
        {renderSettingsItem(
          "location-outline", 
          "Location Services", 
          locationServices, 
          () => setLocationServices(!locationServices),
          "Allow app to access your location"
        )}
      </View>

      {/* Support & Help */}
      <View style={[styles.sectionContainer, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Support & Help</Text>
        
        {renderProfileMenuItem("help-circle-outline", "Help Center", () => navigation.navigate("HelpCenter"))}
        {renderProfileMenuItem("chatbubble-outline", "Contact Support", () => navigation.navigate("ContactSupport"))}
        {renderProfileMenuItem("document-text-outline", "Terms of Service", () => navigation.navigate("Terms"))}
        {renderProfileMenuItem("shield-outline", "Privacy Policy", () => navigation.navigate("Privacy"))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        style={[styles.logoutButton, { backgroundColor: theme.danger }]}
        onPress={() => alert("Logging out...")}
      >
        <Ionicons name="log-out-outline" size={20} color="#FFF" />
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={[styles.versionText, { color: theme.textSecondary }]}>Version 2.1.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileCard: {
    margin: 20,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  profileRole: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 3,
  },
  statLabel: {
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    height: "80%",
  },
  editButton: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 25,
  },
  editButtonText: {
    color: "#FFF",
    fontWeight: "600",
  },
  sectionContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    padding: 15,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    marginRight: 15,
  },
  menuTitle: {
    fontSize: 16,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
  },
  settingsLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingsIcon: {
    marginRight: 15,
  },
  settingsTitle: {
    fontSize: 16,
  },
  settingsDescription: {
    fontSize: 12,
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
  },
  logoutButtonText: {
    color: "#FFF",
    fontWeight: "600",
    marginLeft: 10,
  },
  versionText: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: 12,
  },
});