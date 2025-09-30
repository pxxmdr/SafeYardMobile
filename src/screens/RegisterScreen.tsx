import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import BackgroundPages from '../components/BackgroundPages';
import CustomButton from '../components/CustomButton';
import { colors } from '../styles/colors';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { registerUser } from '../services/auth';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

export default function RegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  
  const formatCPF = (value: string) =>
    value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .substring(0, 14);

  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleRegister() {
    setErro('');

   
    if (!nome.trim()) return setErro('Informe o nome.');
    if (!cpfRegex.test(cpf)) return setErro('CPF inválido. Formato: 123.456.789-01');
    if (!emailRegex.test(email)) return setErro('E-mail inválido.');
    if (!senha || senha.length < 6) return setErro('A senha deve ter pelo menos 6 caracteres.');
    if (senha !== confirmarSenha) return setErro('As senhas não conferem.');

    try {
      setLoading(true);
      await registerUser({ nome, cpf, email, senha });

      Alert.alert('Sucesso', 'Cadastro realizado! Faça login para continuar.');
      navigation.navigate('Login');
    } catch (e: any) {
      const msg = e?.message ?? 'Erro ao cadastrar.';
      setErro(msg);
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <BackgroundPages>
      <View style={styles.card}>
        <Text style={styles.title}>Cadastro</Text>

        <TextInput
          placeholder="Nome"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
        />

        <TextInput
          placeholder="CPF"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={cpf}
          onChangeText={(t) => setCpf(formatCPF(t))}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Senha (mín. 6)"
          placeholderTextColor="#ccc"
          style={styles.input}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TextInput
          placeholder="Confirmar senha"
          placeholderTextColor="#ccc"
          style={styles.input}
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        {!!erro && (
          <Text style={{ color: '#ff6b6b', textAlign: 'center', fontSize: 12 }}>{erro}</Text>
        )}

        <CustomButton
          title={loading ? 'Cadastrando...' : 'Cadastrar'}
          onPress={() => !loading && handleRegister()}
        />
      </View>
    </BackgroundPages>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 24,
    borderRadius: 12,
    gap: 16,
  },
  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 8,
    padding: 12,
    color: colors.white,
  },
});
