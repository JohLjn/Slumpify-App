import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ContextStorage from "./ContextStorage";
import HomeScreen from "./screens/HomeScreen.jsx";
import RandomizerScreen from "./screens/RandomizerScreen.jsx";
import SavedSongsScreen from "./screens/SavedSongsScreen.jsx";
import ContactScreen from "./screens/ContactScreen.jsx";

export default function App() {
  const [PigAppear, setPigAppear] = useState(false);

  const Stack = createStackNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ContextStorage.Provider
        value={{
          PigAppear,
          setPigAppear,
        }}
      >
        <View style={styles.navigationContainer}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Randomizer"
                component={RandomizerScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Saved Songs"
                component={SavedSongsScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Contact"
                component={ContactScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </ContextStorage.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  navigationContainer: {
    flex: 1,
    width: "100%",
  },
});
