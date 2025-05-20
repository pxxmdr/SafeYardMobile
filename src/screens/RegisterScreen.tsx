import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import BackgroundPages from '../components/BackgroundPages';
import CustomButton from '../components/CustomButton';
import { colors } from '../styles/colors';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

export default function RegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  return (
    <BackgroundPages>
      <View style={styles.card}>
        <Text style={styles.title}>Cadastro</Text>

        <TextInput
          placeholder="CPF"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={cpf}
          onChangeText={setCpf}
        />

        <TextInput
          placeholder="E-mail"
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

        <TextInput
          placeholder="Confirmar senha"
          placeholderTextColor="#ccc"
          style={styles.input}
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        <CustomButton
          title="Cadastrar"
          onPress={() => {
            navigation.navigate('Login');
          }}
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
