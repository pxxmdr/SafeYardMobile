import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BackgroundPages from '../components/BackgroundPages';
import NavBarClient from '../components/NavBarClient';
import { useTheme } from '../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';

type RouteParams = { localizacao?: string };

export default function DevolucaoScreen() {
  const route = useRoute();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { localizacao } = (route.params as RouteParams) || {};

  const [cpf, setCpf] = useState('');
  const [placaMoto, setPlacaMoto] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const formatCPF = (value: string) =>
    value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .substring(0, 14);

  const formatPlaca = (value: string) =>
    value
      .toUpperCase()
      .replace(/[^A-Z0-9-]/g, '')
      .replace(/(\w{3})(\w{1,4})/, '$1-$2')
      .substring(0, 8);

  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  const placaRegex = /^(?:[A-Z]{3}-\d{4}|[A-Z]{3}[A-Z0-9]{4})$/;

  const handleDevolucao = () => {
    setErrorMessage('');

    if (!cpf || !placaMoto) {
      setErrorMessage(t('client.return.required'));
      return;
    }
    if (!cpfRegex.test(cpf)) {
      setErrorMessage(t('errors.cpfInvalid'));
      return;
    }
    if (!placaRegex.test(placaMoto.toUpperCase())) {
      setErrorMessage(t('client.return.plateInvalid'));
      return;
    }

    Alert.alert(
      t('client.return.successTitle'),
      t('client.return.success', { plate: placaMoto, place: localizacao || t('client.return.unknownPlace') })
    );

    setCpf('');
    setPlacaMoto('');
  };

  return (
    <BackgroundPages>
      <NavBarClient currentPage="Visualizar" />
      <ScrollView
        contentContainerStyle={[
          styles.card,
          theme.mode === 'dark'
            ? { backgroundColor: 'rgba(0,0,0,0.6)' }
            : { backgroundColor: theme.colors.surface }
        ]}
      >
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {t('client.return.title')}
        </Text>

        <TextInput
          placeholder={`${t('forms.cpf')} *`}
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, { backgroundColor: theme.colors.surfaceAlt, color: theme.colors.text }]}
          value={cpf}
          onChangeText={(text) => setCpf(formatCPF(text))}
          keyboardType="numeric"
        />

        <TextInput
          placeholder={`${t('forms.plate')} *`}
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, { backgroundColor: theme.colors.surfaceAlt, color: theme.colors.text }]}
          value={placaMoto}
          onChangeText={(text) => setPlacaMoto(formatPlaca(text))}
          autoCapitalize="characters"
        />

        <Text style={[styles.locationLabel, { color: theme.colors.text }]}>
          {t('client.return.locationLabel')}
        </Text>
        <Text style={[styles.locationText, { color: theme.colors.textMuted }]}>
          {localizacao || t('client.return.unknownPlace')}
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={handleDevolucao}
          activeOpacity={0.9}
        >
          <Text style={[styles.buttonText, { color: theme.colors.onPrimary }]}>
            {t('client.return.confirm')}
          </Text>
        </TouchableOpacity>

        {!!errorMessage && (
          <Text style={[styles.error, { color: theme.colors.danger }]}>{errorMessage}</Text>
        )}
      </ScrollView>
    </BackgroundPages>
  );
}

const styles = StyleSheet.create({
  card: { padding: 24, borderRadius: 12, gap: 16, marginTop: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  input: { borderRadius: 8, padding: 12 },
  locationLabel: { fontSize: 16, marginTop: 8 },
  locationText: { fontSize: 14, marginBottom: 16 },
  button: { paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonText: { fontWeight: 'bold', fontSize: 16 },
  error: { textAlign: 'center', marginTop: 12, fontSize: 12 }
});
