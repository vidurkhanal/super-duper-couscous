import { Provider, createClient } from "urql";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { URQLClient } from "./utils/gqlclient";
import Home from "./screens/Home";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider value={createClient(URQLClient())}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
