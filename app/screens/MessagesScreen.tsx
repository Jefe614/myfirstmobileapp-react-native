import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../components/theme"; // Import theme

export default function MessagesScreen({ navigation }) {
  const theme = useTheme(); // Get the current theme
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample conversations data
  const [conversations, setConversations] = useState([
    {
      id: "1",
      name: "Emma Wilson",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      lastMessage: "Let's discuss the project proposal tomorrow",
      time: "10:24 AM",
      unread: 2,
      online: true
    },
    {
      id: "2",
      name: "James Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      lastMessage: "The meeting has been rescheduled to 3 PM",
      time: "Yesterday",
      unread: 0,
      online: false
    },
    {
      id: "3",
      name: "Olivia Martinez",
      avatar: "https://randomuser.me/api/portraits/women/26.jpg",
      lastMessage: "I've sent you the files you requested",
      time: "Yesterday",
      unread: 1,
      online: true
    },
    {
      id: "4",
      name: "Michael Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      lastMessage: "Can you review the latest changes?",
      time: "Mar 2",
      unread: 0,
      online: false
    },
    {
      id: "5",
      name: "Sophia Chen",
      avatar: "https://randomuser.me/api/portraits/women/54.jpg",
      lastMessage: "Thank you for your help!",
      time: "Mar 1",
      unread: 0,
      online: true
    },
    {
      id: "6",
      name: "Design Team",
      avatar: "https://randomuser.me/api/portraits/men/68.jpg",
      lastMessage: "Sarah: The new mockups look great",
      time: "Feb 28",
      unread: 0,
      isGroup: true,
      online: false,
      participants: 6
    },
    {
      id: "7",
      name: "Project Falcon",
      avatar: "https://randomuser.me/api/portraits/women/76.jpg",
      lastMessage: "Alex: Let's finalize the presentation",
      time: "Feb 27",
      unread: 0,
      isGroup: true,
      online: false,
      participants: 8
    }
  ]);

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(convo => 
    convo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderConversationItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.conversationItem, { borderBottomColor: theme.border }]} 
      onPress={() => navigation.navigate("Chat", { conversation: item })}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.online && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={[styles.conversationName, { color: theme.text }]}>
            {item.name}
            {item.isGroup && 
              <Text style={[styles.groupIndicator, { color: theme.textSecondary }]}>
                {` · ${item.participants} members`}
              </Text>
            }
          </Text>
          <Text style={[styles.conversationTime, { color: theme.textSecondary }]}>{item.time}</Text>
        </View>
        
        <View style={styles.conversationFooter}>
          <Text 
            style={[
              styles.conversationLastMessage, 
              { color: item.unread > 0 ? theme.text : theme.textSecondary }
            ]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          
          {item.unread > 0 && (
            <View style={[styles.unreadBadge, { backgroundColor: theme.accent }]}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Messages</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate("NewMessage")}>
            <Ionicons name="create-outline" size={24} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={() => alert("Filter conversations")}>
            <Ionicons name="options-outline" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.inputBackground }]}>
        <Ionicons name="search" size={20} color={theme.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search conversations"
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Online Users */}
      <View style={styles.onlineUsersContainer}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Online Now</Text>
        <FlatList
          horizontal
          data={conversations.filter(c => c.online)}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.onlineUser}
              onPress={() => navigation.navigate("Chat", { conversation: item })}
            >
              <View style={styles.onlineAvatarContainer}>
                <Image source={{ uri: item.avatar }} style={styles.onlineAvatar} />
                <View style={styles.onlineIndicatorSmall} />
              </View>
              <Text style={[styles.onlineUserName, { color: theme.text }]} numberOfLines={1}>
                {item.name.split(" ")[0]}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.onlineUsersList}
        />
      </View>
      
      {/* Conversations */}
      <View style={styles.conversationsContainer}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Chats</Text>
        {filteredConversations.length > 0 ? (
          <FlatList
            data={filteredConversations}
            keyExtractor={(item) => item.id}
            renderItem={renderConversationItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.conversationsList}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubble-ellipses-outline" size={60} color={theme.textSecondary} />
            <Text style={[styles.emptyStateText, { color: theme.textSecondary }]}>
              {searchQuery.length > 0 
                ? "No conversations matching your search" 
                : "No conversations yet"}
            </Text>
          </View>
        )}
      </View>
      
      {/* Floating Action Button */}
      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: theme.accent }]} 
        onPress={() => navigation.navigate("NewMessage")}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
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
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  headerButtons: {
    flexDirection: "row",
  },
  headerButton: {
    marginLeft: 15,
    padding: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  onlineUsersContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  onlineUsersList: {
    paddingHorizontal: 15,
  },
  onlineUser: {
    alignItems: "center",
    marginHorizontal: 8,
    width: 70,
  },
  onlineAvatarContainer: {
    position: "relative",
    marginBottom: 5,
  },
  onlineAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  onlineIndicatorSmall: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  onlineUserName: {
    fontSize: 12,
    textAlign: "center",
  },
  conversationsContainer: {
    flex: 1,
    marginTop: 20,
  },
  conversationsList: {
    paddingBottom: 80, // Space for FAB
  },
  conversationItem: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  conversationContent: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  conversationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  conversationName: {
    fontWeight: "600",
    fontSize: 16,
  },
  groupIndicator: {
    fontWeight: "normal",
    fontSize: 12,
  },
  conversationTime: {
    fontSize: 12,
  },
  conversationFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  conversationLastMessage: {
    flex: 1,
    fontSize: 14,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    marginLeft: 10,
  },
  unreadText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyStateText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  }
});