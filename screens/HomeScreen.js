import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import List from '../components/List';
import { storageService } from '../services/storageService';

const FloatingActionButton = ({ theme, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.fab, 
        { 
          backgroundColor: theme.primary,
          borderColor: theme.border
        }
      ]}
      onPress={onPress}
    >
      <Text style={[styles.fabText, { color: theme.background }]}>+</Text>
    </TouchableOpacity>
  );
};

// Componente de ícone (simples)
const StatsIcon = ({ color }) => (
  <Text style={{ fontSize: 18, color: color }}>📊</Text>
);

export default function HomeScreen({ theme, onPlantationsUpdate }) {
  const [plantations, setPlantations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigation = useNavigation();
  const isFocused = useIsFocused(); 

  useEffect(() => {
    // Recarrega os dados sempre que a tela principal recebe foco
    if (isFocused) {
      loadPlantations();
    }
  }, [isFocused]);

  const loadPlantations = async () => {
    setLoading(true);
    const data = await storageService.loadPlantations();
    setPlantations(data);
    if (onPlantationsUpdate) {
      onPlantationsUpdate(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Deseja realmente excluir esta plantação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const result = await storageService.deletePlantation(id);
            if (result.success) {
              await loadPlantations();
              Alert.alert('Sucesso', 'Plantação removida com sucesso!');
            } else {
              Alert.alert('Erro', result.error);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.headerControls}>
        <Text style={[styles.listTitle, { color: theme.primary }]}>
          Minhas Plantações
        </Text>
        <TouchableOpacity 
          style={[styles.statsButton, { borderColor: theme.border }]} 
          onPress={() => navigation.navigate('Stats')}
        >
          <StatsIcon color={theme.primary} />
          <Text style={[styles.statsButtonText, { color: theme.text }]}>Estatísticas</Text>
        </TouchableOpacity>
      </View>

      <List
        plantations={plantations}
        onDelete={handleDelete} // Passa a função com o Alert
        theme={theme}
      />
      
      <FloatingActionButton 
        theme={theme} 
        onPress={() => navigation.navigate('AddPlantation')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0, 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  statsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    borderRadius: 28,
    borderWidth: 1,
  },
  fabText: {
    fontSize: 30,
    fontWeight: '300',
    lineHeight: 32,
  },
});