import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./tabs";
import AddBeerScreen from "../screens/AddBeerScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddBeer"
          component={AddBeerScreen}
          options={{ title: "Add Beer" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
