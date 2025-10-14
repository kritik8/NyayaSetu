import { Tabs } from "expo-router";
import {
  LayoutDashboard,
  MessageSquare,
  UserCircle,
  ScrollText,
} from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: "#1A73E8",
        tabBarInactiveTintColor: "#6B7280",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <LayoutDashboard color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <MessageSquare color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <UserCircle color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="claims"
        options={{
          title: "My Claims",
          tabBarIcon: ({ color, size }) => (
            <ScrollText color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="complaint/[step]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="marriage/[step]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="claim/[id]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="grievance"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
