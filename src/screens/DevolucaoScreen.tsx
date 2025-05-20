import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BackgroundPages from '../components/BackgroundPages';
import NavBarClient from '../components/NavBarClient';
import { colors } from '../styles/colors';

export default function DevolucaoScreen() {
  const route = useRoute();
  const { localizacao } = route.params as { localizacao: string };

  const [cpf, setCpf] = useState('');
  const [placaMoto, setPlacaMoto] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .substring(0, 14);
  };

  const formatPlaca = (value: string) => {
    return value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .replace(/(\w{3})(\w{1,4})/, '$1-$2')
      .substring(0, 8);
  };

  const handleDevolucao = () => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const placaRegex = /^[A-Z]{3}-\d{4}$/;

    if (!cpf || !placaMoto) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    if (!cpfRegex.test(cpf)) {
      setErrorMessage('CPF inválido. Formato correto: 123.456.789-01');
      return;
    }

    if (!placaRegex.test(placaMoto)) {
      setErrorMessage('Placa inválida. Formato correto: ABC-1234');
      return;
    }

    console.log(`Moto ${placaMoto} será devolvida no local: ${localizacao}`);
    setCpf('');
    setPlacaMoto('');
    setErrorMessage('');
    alert('Devolução confirmada!');
  };

  return (
    <BackgroundPages>
      <NavBarClient currentPage="Visualizar" />
      <ScrollView contentContainerStyle={styles.card}>
        <Text style={styles.title}>Devolver Moto</Text>

        <TextInput
          placeholder="CPF *"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={cpf}
          onChangeText={(text) => setCpf(formatCPF(text))}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Placa da Moto *"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={placaMoto}
          onChangeText={(text) => setPlacaMoto(formatPlaca(text))}
        />

        <Text style={styles.locationLabel}>Localização de Devolução:</Text>
        <Text style={styles.locationText}>{localizacao}</Text>

        <TouchableOpacity style={styles.button} onPress={handleDevolucao}>
          <Text style={styles.buttonText}>Confirmar Devolução</Text>
        </TouchableOpacity>

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      </ScrollView>
    </BackgroundPages>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 24,
    borderRadius: 12,
    gap: 16,
    marginTop: 40,
  },
  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 8,
    padding: 12,
    color: colors.white,
  },
  locationLabel: {
    color: colors.white,
    fontSize: 16,
    marginTop: 16,
  },
  locationText: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 12,
    fontSize: 12,
  },
});
