import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import BackgroundPages from '../components/BackgroundPages';
import NavBarAdm from '../components/NavBarAdm';
import { useTheme } from '../theme/ThemeProvider';

type Alugacao = {
  id: string;
  cpf: string;
  nomeCliente: string;
  placaMoto: string;
  dataRetirada: string;
  dataDevolucao: string;
};

export default function AdminManageScreen() {
  const { theme } = useTheme();
  const [alugacoes, setAlugacoes] = useState<Alugacao[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadAlugacoes = async () => {
    try {
      const data = await AsyncStorage.getItem('alugacoes');
      if (data) {
        const arr: Alugacao[] = JSON.parse(data);
        setAlugacoes([...arr].reverse());
      } else {
        setAlugacoes([]);
      }
    } catch (error) {
      console.error('Erro ao carregar as alugações', error);
    }
  };

  useEffect(() => {
    loadAlugacoes();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadAlugacoes();
    }, [])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadAlugacoes();
    setRefreshing(false);
  }, []);

  const renderItem = ({ item }: { item: Alugacao }) => (
    <View
      style={[
        styles.itemContainer,
        { backgroundColor: theme.colors.surface, borderColor: theme.colors.divider },
      ]}
    >
      <Text style={[styles.itemId, { color: theme.colors.text }]}>ID: {String(item.id)}</Text>
      <Text style={[styles.itemText, { color: theme.colors.text }]}>
        Cliente: {item.nomeCliente}
      </Text>
      <Text style={[styles.itemText, { color: theme.colors.text }]}>CPF: {item.cpf}</Text>
      <Text style={[styles.itemText, { color: theme.colors.text }]}>Placa: {item.placaMoto}</Text>
      <Text style={[styles.itemText, { color: theme.colors.text }]}>
        Retirada: {item.dataRetirada}
      </Text>
      <Text style={[styles.itemText, { color: theme.colors.text }]}>
        Devolução: {item.dataDevolucao}
      </Text>
    </View>
  );

  return (
    <BackgroundPages>
      <NavBarAdm currentPage="Gerenciar" />
      <Text style={[styles.title, { color: theme.colors.text }]}>Gerenciar Alugações</Text>

      <FlatList
        data={alugacoes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={{ color: theme.colors.textMuted, textAlign: 'center', marginTop: 40 }}>
            Nenhuma alugação cadastrada ainda.
          </Text>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.text}
          />
        }
      />
    </BackgroundPages>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  itemContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: StyleSheet.hairlineWidth,
  },
  itemText: {
    fontSize: 14,
    marginBottom: 4,
  },
  itemId: {
    opacity: 0.95,
    fontWeight: '800',
    marginBottom: 8,
    fontSize: 14,
  },
});
