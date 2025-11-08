import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Form from '../components/Form';
import { storageService } from '../services/storageService';
import { formatDate, formatArea } from '../utils/validation';
import { CROP_TYPES } from '../utils/constants';

// Componente de ícone (simples)
const ArrowLeftIcon = ({ color }) => (
  <Text style={[styles.backButtonText, { color }]}>←</Text>
);

export default function PlantationDetailsScreen({ theme }) {
  const navigation = useNavigation();
  const route = useRoute();
  const { plantationId } = route.params;

  const [plantation, setPlantation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadPlantationDetails();
  }, [plantationId]);

  const loadPlantationDetails = async () => {
    setLoading(true);
    const allPlantations = await storageService.loadPlantations();
    const foundPlantation = allPlantations.find(p => p.id === plantationId);
    setPlantation(foundPlantation);
    setLoading(false);
  };

  const handleUpdatePlantation = async (updatedData) => {
    try {
      const result = await storageService.updatePlantation(plantationId, updatedData);
      if (result.success) {
        await loadPlantationDetails(); 
        setIsEditing(false); 
        return result.plantation;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      throw error;
    }
  };

  const getCropLabel = (value) => {
    const crop = CROP_TYPES.find((c) => c.value === value);
    return crop ? crop.label : value;
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (!plantation) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>Plantação não encontrada.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
          <Text style={{ color: theme.primary }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeftIcon color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>
          {isEditing ? 'Editar Plantação' : 'Detalhes da Plantação'}
        </Text>
        {!isEditing && ( 
          <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
            <Text style={[styles.editButtonText, { color: theme.primary }]}>Editar</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        {isEditing ? (
          // MODO DE EDIÇÃO
          <Form
            onSubmit={handleUpdatePlantation}
            editingPlantation={plantation}
            onCancelEdit={() => setIsEditing(false)} 
            onGoBack={() => {
              setIsEditing(false); 
              loadPlantationDetails(); 
            }}
            theme={theme}
          />
        ) : (
          // MODO DE VISUALIZAÇÃO
          <View style={[styles.detailsCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.detailTitle, { color: theme.primary }]}>{plantation.name}</Text>
            
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Tipo de Cultura:</Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>{getCropLabel(plantation.cropType)}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Área:</Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>{formatArea(plantation.area)} ha</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Irrigação:</Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {plantation.hasIrrigation ? 'Ativa ✓' : 'Inativa ✗'}
              </Text>
            </View>

            {plantation.plantingDate && (
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Data de Plantio:</Text>
                <Text style={[styles.detailValue, { color: theme.text }]}>
                  {formatDate(plantation.plantingDate)}
                </Text>
              </View>
            )}

            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Data de Cadastro:</Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {formatDate(plantation.createdAt)}
              </Text>
            </View>

            {plantation.updatedAt && (
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Última Atualização:</Text>
                <Text style={[styles.detailValue, { color: theme.text }]}>
                  {formatDate(plantation.updatedAt)}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1, 
  },
  editButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10, 
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  detailsCard: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});