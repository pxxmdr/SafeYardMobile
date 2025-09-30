import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image } from 'react-native';
import BackgroundPages from '../components/BackgroundPages';
import CustomButton from '../components/CustomButton';
import NavBarAdm from '../components/NavBarAdm';
import { useTheme } from '../theme/ThemeProvider';
import {
  createAlugacaoFromForm,
  updateAlugacaoFromForm,
  deleteAlugacaoForm, 
} from '../services/alugacao';
import { useNavigation } from '@react-navigation/native';

export default function AdminRegisterScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  const [id, setId] = useState('');
  const [cpf, setCpf] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [placaMoto, setPlacaMoto] = useState('');
  const [dataRetirada, setDataRetirada] = useState('');
  const [dataDevolucao, setDataDevolucao] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const clearMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  
  const formatCPF = (value: string) =>
    value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .substring(0, 14);

  
  const formatPlaca = (value: string) =>
    value.toUpperCase().replace(/[^A-Z0-9-]/g, '').substring(0, 8);

  const formatDate = (value: string) =>
    value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .substring(0, 10);

  
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  const placaRegex = /^(?:[A-Z]{3}-\d{4}|[A-Z]{3}[A-Z0-9]{4})$/;
  const dataRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  const validateCamposObrigatorios = () => {
    if (!cpf || !nomeCliente || !placaMoto || !dataRetirada || !dataDevolucao) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }
    if (!cpfRegex.test(cpf)) {
      setErrorMessage('CPF inválido. Formato correto: 123.456.789-01');
      return false;
    }
    if (!placaRegex.test(placaMoto.toUpperCase())) {
      setErrorMessage('Placa inválida. Exemplos válidos: ABC-1234 ou ABC1D23');
      return false;
    }
    if (!dataRegex.test(dataRetirada) || !dataRegex.test(dataDevolucao)) {
      setErrorMessage('Data inválida. Formato correto: DD/MM/AAAA');
      return false;
    }
    return true;
  };

  
  const placaNormalizada = () => placaMoto.replace(/-/g, '').toUpperCase();

  
  const handleRegister = async () => {
    clearMessages();
    if (!validateCamposObrigatorios()) return;

    try {
      setLoading(true);

      const created = await createAlugacaoFromForm({
        cpf,
        nome: nomeCliente,
        placa: placaNormalizada(),
        dataRetirada,
        dataDevolucao,
      });

      setId('');
      setCpf('');
      setNomeCliente('');
      setPlacaMoto('');
      setDataRetirada('');
      setDataDevolucao('');

      setSuccessMessage(`Alugação cadastrada! ID: ${String(created?.id ?? '—')}`);

      setTimeout(() => {
        navigation.reset({ index: 0, routes: [{ name: 'AdminManage' }] });
      }, 600);
    } catch (e: any) {
      setErrorMessage(e?.message || 'Erro ao salvar a alugação.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    clearMessages();
    if (!id) return setErrorMessage('Informe o ID para atualizar.');
    if (!validateCamposObrigatorios()) return;

    try {
      setLoading(true);

      const updated = await updateAlugacaoFromForm(id, {
        cpf,
        nome: nomeCliente,
        placa: placaNormalizada(),
        dataRetirada,
        dataDevolucao,
      });

      setSuccessMessage(`Alugação #${updated.id ?? id} atualizada!`);

      setTimeout(() => {
        navigation.reset({ index: 0, routes: [{ name: 'AdminManage' }] });
      }, 600);
    } catch (e: any) {
      setErrorMessage(e?.message || 'Erro ao atualizar a alugação.');
    } finally {
      setLoading(false);
    }
  };

 
  const handleDelete = async () => {
    clearMessages();
    if (!id) return setErrorMessage('Informe o ID para remover.');

    try {
      setLoading(true);
      await deleteAlugacaoForm(id);
      setSuccessMessage(`Alugação #${id} removida.`);

      setId('');
      setCpf('');
      setNomeCliente('');
      setPlacaMoto('');
      setDataRetirada('');
      setDataDevolucao('');

      setTimeout(() => {
        navigation.reset({ index: 0, routes: [{ name: 'AdminManage' }] });
      }, 600);
    } catch (e: any) {
      setErrorMessage(e?.message || 'Erro ao remover a alugação.');
    } finally {
      setLoading(false);
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
          placeholder="Placa da Moto * (ex.: ABC-1234 ou ABC1D23)"
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, { backgroundColor: theme.colors.surfaceAlt, color: theme.colors.text }]}
          value={placaMoto}
          onChangeText={(text) => setPlacaMoto(formatPlaca(text))}
          autoCapitalize="characters"
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

        <CustomButton
          title={loading ? 'Salvando...' : 'Cadastrar Alugação'}
          onPress={() => !loading && handleRegister()}
        />

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <CustomButton
              title={loading ? 'Atualizando...' : 'Atualizar'}
              onPress={() => !loading && handleUpdate()}
            />
          </View>
          <View style={{ width: 12 }} />
          <View style={{ flex: 1 }}>
            <CustomButton
              title={loading ? 'Removendo...' : 'Remover'}
              onPress={() => !loading && handleDelete()}
            />
          </View>
        </View>

        {!!successMessage && (
          <Text
            style={{
              color: theme.colors.primary,
              textAlign: 'center',
              marginTop: 12,
              fontSize: 12,
              fontWeight: '700',
            }}
          >
            {successMessage}
          </Text>
        )}
        {!!errorMessage && (
          <Text
            style={{
              color: theme.colors.danger,
              textAlign: 'center',
              marginTop: 12,
              fontSize: 12,
            }}
          >
            {errorMessage}
          </Text>
        )}

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
  card: { padding: 24, borderRadius: 12, gap: 16, marginTop: 14 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  input: { borderRadius: 8, padding: 12 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  logoContainer: { alignItems: 'center', marginTop: 24 },
  logo: { width: 120, height: 60 },
});
