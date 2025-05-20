import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors } from '../styles/colors';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  VisualizarPatios: undefined;
  MyProfile: undefined;
};

type Props = {
  currentPage: string;
};

export default function NavBarClient({ currentPage }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <>
      
      <View style={styles.navbar}>
        <TouchableOpacity
          style={[styles.navItemContainer, currentPage === 'Visualizar' && styles.activeContainer]}
          onPress={() => navigation.navigate('VisualizarPatios')}
        >
          <Text style={[styles.navItem, currentPage === 'Visualizar' && styles.activeText]}>
            Visualizar Pátios
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItemContainer, currentPage === 'Perfil' && styles.activeContainer]}
          onPress={() => navigation.navigate('MyProfile')}
        >
          <Text style={[styles.navItem, currentPage === 'Perfil' && styles.activeText]}>
            Meu Perfil
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: -10,
  },
  logo: {
    width: 80,
    height: 80,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    marginTop: 10,
  },
  navItemContainer: {
    flex: 1,
    alignItems: 'center',
  },
  navItem: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
  },
  activeContainer: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  logout: {
    color: colors.white,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});
