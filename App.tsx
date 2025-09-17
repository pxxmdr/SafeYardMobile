import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ThemeProvider, useTheme } from './src/theme/ThemeProvider';
import OnOffMode from './src/components/OnOffMode';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import AdminRegisterScreen from './src/screens/AdminRegisterScreen';
import AdminManageScreen from './src/screens/AdminManageScreen';
import VisualizarPatiosScreen from './src/screens/VizualizarPatiosScreen';
import DevolucaoScreen from './src/screens/DevolucaoScreen';
import MyProfileScreen from './src/screens/MyProfileScreen';

const Stack = createNativeStackNavigator();

function AppInner() {
  const { theme } = useTheme();

  const navTheme = {
    ...(theme.mode === 'dark' ? DarkTheme : DefaultTheme),
    colors: {
      ...(theme.mode === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      primary: theme.colors.primary,
      border: theme.colors.divider,
      notification: theme.colors.primary,
    },
  };

  return (
    <View style={styles.root}>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="AdminRegister" component={AdminRegisterScreen} />
          <Stack.Screen name="AdminManage" component={AdminManageScreen} />
          <Stack.Screen name="VisualizarPatios" component={VisualizarPatiosScreen} />
          <Stack.Screen name="Devolucao" component={DevolucaoScreen} />
          <Stack.Screen name="MyProfile" component={MyProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <OnOffMode width={64} style={styles.toggle} />
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  toggle: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  
  },
});
