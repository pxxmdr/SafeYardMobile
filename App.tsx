import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ThemeProvider, useTheme } from './src/theme/ThemeProvider';
import OnOffMode from './src/components/OnOffMode';
import LanguageToggle from './src/components/LanguageToggle';

// TELAS
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import AdminRegisterScreen from './src/screens/AdminRegisterScreen';
import AdminManageScreen from './src/screens/AdminManageScreen';
import VisualizarPatiosScreen from './src/screens/VizualizarPatiosScreen';
import DevolucaoScreen from './src/screens/DevolucaoScreen';
import MyProfileScreen from './src/screens/MyProfileScreen';

// i18n Provider
import { LanguageProvider } from './src/context/LanguageProvider';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  AdminRegister: undefined;
  AdminManage: undefined;
  VisualizarPatios: undefined;
  Devolucao: undefined;
  MyProfile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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

      {/* FABs fixos: seletor de idioma + tema */}
      <View style={styles.fabRow}>
        <LanguageToggle />
        <OnOffMode width={64} />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppInner />
      </LanguageProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  fabRow: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
