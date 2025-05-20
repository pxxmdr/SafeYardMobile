import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

type Props = {
  children: React.ReactNode;
};

export default function BackgroundRegister({ children }: Props) {
  return (
    <ImageBackground
      source={require('../../assets/BackgroundRegister.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
});
