import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../theme/ThemeProvider';

type RootStackParamList = {
  Login: undefined;
  AdminRegister: undefined;
  AdminManage: undefined;
};

type Props = {
  currentPage: 'Cadastro' | 'Gerenciar';
};

export default function NavBarAdm({ currentPage }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.navbar,
        {
          backgroundColor: theme.mode === 'dark' ? 'rgba(0,0,0,0.9)' : theme.colors.background,
          borderBottomColor: theme.colors.primary,
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.navItemContainer,
          currentPage === 'Cadastro' && { backgroundColor: theme.colors.primary },
        ]}
        onPress={() => navigation.navigate('AdminRegister')}
      >
        <Text
          style={[
            styles.navItem,
            { color: theme.colors.text },
            currentPage === 'Cadastro' && { color: '#000', fontWeight: 'bold' },
          ]}
        >
          Cadastro Alugações
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.navItemContainer,
          currentPage === 'Gerenciar' && { backgroundColor: theme.colors.primary },
        ]}
        onPress={() => navigation.navigate('AdminManage')}
      >
        <Text
          style={[
            styles.navItem,
            { color: theme.colors.text },
            currentPage === 'Gerenciar' && { color: '#000', fontWeight: 'bold' },
          ]}
        >
          Gerenciar Alugações
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.logout, { color: theme.colors.text, textDecorationColor: theme.colors.text }]}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    marginTop: 10,
    gap: 8,
  },
  navItemContainer: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  navItem: {
    fontSize: 16,
    textAlign: 'center',
  },
  logout: {
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});
