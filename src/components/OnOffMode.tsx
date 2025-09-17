import React, { useEffect, useRef } from 'react';
import { Pressable, StyleSheet, View, Animated, ViewStyle } from 'react-native';
import Svg, { G, Circle, Path } from 'react-native-svg';
import { useTheme } from '../theme/ThemeProvider';

type Props = {
  width?: number;
  style?: ViewStyle;
  onToggle?: (mode: 'light' | 'dark') => void;
};

export default function OnOffMode({ width = 64, style, onToggle }: Props) {
  const { theme, toggleTheme } = useTheme();

  const ratio = width / 64;
  const height = 34 * ratio;
  const knobSize = 30 * ratio;
  const knobTranslate = 30 * ratio;

  const isDark = theme.mode === 'dark';

  const progress = useRef(new Animated.Value(isDark ? 1 : 0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: isDark ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [isDark, progress]);

  const spin = useRef(new Animated.Value(0)).current;
  const tilt = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(Animated.timing(spin, { toValue: 1, duration: 15000, useNativeDriver: true })).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(tilt, { toValue: 1, duration: 1250, useNativeDriver: true }),
        Animated.timing(tilt, { toValue: -1, duration: 2500, useNativeDriver: true }),
        Animated.timing(tilt, { toValue: 0, duration: 1250, useNativeDriver: true }),
      ])
    ).start();
  }, [spin, tilt]);

  const translateX = progress.interpolate({ inputRange: [0, 1], outputRange: [0, knobTranslate] });
  const spinDeg = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const tiltDeg = tilt.interpolate({ inputRange: [-1, 1], outputRange: ['-10deg', '10deg'] });

  const lightBg = '#73C0FC';
  const darkBg = '#183153';
  const bgColor = isDark ? darkBg : lightBg;

  const onPress = () => {
    toggleTheme();
    onToggle?.(isDark ? 'light' : 'dark');
  };

  return (
    <Pressable onPress={onPress} style={[style, { width, height }]} hitSlop={10}>
      <View style={[styles.slider, { width, height, borderRadius: 30 * ratio, backgroundColor: bgColor }]}>
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 6 * ratio,
            left: 36 * ratio,
            width: 24 * ratio,
            height: 24 * ratio,
            transform: [{ rotate: spinDeg }],
          }}
        >
          <Svg viewBox="0 0 24 24" width="100%" height="100%">
            <G fill="#ffd43b">
              <Circle r="5" cy="12" cx="12" />
              <Path d="M21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0H3a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1-.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1-.75.29zM5.64 19.36a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1-.7.24zM12 5a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v1a1 1 0 0 1-1 1zm0 17a1 1 0 0 1-1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1-1 1zm-5.66-14.66a1 1 0 0 1-.7-.29l-.71-.71A1 1 0 0 1 6.34 4.9l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1-.71.29zm12.02 12.02a1 1 0 0 1-.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1-.71.24z" />
            </G>
          </Svg>
        </Animated.View>

        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 5 * ratio,
            left: 5 * ratio,
            width: 24 * ratio,
            height: 24 * ratio,
            transform: [{ rotate: tiltDeg }],
          }}
        >
          <Svg viewBox="0 0 384 512" width="100%" height="100%">
            <Path
              d="M223.5 32C100 32 0 132.3 0 256s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6C238.6 392 160 313.2 160 216c0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
              fill={lightBg}
            />
          </Svg>
        </Animated.View>

        <Animated.View
          style={[
            styles.knob,
            { width: knobSize, height: knobSize, borderRadius: 20 * ratio, transform: [{ translateX }] },
          ]}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  slider: { overflow: 'hidden' },
  knob: { position: 'absolute', left: 2, bottom: 2, backgroundColor: '#e8e8e8', zIndex: 2 },
});
