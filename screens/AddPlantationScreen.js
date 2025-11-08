import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Form from '../components/Form';
import { storageService } from '../services/storageService';

const ArrowLeftIcon = ({ color }) => (
  <Text style={[styles.backButtonText, { color }]}>←</Text>
);

export default function AddPlantationScreen({ theme }) {
  const navigation = useNavigation();

  const handleAddPlantation = async (plantationData) => {
    try {
      const result = await storageService.addPlantation(plantationData);
      if (result.success) {
        return result.plantation;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeftIcon color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>Nova Plantação</Text>
      </View>
      <View style={styles.content}>
        <Form 
          onSubmit={handleAddPlantation} 
          theme={theme} 
          onGoBack={() => navigation.goBack()} // Passa a função para voltar
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  content: {
    padding: 20,
  },
});