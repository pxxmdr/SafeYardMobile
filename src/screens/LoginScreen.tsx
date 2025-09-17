import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import BackgroundPages from '../components/BackgroundPages';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../theme/ThemeProvider';
import OnOffMode from '../components/OnOffMode';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  AdminRegister: undefined;
  AdminManage: undefined;
  VisualizarPatios: undefined;
};

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme, toggleTheme } = useTheme();

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
      <View style={styles.fabContainer} pointerEvents="box-none">
        <TouchableOpacity
          onPress={toggleTheme}
          activeOpacity={0.85}
          style={[
            styles.fab,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.primary,
            },
          ]}
        >
          <Text style={[styles.fabText, { color: theme.colors.primary }]}>
            {theme.mode === 'dark' ? 'Claro' : 'Escuro'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Login</Text>

        <TextInput
          placeholder="Usuário"
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, { backgroundColor: theme.colors.surfaceAlt, color: theme.colors.text }]}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, { backgroundColor: theme.colors.surfaceAlt, color: theme.colors.text }]}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <CustomButton title="Entrar" onPress={handleLogin} />

        {errorMessage ? (
          <Text style={[styles.error, { color: theme.colors.danger }]}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={[styles.registerText, { color: theme.colors.textMuted }]}>
            Não tem conta?{' '}
            <Text style={[styles.registerLink, { color: theme.colors.primary }]}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </BackgroundPages>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
  },
  fab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
  },
  fabText: {
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },

  card: {
    padding: 24,
    borderRadius: 12,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderRadius: 8,
    padding: 12,
  },
  registerText: {
    fontSize: 14,
    marginTop: 16,
    textAlign: 'center',
  },
  registerLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  error: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 12,
  },
});
