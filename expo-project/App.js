import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import MapScreen from './src/screens/MapScreen';

const Tab = createBottomTabNavigator();

// Dummy screens for other tabs
const DummyScreen = ({ name }) => (
  <View style={styles.dummyContainer}>
    <Text style={styles.dummyText}>{name} Screen</Text>
    <Text style={styles.dummySubtext}>Coming soon...</Text>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#0B3D91',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarStyle: {
            borderTopWidth: 1,
            borderTopColor: '#F3F4F6',
            elevation: 0,
            shadowOpacity: 0,
            height: 85,
            paddingBottom: 30,
            paddingTop: 10,
            backgroundColor: '#FFFFFF'
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
            marginTop: 4
          },
          tabBarIcon: ({ color, focused }) => {
            let icon = '🏠';
            if (route.name === 'Servicios') icon = '🔧';
            else if (route.name === 'Actividad') icon = '📋';
            else if (route.name === 'Perfil') icon = '👤';
            
            return (
              <Text style={{ fontSize: 22, color, opacity: focused ? 1 : 0.6 }}>
                {icon}
              </Text>
            );
          }
        })}
      >
        <Tab.Screen name="Inicio" component={MapScreen} />
        <Tab.Screen name="Servicios">
          {() => <DummyScreen name="Servicios" />}
        </Tab.Screen>
        <Tab.Screen name="Actividad">
          {() => <DummyScreen name="Actividad" />}
        </Tab.Screen>
        <Tab.Screen name="Perfil">
          {() => <DummyScreen name="Perfil" />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  dummyContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  dummyText: { 
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#000000'
  },
  dummySubtext: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8
  }
});
