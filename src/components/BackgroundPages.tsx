import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

type Props = {
  children: React.ReactNode;
};

export default function BackgroundPages({ children }: Props) {
  const { theme } = useTheme();

  if (theme.mode === 'dark') {
    return (
      <ImageBackground
        source={require('../../assets/BackgroundPages.png')}
        style={styles.background}
        resizeMode="cover"
      >
        {children}
      </ImageBackground>
    );
  }

  return <View style={[styles.background, { backgroundColor: theme.colors.background }]}>{children}</View>;
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
});
