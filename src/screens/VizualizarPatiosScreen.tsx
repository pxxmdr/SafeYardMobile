// src/screens/VizualizarPatiosScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import BackgroundPages from '../components/BackgroundPages';
import NavBarClient from '../components/NavBarClient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';

type RootStackParamList = { Devolucao: { localizacao: string } };
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Patio = {
  id: string;
  nome: string;
  localizacao: string;
  vagas: number;
  imagem: any;
};

const patios: Patio[] = [
  { id: '1', nome: 'Butantã',      localizacao: 'Rua Agostinho Cantu, 209',          vagas: 120, imagem: require('../../assets/MottuButanta.png') },
  { id: '2', nome: 'Limão',        localizacao: 'Av. Prof. Celestino Bourroul, 363', vagas: 340, imagem: require('../../assets/MottuLimao.png') },
  { id: '3', nome: 'Taboão',       localizacao: 'R. Roberta Simões Souza, 1440',     vagas: 80,  imagem: require('../../assets/MottuTaboao.png') },
  { id: '4', nome: 'Interlagos',   localizacao: 'R. Antônio Mariano, 351',           vagas: 275, imagem: require('../../assets/MottuInterlagos.png') },
  { id: '5', nome: 'São Bernardo', localizacao: 'Av. Moinho Fabrini, 128',           vagas: 150, imagem: require('../../assets/MottuSBC.png') },
];

export default function VisualizarPatiosScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <BackgroundPages>
      <NavBarClient currentPage="Visualizar" />

      <ScrollView contentContainerStyle={styles.container}>
        {patios.map((patio) => (
          <View
            key={patio.id}
            style={[
              styles.card,
              theme.mode === 'dark'
                ? { backgroundColor: 'rgba(0,0,0,0.6)' }
                : {
                    backgroundColor: theme.colors.surface,
                    borderWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                    shadowRadius: 0,
                    shadowOffset: { width: 0, height: 0 },
                  },
            ]}
          >
            <Image source={patio.imagem} style={styles.image} />
            <Text style={[styles.title, { color: theme.colors.text }]}>{patio.nome}</Text>
            <Text style={[styles.location, { color: theme.colors.textMuted }]}>{patio.localizacao}</Text>

            <Text style={[styles.vagas, { color: theme.colors.primary }]}>
              {t('client.yards.spots', 'Vagas')}: {patio.vagas}/500
            </Text>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
              onPress={() => navigation.navigate('Devolucao', { localizacao: patio.localizacao })}
              activeOpacity={0.85}
            >
              <Text style={[styles.buttonText, { color: theme.colors.onPrimary }]}>
                {t('client.yards.select', 'Selecionar')}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </BackgroundPages>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 16,
  },
  card: {
    width: '45%',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  location: {
    fontSize: 14,
    marginVertical: 4,
    textAlign: 'center',
  },
  vagas: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});
