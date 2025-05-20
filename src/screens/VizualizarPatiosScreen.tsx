import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import BackgroundPages from '../components/BackgroundPages';
import NavBarClient from '../components/NavBarClient';
import { colors } from '../styles/colors';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Devolucao: { localizacao: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Patio = {
  id: string;
  nome: string;
  localizacao: string;
  vagas: number;
  imagem: any;
};

const patios: Patio[] = [
  {
    id: '1',
    nome: 'Butantã',
    localizacao: 'Rua Agostinho Cantu, 209',
    vagas: 120,
    imagem: require('../../assets/MottuButanta.png'),
  },
  {
    id: '2',
    nome: 'Limão',
    localizacao: 'Av. Prof. Celestino Bourroul, 363',
    vagas: 340,
    imagem: require('../../assets/MottuLimao.png'),
  },
  {
    id: '3',
    nome: 'Taboão',
    localizacao: 'R. Roberta Simões Souza, 1440',
    vagas: 80,
    imagem: require('../../assets/MottuTaboao.png'),
  },
  {
    id: '4',
    nome: 'Interlagos',
    localizacao: 'R. Antônio Mariano, 351',
    vagas: 275,
    imagem: require('../../assets/MottuInterlagos.png'),
  },
  {
    id: '5',
    nome: 'São Bernardo',
    localizacao: 'Av. Moinho Fabrini, 128',
    vagas: 150,
    imagem: require('../../assets/MottuSBC.png'),
  },
];

export default function VisualizarPatiosScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <BackgroundPages>
      <NavBarClient currentPage="Visualizar" />
      <ScrollView contentContainerStyle={styles.container}>
        {patios.map((patio) => (
          <View key={patio.id} style={styles.card}>
            <Image source={patio.imagem} style={styles.image} />
            <Text style={styles.title}>{patio.nome}</Text>
            <Text style={styles.location}>{patio.localizacao}</Text>
            <Text style={styles.vagas}>Vagas: {patio.vagas}/500</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Devolucao', { localizacao: patio.localizacao })}
            >
              <Text style={styles.buttonText}>Selecionar</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    color: '#ccc',
    fontSize: 14,
    marginVertical: 4,
    textAlign: 'center',
  },
  vagas: {
    color: colors.primary,
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});
