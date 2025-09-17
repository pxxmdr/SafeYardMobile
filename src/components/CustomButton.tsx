import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';   
  disabled?: boolean;                
  style?: ViewStyle;                 
};

export default function CustomButton({ title, onPress, variant = 'primary', disabled = false, style }: Props) {
  const { theme } = useTheme();
  const isPrimary = variant === 'primary';

  const backgroundColor = isPrimary ? theme.colors.primary : 'transparent';
  const borderColor = isPrimary ? theme.colors.primary : theme.colors.text;
  const textColor = isPrimary ? '#000' : theme.colors.text;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor, borderColor, opacity: disabled ? 0.5 : 1 },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
