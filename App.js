import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import StatsScreen from './screens/StatsScreen';
import AddPlantationScreen from './screens/AddPlantationScreen';
import PlantationDetailsScreen from './screens/PlantationDetailsScreen';
import ThemeToggle from './components/ThemeToggle';
import WeatherWidget from './components/WeatherWidget';
import { COLORS } from './utils/constants';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [plantations, setPlantations] = useState([]);

  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        <Stack.Navigator
          screenOptions={{
            header: ({ navigation, route }) => (
              <View style={[styles.header, { backgroundColor: theme.primary, borderColor: theme.border }]}>

                <View style={styles.headerContent}>

                  <View style={styles.headerSide} />
                  

                  <View style={styles.headerCenter}>
                    <WeatherWidget theme={theme} />
                  </View>

                  <View style={styles.headerSide}>
                    <ThemeToggle isDark={isDarkMode} onToggle={toggleTheme} theme={theme} />
                  </View>
                </View>
              </View>
            ),
            animation: 'slide_from_right',
            contentStyle: { backgroundColor: theme.background }
          }}
        >
          <Stack.Screen name="Home">
            {(props) => (
              <HomeScreen 
                {...props} 
                theme={theme} 
                onPlantationsUpdate={setPlantations} 
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Stats">
            {(props) => (
              <StatsScreen 
                {...props} 
                theme={theme} 
                plantations={plantations} 
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="AddPlantation">
             {(props) => <AddPlantationScreen {...props} theme={theme} />}
          </Stack.Screen>
          <Stack.Screen name="PlantationDetails">
             {(props) => <PlantationDetailsScreen {...props} theme={theme} />}
          </Stack.Screen>

        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 50, 
  },
  headerSide: {
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});