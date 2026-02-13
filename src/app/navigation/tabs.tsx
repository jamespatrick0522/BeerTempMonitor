import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import PlaceholderScreen from "../screens/PlaceHolderScreen";

const Tab = createBottomTabNavigator();

function getTabIcon(routeName: string, focused: boolean) {
  switch (routeName) {
    case "Home":
      return focused ? "home" : "home-outline";
    case "Orders":
      return focused ? "receipt" : "receipt-outline";
    case "Deliveries":
      return focused ? "car" : "car-outline";
    case "Settings":
      return focused ? "settings" : "settings-outline";
    default:
      return focused ? "ellipse" : "ellipse-outline";
  }
}

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: { backgroundColor: "#102735", borderTopColor: "#1F3A4A" },
        tabBarActiveTintColor: "#06B6D4",
        tabBarInactiveTintColor: "#94A3B8",

        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={getTabIcon(route.name, focused) as any}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Orders">
        {() => <PlaceholderScreen title="Orders" />}
      </Tab.Screen>
      <Tab.Screen name="Deliveries">
        {() => <PlaceholderScreen title="Deliveries" />}
      </Tab.Screen>
      <Tab.Screen name="Settings">
        {() => <PlaceholderScreen title="Settings" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
