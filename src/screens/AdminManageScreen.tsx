import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BackgroundPages from '../components/BackgroundPages';
import NavBarAdm from '../components/NavBarAdm';
import { useTheme } from '../theme/ThemeProvider';
import { listAlugacoesForm, type AlugacaoCard } from '../services/alugacao';

export default function AdminManageScreen() {
  const { theme } = useTheme();
  const [alugacoes, setAlugacoes] = useState<AlugacaoCard[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const loadAlugacoes = async () => {
    try {
      setErrorMsg('');
      const arr = await listAlugacoesForm();
      setAlugacoes([...arr].reverse());
    } catch (e: any) {
      setErrorMsg(e?.message || 'Erro ao carregar as alugações');
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

  const renderItem = ({ item }: { item: AlugacaoCard }) => (
    <View
      style={[
        styles.itemContainer,
        { backgroundColor: theme.colors.surface, borderColor: theme.colors.divider },
      ]}
    >
      <Text style={[styles.itemId, { color: theme.colors.text }]}>ID: {String(item.id)}</Text>
      <Text style={[styles.itemText, { color: theme.colors.text }]}>Cliente: {item.nome}</Text>
      <Text style={[styles.itemText, { color: theme.colors.text }]}>CPF: {item.cpf}</Text>
      <Text style={[styles.itemText, { color: theme.colors.text }]}>Placa: {item.placa}</Text>
      <Text style={[styles.itemText, { color: theme.colors.text }]}>Retirada: {item.dataRetirada}</Text>
      <Text style={[styles.itemText, { color: theme.colors.text }]}>Devolução: {item.dataDevolucao}</Text>
    </View>
  );

  return (
    <BackgroundPages>
      <NavBarAdm currentPage="Gerenciar" />
      <Text style={[styles.title, { color: theme.colors.text }]}>Gerenciar Alugações</Text>

      {!!errorMsg && (
        <Text style={{ color: theme.colors.danger, textAlign: 'center', marginBottom: 8 }}>
          {errorMsg}
        </Text>
      )}

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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.colors.text} />
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
