// Componente para alternar entre tema claro e escuro
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ThemeToggle({ isDark, onToggle, theme }) {
  const icon = isDark ? '☾' : '☼';

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          borderColor: theme.background,
        },
      ]}
      onPress={onToggle}
    >
      <Text style={[styles.icon, { color: theme.primary }]}>{icon}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 25,
    borderWidth: 1,
    width: 44,
    height: 44,
  },
  icon: {
    fontSize: 20,
  },
});