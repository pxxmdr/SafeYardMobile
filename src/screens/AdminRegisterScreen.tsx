import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundPages from '../components/BackgroundPages';
import CustomButton from '../components/CustomButton';
import NavBarAdm from '../components/NavBarAdm';
import { useTheme } from '../theme/ThemeProvider';

export default function AdminRegisterScreen() {
  const { theme } = useTheme();

  const [id, setId] = useState('');
  const [cpf, setCpf] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [placaMoto, setPlacaMoto] = useState('');
  const [dataRetirada, setDataRetirada] = useState('');
  const [dataDevolucao, setDataDevolucao] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const clearMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const formatCPF = (value: string) =>
    value.replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .substring(0, 14);

  const formatPlaca = (value: string) =>
    value.toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .replace(/(\w{3})(\w{1,4})/, '$1-$2')
      .substring(0, 8);

  const formatDate = (value: string) =>
    value.replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .substring(0, 10);

  // ===== Validações =====
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  const placaRegex = /^[A-Z]{3}-\d{4}$/;
  const dataRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  const validateCommonFields = () => {
    if (!cpf || !nomeCliente || !placaMoto || !dataRetirada || !dataDevolucao) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }
    if (!cpfRegex.test(cpf)) {
      setErrorMessage('CPF inválido. Formato correto: 123.456.789-01');
      return false;
    }
    if (!placaRegex.test(placaMoto)) {
      setErrorMessage('Placa inválida. Formato correto: ABC-1234');
      return false;
    }
    if (!dataRegex.test(dataRetirada) || !dataRegex.test(dataDevolucao)) {
      setErrorMessage('Data inválida. Formato correto: DD/MM/AAAA');
      return false;
    }
    return true;
  };

  const saveAlugacao = async () => {
    const newId = id.trim() !== '' ? id.trim() : Date.now().toString();
    const newAlugacao = { id: newId, cpf, nomeCliente, placaMoto, dataRetirada, dataDevolucao };

    const existingData = await AsyncStorage.getItem('alugacoes');
    const alugacoes = existingData ? JSON.parse(existingData) : [];
    alugacoes.push(newAlugacao);
    await AsyncStorage.setItem('alugacoes', JSON.stringify(alugacoes));
    return newId;
  };

  const updateAlugacao = async () => {
    const existingData = await AsyncStorage.getItem('alugacoes');
    const alugacoes = existingData ? JSON.parse(existingData) : [];
    const idx = alugacoes.findIndex((a: any) => String(a.id) === String(id));
    if (idx === -1) throw new Error('ID não encontrado.');

    alugacoes[idx] = { ...alugacoes[idx], cpf, nomeCliente, placaMoto, dataRetirada, dataDevolucao };
    await AsyncStorage.setItem('alugacoes', JSON.stringify(alugacoes));
  };

  const removeAlugacao = async () => {
    const existingData = await AsyncStorage.getItem('alugacoes');
    const alugacoes = existingData ? JSON.parse(existingData) : [];
    const filtered = alugacoes.filter((a: any) => String(a.id) !== String(id));
    if (filtered.length === alugacoes.length) throw new Error('ID não encontrado.');

    await AsyncStorage.setItem('alugacoes', JSON.stringify(filtered));
  };

  const handleRegister = async () => {
    clearMessages();
    if (!validateCommonFields()) return;
    try {
      const newId = await saveAlugacao();
      setId(''); setCpf(''); setNomeCliente(''); setPlacaMoto(''); setDataRetirada(''); setDataDevolucao('');
      setSuccessMessage(`Alugação cadastrada com sucesso! ID: ${newId}`);
    } catch {
      setErrorMessage('Erro ao salvar a alugação.');
    }
  };

  const handleUpdate = async () => {
    clearMessages();
    if (!id.trim()) return setErrorMessage('Informe o ID para atualizar.');
    if (!validateCommonFields()) return;
    try {
      await updateAlugacao();
      setSuccessMessage(`Alugação #${id} atualizada com sucesso!`);
    } catch (e: any) {
      setErrorMessage(e?.message || 'Erro ao atualizar a alugação.');
    }
  };

  const handleRemove = async () => {
    clearMessages();
    if (!id.trim()) return setErrorMessage('Informe o ID para remover.');
    try {
      await removeAlugacao();
      setSuccessMessage(`Alugação #${id} removida com sucesso!`);
      setId('');
    } catch (e: any) {
      setErrorMessage(e?.message || 'Erro ao remover a alugação.');
    }
  };

  return (
    <BackgroundPages>
      <NavBarAdm currentPage="Cadastro" />
      <ScrollView
        contentContainerStyle={[
          styles.card,
          theme.mode === 'dark'
            ? { backgroundColor: 'rgba(0,0,0,0.6)' }
            : { backgroundColor: theme.colors.surface },
        ]}
      >
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Cadastrar / Gerenciar Alugação
        </Text>

        <TextInput
          placeholder="ID (Somente para Atualizar/Deletar)"
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, { backgroundColor: theme.colors.surfaceAlt, color: theme.colors.text }]}
          value={id}
          onChangeText={(text) => setId(text.replace(/\D/g, '').slice(0, 15))}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="CPF do Cliente *"
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, { backgroundColor: theme.colors.surfaceAlt, color: theme.colors.text }]}
          value={cpf}
          onChangeText={(text) => setCpf(formatCPF(text))}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Nome do Cliente *"
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, { backgroundColor: theme.colors.surfaceAlt, color: theme.colors.text }]}
          value={nomeCliente}
          onChangeText={setNomeCliente}
        />

        <TextInput
          placeholder="Placa da Moto *"
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, { backgroundColor: theme.colors.surfaceAlt, color: theme.colors.text }]}
          value={placaMoto}
          onChangeText={(text) => setPlacaMoto(formatPlaca(text))}
        />

        <TextInput
          placeholder="Data de Retirada (DD/MM/AAAA) *"
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, { backgroundColor: theme.colors.surfaceAlt, color: theme.colors.text }]}
          value={dataRetirada}
          onChangeText={(text) => setDataRetirada(formatDate(text))}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Data de Devolução (DD/MM/AAAA) *"
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, { backgroundColor: theme.colors.surfaceAlt, color: theme.colors.text }]}
          value={dataDevolucao}
          onChangeText={(text) => setDataDevolucao(formatDate(text))}
          keyboardType="numeric"
        />

        <CustomButton title="Cadastrar Alugação" onPress={handleRegister} />

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <CustomButton title="Atualizar" onPress={handleUpdate} />
          </View>
          <View style={{ width: 12 }} />
          <View style={{ flex: 1 }}>
            <CustomButton title="Remover" onPress={handleRemove} />
          </View>
        </View>

        {!!successMessage && (
          <Text style={{ color: theme.colors.primary, textAlign: 'center', marginTop: 12, fontSize: 12, fontWeight: '700' }}>
            {successMessage}
          </Text>
        )}
        {!!errorMessage && (
          <Text style={{ color: theme.colors.danger, textAlign: 'center', marginTop: 12, fontSize: 12 }}>
            {errorMessage}
          </Text>
        )}

        <View style={styles.logoContainer}>
          <Image source={require('../../assets/LogoMottu.png')} style={styles.logo} resizeMode="contain" />
        </View>
      </ScrollView>
    </BackgroundPages>
  );
}

const styles = StyleSheet.create({
  card: { padding: 24, borderRadius: 12, gap: 16, marginTop: 14 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  input: { borderRadius: 8, padding: 12 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  logoContainer: { alignItems: 'center', marginTop: 24 },
  logo: { width: 120, height: 60 },
});
