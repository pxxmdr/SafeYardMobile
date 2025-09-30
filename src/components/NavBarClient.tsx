import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../theme/ThemeProvider';
import { logout as doLogout } from '../services/auth';

type RootStackParamList = {
  Login: undefined;
  VisualizarPatios: undefined;
  MyProfile: undefined;
};

type Props = { currentPage: 'Visualizar' | 'Perfil' };

export default function NavBarClient({ currentPage }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const [leaving, setLeaving] = useState(false);

  const handleLogout = async () => {
    if (leaving) return;
    setLeaving(true);
    await doLogout();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    setLeaving(false);
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.navbar,
          { backgroundColor: theme.mode === 'dark' ? 'rgba(0,0,0,0.9)' : theme.colors.surface },
        ]}
      >
        <TouchableOpacity
          style={[styles.tab, currentPage === 'Visualizar' && { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.navigate('VisualizarPatios')}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.tabText,
              { color: theme.colors.text },
              currentPage === 'Visualizar' && { color: '#000', fontWeight: 'bold' },
            ]}
          >
            Visualizar Pátios
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, currentPage === 'Perfil' && { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.navigate('MyProfile')}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.tabText,
              { color: theme.colors.text },
              currentPage === 'Perfil' && { color: '#000', fontWeight: 'bold' },
            ]}
          >
            Meu Perfil
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} disabled={leaving}>
          {leaving ? (
            <ActivityIndicator />
          ) : (
            <Text
              style={[
                styles.logout,
                { color: theme.colors.text, textDecorationColor: theme.colors.text },
              ]}
            >
              Logout
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={[styles.underline, { backgroundColor: theme.colors.primary }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginTop: 10 },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
    borderRadius: 8,
  },
  underline: { height: 3, marginTop: 8, marginHorizontal: 16, borderRadius: 999 },
  tab: { flex: 1, alignItems: 'center', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 12 },
  tabText: { fontSize: 14, textAlign: 'center' },
  logout: { fontSize: 14, textDecorationLine: 'underline', fontWeight: '600' },
});
