import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import BackgroundPages from '../components/BackgroundPages';
import NavBarClient from '../components/NavBarClient';
import { useTheme } from '../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { getMyProfile, type ClienteProfile } from '../services/profile';

function maskCPF(cpf?: string) {
  if (!cpf) return '—';
  const s = cpf.replace(/\D/g, '').padStart(11, '0').slice(0, 11);
  return s.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function fmtDate(dateIso?: string | null) {
  if (!dateIso) return '—';
  try {
    const d = new Date(dateIso.length <= 10 ? `${dateIso}T00:00:00` : dateIso);
    if (Number.isNaN(d.getTime())) return '—';
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yy = d.getFullYear();
    return `${dd}/${mm}/${yy}`;
  } catch {
    return '—';
  }
}

export default function MyProfileScreen() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [data, setData] = useState<ClienteProfile | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setErr('');
        setLoading(true);
        const profile = await getMyProfile();
        if (mounted) setData(profile);
      } catch (e: any) {
        if (mounted) setErr(e?.message || t('client.profile.loadError', 'Falha ao carregar perfil.'));
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <BackgroundPages>
      <NavBarClient currentPage="Perfil" />

      <View style={styles.container}>
        <View
          style={[
            styles.avatarWrap,
            {
              borderColor: theme.mode === 'dark' ? 'transparent' : theme.colors.divider,
              backgroundColor: theme.mode === 'dark' ? theme.colors.surface : '#f2f2f2',
            },
          ]}
        >
          <Image
            source={require('../../assets/NoPhotoProfile.png')}
            style={styles.avatar}
            resizeMode="contain"
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <>
            {!!err && (
              <Text style={{ color: theme.colors.danger, marginBottom: 8, textAlign: 'center' }}>
                {err}
              </Text>
            )}

            <Text style={[styles.title, { color: theme.colors.text }]}>
              {t('client.myProfile', 'Meu Perfil')}
            </Text>

            <Text style={[styles.info, { color: theme.colors.text }]}>
              <Text style={{ fontWeight: '700' }}>
                {t('client.profile.name', 'Nome')}:{" "}
              </Text>
              {data?.nome ?? '—'}
            </Text>

            <Text style={[styles.info, { color: theme.colors.textMuted }]}>
              <Text style={{ fontWeight: '700', color: theme.colors.text }}>
                {t('forms.cpf', 'CPF')}:{" "}
              </Text>
              {maskCPF(data?.cpf)}
            </Text>

            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              {t('client.profile.rental', 'Alugação')}:
            </Text>

            <Text style={[styles.info, { color: theme.colors.text }]}>
              <Text style={{ fontWeight: '700' }}>
                {t('client.profile.plate', 'Placa da Moto')}:{" "}
              </Text>
              {data?.placa ?? '—'}
            </Text>

            <Text style={[styles.info, { color: theme.colors.text }]}>
              <Text style={{ fontWeight: '700' }}>
                {t('client.profile.returnDate', 'Data de Devolução')}:{" "}
              </Text>
              {fmtDate(data?.dataDevolucao)}
            </Text>
          </>
        )}
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
  avatar: { width: 120, height: 120, borderRadius: 60 },
  title: { fontSize: 28, fontWeight: 'bold', marginTop: 8, marginBottom: 20, textAlign: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 24, marginBottom: 10, textAlign: 'center' },
  info: { fontSize: 16, marginTop: 8, textAlign: 'center' },
});
