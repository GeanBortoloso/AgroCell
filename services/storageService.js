// Serviço para gerenciar persistência de dados com AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '../utils/constants';

export const storageService = {
  // Salvar todas as plantações
  savePlantations: async (plantations) => {
    try {
      const jsonValue = JSON.stringify(plantations);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      return { success: true };
    } catch (error) {
      console.error('Erro ao salvar plantações:', error);
      return { success: false, error: error.message };
    }
  },

  // Carregar todas as plantações
  loadPlantations: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Erro ao carregar plantações:', error);
      return [];
    }
  },

  // Adicionar nova plantação
  addPlantation: async (plantation) => {
    try {
      const plantations = await storageService.loadPlantations();
      const newPlantation = {
        ...plantation,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      plantations.push(newPlantation);
      await storageService.savePlantations(plantations);
      return { success: true, plantation: newPlantation };
    } catch (error) {
      console.error('Erro ao adicionar plantação:', error);
      return { success: false, error: error.message };
    }
  },

  // Atualizar plantação existente
  updatePlantation: async (id, updatedData) => {
    try {
      const plantations = await storageService.loadPlantations();
      const index = plantations.findIndex((p) => p.id === id);
      
      if (index === -1) {
        return { success: false, error: 'Plantação não encontrada' };
      }

      plantations[index] = {
        ...plantations[index],
        ...updatedData,
        updatedAt: new Date().toISOString(),
      };

      await storageService.savePlantations(plantations);
      return { success: true, plantation: plantations[index] };
    } catch (error) {
      console.error('Erro ao atualizar plantação:', error);
      return { success: false, error: error.message };
    }
  },

  // Remover plantação
  deletePlantation: async (id) => {
    try {
      const plantations = await storageService.loadPlantations();
      const filteredPlantations = plantations.filter((p) => p.id !== id);
      await storageService.savePlantations(filteredPlantations);
      return { success: true };
    } catch (error) {
      console.error('Erro ao remover plantação:', error);
      return { success: false, error: error.message };
    }
  },

  // Limpar todos os dados
  clearAllData: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      return { success: true };
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
      return { success: false, error: error.message };
    }
  },
};
