import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

type Props = {
  title: string;
  onPress: () => void;
};

export default function CustomButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginTop: 20,
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});