import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import BackgroundPages from '../components/BackgroundPages';
import CustomButton from '../components/CustomButton';
import { colors } from '../styles/colors';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  AdminRegister: undefined;
  AdminManage: undefined;
  VisualizarPatios: undefined;
};

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (email === 'admin' && senha === '123') {
      navigation.navigate('AdminRegister');
    } else if (email === 'cliente' && senha === '123') {
      navigation.navigate('VisualizarPatios');
    } else {
      setErrorMessage('Usuário ou senha inválidos!');
    }
  };

  return (
    <BackgroundPages>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Usuário"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#ccc"
          style={styles.input}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <CustomButton title="Entrar" onPress={handleLogin} />

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>
            Não tem conta? <Text style={styles.registerLink}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
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
  registerText: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 16,
    textAlign: 'center',
  },
  registerLink: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 12,
    fontSize: 12,
  },
});