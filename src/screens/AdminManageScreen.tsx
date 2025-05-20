import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundPages from '../components/BackgroundPages';
import NavBarAdm from '../components/NavBarAdm';
import { colors } from '../styles/colors';

type Alugacao = {
  id: string;
  cpf: string;
  nomeCliente: string;
  placaMoto: string;
  dataRetirada: string;
  dataDevolucao: string;
};

export default function AdminManageScreen() {
  const [alugacoes, setAlugacoes] = useState<Alugacao[]>([]);

  const loadAlugacoes = async () => {
    try {
      const data = await AsyncStorage.getItem('alugacoes');
      if (data) {
        setAlugacoes(JSON.parse(data));
      }
    } catch (error) {
      console.error('Erro ao carregar as alugações', error);
    }
  };

  useEffect(() => {
     loadAlugacoes();
}, []);

  const renderItem = ({ item }: { item: Alugacao }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Cliente: {item.nomeCliente}</Text>
      <Text style={styles.itemText}>CPF: {item.cpf}</Text>
      <Text style={styles.itemText}>Placa: {item.placaMoto}</Text>
      <Text style={styles.itemText}>Retirada: {item.dataRetirada}</Text>
      <Text style={styles.itemText}>Devolução: {item.dataDevolucao}</Text>
    </View>
  );

  return (
    <BackgroundPages>
      <NavBarAdm currentPage="Gerenciar" />
      <Text style={styles.title}>Gerenciar Alugações</Text>
      <FlatList
        data={alugacoes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma alugação cadastrada ainda.</Text>}
      />
    </BackgroundPages>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  itemContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  itemText: {
    color: colors.white,
    fontSize: 14,
    marginBottom: 4,
  },
  emptyText: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
});
