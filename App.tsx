import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import AdminRegisterScreen from './src/screens/AdminRegisterScreen';
import AdminManageScreen from './src/screens/AdminManageScreen';
import VisualizarPatiosScreen from './src/screens/VizualizarPatiosScreen';
import DevolucaoScreen from './src/screens/DevolucaoScreen';
import MyProfileScreen from './src/screens/MyProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
  );
}
