import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Animated, { FadeIn, BounceIn, SlideInRight } from "react-native-reanimated";
import { useTheme } from "../../components/theme"; // Import theme

const HomeScreen = ({ navigation }) => {
  const theme = useTheme(); // Get the current theme
  const [weather, setWeather] = useState({ temp: "22°C", condition: "Cloudy" });
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New message", description: "John sent you a new message", time: "10m ago" },
    { id: 2, title: "Reminder", description: "Meeting with team at 2 PM", time: "1h ago" },
  ]);
  const [upcomingEvents, setUpcomingEvents] = useState([
    { id: 1, title: "Team Meeting", date: "Today, 2:00 PM", location: "Conference Room A" },
    { id: 2, title: "Project Deadline", date: "Tomorrow, 5:00 PM", location: "Remote" },
    { id: 3, title: "Lunch with Client", date: "Feb 29, 12:30 PM", location: "Bistro Downtown" },
  ]);
  
  // Activity stats
  const [activityStats, setActivityStats] = useState({
    tasks: { completed: 12, total: 18 },
    messages: 5,
    projects: 3
  });

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header with Profile */}
      <View style={styles.headerContainer}>
        <Animated.View entering={FadeIn} style={styles.headerLeft}>
          <Text style={[styles.title, { color: theme.text }]}>👋 Welcome Back!</Text>
          <Text style={[styles.subtitle, { color: theme.text }]}>Let's explore what's new today</Text>
        </Animated.View>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image 
            source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
      </View>

      {/* Weather Widget */}
      <Animated.View entering={BounceIn} style={[styles.weatherCard, { backgroundColor: theme.card }]}>
        <View style={styles.weatherContent}>
          <View style={styles.weatherInfo}>
            <Ionicons name="partly-sunny" size={40} color="#FFA500" />
            <View style={styles.weatherDetails}>
              <Text style={[styles.weatherText, { color: theme.text }]}>{weather.temp}</Text>
              <Text style={[styles.weatherCondition, { color: theme.text }]}>{weather.condition}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.forecastButton} onPress={() => navigation.navigate("Weather")}>
            <Text style={{ color: theme.accent }}>Forecast</Text>
            <Ionicons name="chevron-forward" size={16} color={theme.accent} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Activity Stats */}
      <Animated.View entering={FadeIn.delay(100)} style={[styles.statsContainer, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Activity Overview</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="checkmark-circle" size={24} color={theme.accent} />
            <Text style={[styles.statValue, { color: theme.text }]}>{activityStats.tasks.completed}/{activityStats.tasks.total}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Tasks</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="chatbubbles" size={24} color={theme.accent} />
            <Text style={[styles.statValue, { color: theme.text }]}>{activityStats.messages}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Messages</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="folder-open" size={24} color={theme.accent} />
            <Text style={[styles.statValue, { color: theme.text }]}>{activityStats.projects}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Projects</Text>
          </View>
        </View>
      </Animated.View>

      {/* Quick Actions
      <View style={styles.quickActions}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.button }]} onPress={() => navigation.navigate("Dashboard")}>
          <Ionicons name="speedometer" size={28} color={theme.icon} />
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.button }]} onPress={() => navigation.navigate("Messages")}>
          <Ionicons name="chatbubbles" size={28} color={theme.icon} />
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.button }]} onPress={() => navigation.navigate("Calendar")}>
          <Ionicons name="calendar" size={28} color={theme.icon} />
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>Calendar</Text>
        </TouchableOpacity>
      </View> */}

      {/* Upcoming Events */}
      <Animated.View entering={SlideInRight.delay(200)} style={styles.eventsSection}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Upcoming Events</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Calendar")}>
            <Text style={{ color: theme.accent }}>See All</Text>
          </TouchableOpacity>
        </View>
        {upcomingEvents.map(event => (
          <View key={event.id} style={[styles.eventCard, { backgroundColor: theme.card }]}>
            <View style={styles.eventIconContainer}>
              <Ionicons name="calendar" size={24} color={theme.accent} />
            </View>
            <View style={styles.eventDetails}>
              <Text style={[styles.eventTitle, { color: theme.text }]}>{event.title}</Text>
              <Text style={[styles.eventDate, { color: theme.textSecondary }]}>{event.date}</Text>
              <Text style={[styles.eventLocation, { color: theme.textSecondary }]}>
                <Ionicons name="location-outline" size={12} /> {event.location}
              </Text>
            </View>
          </View>
        ))}
      </Animated.View>

      {/* Notifications */}
      <Animated.View entering={SlideInRight.delay(300)} style={styles.notificationsSection}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Notifications</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
            <Text style={{ color: theme.accent }}>See All</Text>
          </TouchableOpacity>
        </View>
        {notifications.map(notification => (
          <View key={notification.id} style={[styles.notificationCard, { backgroundColor: theme.card }]}>
            <View style={[styles.notificationDot, { backgroundColor: theme.accent }]} />
            <View style={styles.notificationContent}>
              <Text style={[styles.notificationTitle, { color: theme.text }]}>{notification.title}</Text>
              <Text style={[styles.notificationDesc, { color: theme.textSecondary }]}>{notification.description}</Text>
              <Text style={[styles.notificationTime, { color: theme.textSecondary }]}>{notification.time}</Text>
            </View>
          </View>
        ))}
      </Animated.View>

      {/* News/Recent Updates Section */}
      <Animated.View entering={FadeIn.delay(400)} style={styles.newsSection}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Latest Updates</Text>
          <TouchableOpacity onPress={() => navigation.navigate("News")}>
            <Text style={{ color: theme.accent }}>More</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.newsCard, { backgroundColor: theme.card }]}>
          <Image 
            source={{ uri: "https://picsum.photos/200/100" }} 
            style={styles.newsImage} 
          />
          <View style={styles.newsContent}>
            <Text style={[styles.newsTitle, { color: theme.text }]}>New Feature Release</Text>
            <Text style={[styles.newsDescription, { color: theme.textSecondary }]}>
              Discover the latest improvements to our platform that will enhance your productivity.
            </Text>
            <Text style={[styles.newsTime, { color: theme.textSecondary }]}>Posted 2 days ago</Text>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    padding: 20 
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  headerLeft: {
    flex: 1
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold" 
  },
  subtitle: { 
    fontSize: 16 
  },
  weatherCard: { 
    padding: 15, 
    borderRadius: 15, 
    elevation: 3, 
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  weatherContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  weatherDetails: {
    marginLeft: 15
  },
  weatherText: { 
    fontSize: 22, 
    fontWeight: "bold"
  },
  weatherCondition: { 
    fontSize: 14 
  },
  forecastButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statsContainer: {
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  statItem: {
    alignItems: 'center',
    flex: 1
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2
  },
  quickActions: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginBottom: 20 
  },
  actionButton: { 
    flex: 1, 
    padding: 15, 
    marginHorizontal: 5, 
    borderRadius: 15, 
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  buttonText: { 
    fontSize: 14, 
    marginTop: 5,
    fontWeight: "500"
  },
  eventsSection: {
    marginBottom: 20
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  eventCard: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  eventIconContainer: {
    marginRight: 15,
    justifyContent: 'center'
  },
  eventDetails: {
    flex: 1
  },
  eventTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 3
  },
  eventDate: {
    fontSize: 14,
    marginBottom: 3
  },
  eventLocation: {
    fontSize: 12
  },
  notificationsSection: {
    marginBottom: 20
  },
  notificationCard: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 2,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  notificationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 15
  },
  notificationContent: {
    flex: 1
  },
  notificationTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 3
  },
  notificationDesc: {
    fontSize: 14,
    marginBottom: 3
  },
  notificationTime: {
    fontSize: 12
  },
  newsSection: {
    marginBottom: 20
  },
  newsCard: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  newsImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover'
  },
  newsContent: {
    padding: 15
  },
  newsTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5
  },
  newsDescription: {
    fontSize: 14,
    marginBottom: 5
  },
  newsTime: {
    fontSize: 12
  }
});

export default HomeScreen;