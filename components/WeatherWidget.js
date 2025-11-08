import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { apiService } from '../services/apiService';

export default function WeatherWidget({ theme }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const textColor = theme.dark ? theme.primary : theme.background;
  const secondaryTextColor = theme.dark ? theme.textSecondary : '#E0E0E0';

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    setLoading(true);
    const result = await apiService.getWeatherByCity('São Paulo');
    if (result.success) {
      setWeather(result.data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: 'transparent' }]}>
        <ActivityIndicator size="small" color={textColor} />
      </View>
    );
  }

  if (!weather) return null;

  return (
    <View style={[styles.container, { backgroundColor: 'transparent' }]}>
      <View style={styles.mainInfo}>
        <Text style={[styles.temperature, { color: textColor }]}>
          {weather.temperature}°C
        </Text>
        <Text style={[styles.description, { color: secondaryTextColor }]}>
          {weather.description}
          {weather.isDemo && (
            <Text style={[styles.demoTag, { color: secondaryTextColor }]}> (Demo)</Text>
          )}
        </Text>
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: secondaryTextColor }]}>Umidade:</Text>
          <Text style={[styles.detailText, { color: textColor }]}>
            {weather.humidity}%
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: secondaryTextColor }]}>Vento:</Text>
          <Text style={[styles.detailText, { color: textColor }]}>
            {weather.windSpeed} m/s
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 0,
  },
  mainInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  temperature: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    textTransform: 'capitalize',
    marginLeft: 8,
  },
  demoTag: {
    fontSize: 10,
    fontStyle: 'italic',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginLeft: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginHorizontal: 5,
  },
  detailLabel: {
    fontSize: 12, // Menor
    marginRight: 4,
  },
  detailText: {
    fontSize: 12, // Menor
    fontWeight: '500',
  },
});