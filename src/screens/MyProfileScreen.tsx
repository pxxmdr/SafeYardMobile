import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import BackgroundPages from '../components/BackgroundPages';
import NavBarClient from '../components/NavBarClient';
import { useTheme } from '../theme/ThemeProvider';

export default function MyProfileScreen() {
  const { theme } = useTheme();

  const cpf = '123.456.789-00';
  const placaMoto = 'ABC-1234';
  const dataDevolucao = '25/05/2025';

  return (
    <BackgroundPages>
      <NavBarClient currentPage="Perfil" />

      <View style={styles.container}>
        <View
          style={[
            styles.avatarWrap,
            {
              borderColor:
                theme.mode === 'dark' ? 'transparent' : theme.colors.divider,
              backgroundColor:
                theme.mode === 'dark' ? 'rgba(255,255,255,0.06)' : '#f2f2f2',
            },
          ]}
        >
          <Image
            source={require('../../assets/NoPhotoProfile.png')}
            style={styles.avatar}
            resizeMode="contain"
          />
        </View>

        <Text style={[styles.title, { color: theme.colors.text }]}>
          Meu Perfil
        </Text>

        <Text style={[styles.info, { color: theme.colors.textMuted }]}>
          CPF: {cpf}
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Alugação:
        </Text>

        <Text style={[styles.info, { color: theme.colors.text }]}>
          Placa da Moto: {placaMoto}
        </Text>
        <Text style={[styles.info, { color: theme.colors.text }]}>
          Data de Devolução: {dataDevolucao}
        </Text>
      </View>
    </BackgroundPages>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 24,
    marginTop: 24,
  },
  avatarWrap: {
    width: 132,
    height: 132,
    borderRadius: 66,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginTop: 8,
  },
});
