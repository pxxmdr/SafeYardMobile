import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundPages from '../components/BackgroundPages';
import CustomButton from '../components/CustomButton';
import NavBarAdm from '../components/NavBarAdm';
import { colors } from '../styles/colors';

export default function AdminRegisterScreen() {
  const [cpf, setCpf] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [placaMoto, setPlacaMoto] = useState('');
  const [dataRetirada, setDataRetirada] = useState('');
  const [dataDevolucao, setDataDevolucao] = useState('');
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

  const formatDate = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .substring(0, 10);
  };

  const saveAlugacao = async () => {
    const newAlugacao = {
      id: Date.now().toString(),
      cpf,
      nomeCliente,
      placaMoto,
      dataRetirada,
      dataDevolucao,
    };

    try {
      const existingData = await AsyncStorage.getItem('alugacoes');
      const alugacoes = existingData ? JSON.parse(existingData) : [];
      alugacoes.push(newAlugacao);
      await AsyncStorage.setItem('alugacoes', JSON.stringify(alugacoes));
    } catch (error) {
      console.error('Erro ao salvar a alugação', error);
    }
  };

  const handleRegister = async () => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const placaRegex = /^[A-Z]{3}-\d{4}$/;
    const dataRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (!cpf || !nomeCliente || !placaMoto || !dataRetirada || !dataDevolucao) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
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

    if (!dataRegex.test(dataRetirada) || !dataRegex.test(dataDevolucao)) {
      setErrorMessage('Data inválida. Formato correto: DD/MM/AAAA');
      return;
    }

    await saveAlugacao();

    setCpf('');
    setNomeCliente('');
    setPlacaMoto('');
    setDataRetirada('');
    setDataDevolucao('');
    setErrorMessage('');
  };

  return (
    <BackgroundPages>
      <NavBarAdm currentPage="Cadastro" />
      <ScrollView contentContainerStyle={styles.card}>
        <Text style={styles.title}>Cadastrar Alugação</Text>

        <TextInput
          placeholder="CPF do Cliente *"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={cpf}
          onChangeText={(text) => setCpf(formatCPF(text))}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Nome do Cliente *"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={nomeCliente}
          onChangeText={setNomeCliente}
        />

        <TextInput
          placeholder="Placa da Moto *"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={placaMoto}
          onChangeText={(text) => setPlacaMoto(formatPlaca(text))}
        />

        <TextInput
          placeholder="Data de Retirada (DD/MM/AAAA) *"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={dataRetirada}
          onChangeText={(text) => setDataRetirada(formatDate(text))}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Data de Devolução (DD/MM/AAAA) *"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={dataDevolucao}
          onChangeText={(text) => setDataDevolucao(formatDate(text))}
          keyboardType="numeric"
        />

        <CustomButton title="Cadastrar Alugação" onPress={handleRegister} />

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/LogoMottu.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
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
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 12,
    fontSize: 12,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  logo: {
    width: 120,
    height: 60,
  },
});
