import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import BackgroundPages from '../components/BackgroundPages';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../theme/ThemeProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as atob } from 'base-64';
import { useTranslation } from 'react-i18next';

const API_URL = 'http://10.0.2.2:8080';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  AdminRegister: undefined;
  AdminManage: undefined;
  VisualizarPatios: undefined;
};

function base64UrlDecode(input: string) {
  let s = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = s.length % 4;
  if (pad) s += '='.repeat(4 - pad);
  const decoded = atob(s);
  try {
    return decodeURIComponent(
      decoded
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch {
    return decoded;
  }
}

function decodeJwtPayload<T = any>(token: string): T | null {
  try {
    const [, payloadB64] = token.split('.');
    if (!payloadB64) return null;
    const json = base64UrlDecode(payloadB64);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function extractRolesFromPayload(payload: any): string[] {
  if (!payload) return [];
  const roles: string[] = [];

  if (Array.isArray(payload.roles)) roles.push(...payload.roles);
  if (Array.isArray(payload.authorities)) roles.push(...payload.authorities);
  if (typeof payload.scope === 'string') roles.push(...payload.scope.split(' '));
  if (typeof payload.role === 'string') roles.push(payload.role);
  if (typeof payload.perfil === 'string') roles.push(payload.perfil);

  if (Array.isArray(payload.authorities)) {
    payload.authorities.forEach((a: any) => {
      if (a && typeof a === 'object' && a.authority) roles.push(a.authority);
    });
  }

  return roles.map(r => String(r).toUpperCase());
}

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [email, setEmail] = useState(__DEV__ ? 'admin@safeyard.com' : '');
  const [senha, setSenha] = useState(__DEV__ ? '123456' : '');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);

  const handleLogin = async () => {
    setErrorMessage('');

    if (!email || !senha) {
      setErrorMessage(t('errors.fillEmailPassword'));
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMessage(t('errors.invalidEmail'));
      return;
    }
    if (senha.length < 6) {
      setErrorMessage(t('errors.passwordMin'));
      return;
    }

    try {
      setLoading(true);

      const bodyCandidates = [
        { email, password: senha },           
        { email, senha },                      
        { username: email, password: senha },
      ];

      let token: string | null = null;
      let lastMsg = '';

      for (const body of bodyCandidates) {
        const res = await fetch(`${API_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          try {
            const j = await res.json();
            lastMsg = j?.message || res.statusText || `HTTP ${res.status}`;
          } catch {
            lastMsg = res.statusText || `HTTP ${res.status}`;
          }
          continue;
        }
        try {
          const data = await res.json();
          token = data?.token || data?.access_token || data?.jwt || null;
          if (!token) lastMsg = t('errors.tokenMissing');
          break;
        } catch {
          lastMsg = t('errors.loginParse');
        }
      }

      if (!token) throw new Error(lastMsg || t('errors.loginFailed'));

      await AsyncStorage.setItem('@safeyard:token', token);

      const payload = decodeJwtPayload(token);
      const roles = extractRolesFromPayload(payload);
      const isAdmin = roles.some(r => r.includes('ADMIN'));

      if (isAdmin) {
        navigation.reset({ index: 0, routes: [{ name: 'AdminManage' }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'VisualizarPatios' }] });
      }
    } catch (err: any) {
      const msgRaw = err?.message ?? '';
      const isNetwork = msgRaw.toLowerCase().includes('network');
      const msg = isNetwork ? t('errors.network') : (msgRaw || t('errors.loginFailed'));
      setErrorMessage(msg);
      Alert.alert(t('feedback.error'), msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundPages>
      <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{t('auth.titleLogin')}</Text>

        <TextInput
          placeholder={t('auth.emailPlaceholder')}
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, { backgroundColor: theme.colors.surfaceAlt, color: theme.colors.text }]}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          placeholder={t('auth.passwordPlaceholder')}
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, { backgroundColor: theme.colors.surfaceAlt, color: theme.colors.text }]}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <CustomButton
          title={loading ? t('actions.loggingIn') : t('actions.login')}
          onPress={() => {
            if (loading) return;
            void handleLogin();
          }}
        />

        {errorMessage ? (
          <Text style={[styles.error, { color: theme.colors.danger }]}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={[styles.registerText, { color: theme.colors.textMuted }]}>
            {t('auth.noAccount')}{' '}
            <Text style={[styles.registerLink, { color: theme.colors.primary }]}>{t('auth.signUp')}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </BackgroundPages>
  );
}

const styles = StyleSheet.create({
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
