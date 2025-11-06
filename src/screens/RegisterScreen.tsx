import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import BackgroundPages from '../components/BackgroundPages';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { registerUser } from '../services/auth';
import { useTheme } from '../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

export default function RegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const { t } = useTranslation();

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

    if (!nome.trim()) return setErro(t('errors.nameRequired'));
    if (!cpfRegex.test(cpf)) return setErro(t('errors.cpfInvalid'));
    if (!emailRegex.test(email)) return setErro(t('errors.emailInvalid'));
    if (!senha || senha.length < 6) return setErro(t('errors.passwordMin'));
    if (senha !== confirmarSenha) return setErro(t('errors.passwordsMismatch'));

    try {
      setLoading(true);
      await registerUser({ nome, cpf, email, senha });

      Alert.alert(t('feedback.successTitle'), t('feedback.registered'));
      navigation.navigate('Login');
    } catch (e: any) {
      const msg = e?.message ?? t('errors.registerFailed');
      setErro(msg);
      Alert.alert(t('feedback.error'), msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <BackgroundPages>
      <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{t('auth.titleRegister')}</Text>

        <TextInput
          placeholder={t('auth.name')}
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, { backgroundColor: theme.colors.surfaceAlt, color: theme.colors.text }]}
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
        />

        <TextInput
          placeholder="CPF"
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, { backgroundColor: theme.colors.surfaceAlt, color: theme.colors.text }]}
          value={cpf}
          onChangeText={(tval) => setCpf(formatCPF(tval))}
          keyboardType="numeric"
        />

        <TextInput
          placeholder={t('auth.email')}
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, { backgroundColor: theme.colors.surfaceAlt, color: theme.colors.text }]}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          placeholder={t('auth.passwordMinHint')}
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, { backgroundColor: theme.colors.surfaceAlt, color: theme.colors.text }]}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TextInput
          placeholder={t('auth.confirmPassword')}
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, { backgroundColor: theme.colors.surfaceAlt, color: theme.colors.text }]}
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        {!!erro && (
          <Text style={{ color: theme.colors.danger, textAlign: 'center', fontSize: 12 }}>
            {erro}
          </Text>
        )}

        <CustomButton
          title={loading ? t('actions.registering') : t('actions.register')}
          onPress={() => !loading && handleRegister()}
        />
      </View>
    </BackgroundPages>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderRadius: 12,
    gap: 16
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12
  },
  input: {
    borderRadius: 8,
    padding: 12
  }
});
