import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CROP_TYPES } from '../utils/constants';
import { validatePlantation } from '../utils/validation';

export default function Form({ onSubmit, editingPlantation, onCancelEdit, theme, onGoBack }) {
  const [formData, setFormData] = useState({
    name: '',
    cropType: '',
    area: '',
    hasIrrigation: false,
    plantingDate: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingPlantation) {
      setFormData({
        name: editingPlantation.name,
        cropType: editingPlantation.cropType,
        area: editingPlantation.area.toString(),
        hasIrrigation: editingPlantation.hasIrrigation,
        plantingDate: editingPlantation.plantingDate || '',
      });
    } else {
      setFormData({
        name: '',
        cropType: '',
        area: '',
        hasIrrigation: false,
        plantingDate: '',
      });
    }
  }, [editingPlantation]);

  const handleSubmit = async () => {
    const validation = validatePlantation(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      Alert.alert('Erro de Validação', 'Por favor, corrija os erros no formulário');
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await onSubmit({
        ...formData,
        area: parseFloat(formData.area),
      });

      Alert.alert('Sucesso', editingPlantation ? 'Plantação atualizada!' : 'Plantação cadastrada!');
      
      if (onGoBack) {
        onGoBack();
      }

    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao salvar a plantação');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      cropType: '',
      area: '',
      hasIrrigation: false,
      plantingDate: '',
    });
    setErrors({});

    if (onCancelEdit) {
      onCancelEdit();
    } else if (onGoBack) {
      onGoBack();
    }
  };
  const handleDateChange = (text) => {
    let v = text.replace(/\D/g, '');
    if (v.length > 8) v = v.substring(0, 8);
    
    if (v.length > 4) {
      v = v.substring(0, 4) + '/' + v.substring(4);
    }
    if (v.length > 2) {
      v = v.substring(0, 2) + '/' + v.substring(2);
    }
    
    setFormData({ ...formData, plantingDate: v });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.border }]}>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.text }]}>Nome da Fazenda *</Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: errors.name ? theme.error : theme.border, color: theme.text },
          ]}
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
        {errors.name && <Text style={[styles.errorText, { color: theme.error }]}>{errors.name}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.text }]}>Tipo de Plantio *</Text>
        <View style={[styles.pickerContainer, { borderColor: errors.cropType ? theme.error : theme.border }]}>
          <Picker
            selectedValue={formData.cropType}
            onValueChange={(value) => setFormData({ ...formData, cropType: value })}
            style={[styles.picker, { color: theme.text }]}
          >
            {CROP_TYPES.map((crop) => (
              <Picker.Item key={crop.value} label={crop.label} value={crop.value} />
            ))}
          </Picker>
        </View>
        {errors.cropType && <Text style={[styles.errorText, { color: theme.error }]}>{errors.cropType}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.text }]}>Área (hectares) *</Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: errors.area ? theme.error : theme.border, color: theme.text },
          ]}
          placeholder="Ex: 150.5"
          placeholderTextColor={theme.textSecondary}
          value={formData.area}
          onChangeText={(text) => setFormData({ ...formData, area: text })}
          keyboardType="decimal-pad"
        />
        {errors.area && <Text style={[styles.errorText, { color: theme.error }]}>{errors.area}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.text }]}>Data do Plantio</Text>
        <TextInput
          style={[
            styles.input, 
            { borderColor: errors.plantingDate ? theme.error : theme.border, color: theme.text }
          ]}
          placeholder="DD/MM/AAAA"
          placeholderTextColor={theme.textSecondary}
          value={formData.plantingDate}
          onChangeText={handleDateChange} // Usa a função de máscara corrigida
          maxLength={10} // DD/MM/AAAA
          keyboardType="numeric" 
        />
        {errors.plantingDate && <Text style={[styles.errorText, { color: theme.error }]}>{errors.plantingDate}</Text>}
      </View>

      <View style={styles.switchContainer}>
        <Text style={[styles.label, { color: theme.text }]}>Sistema de Irrigação</Text>
        <Switch
          value={formData.hasIrrigation}
          onValueChange={(value) => setFormData({ ...formData, hasIrrigation: value })}
          trackColor={{ false: theme.border, true: theme.secondary }}
          thumbColor={formData.hasIrrigation ? theme.primary : '#f4f3f4'}
        />
      </View>

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.primary} />
        ) : (
          <>
            <TouchableOpacity
              style={[styles.button, styles.submitButton, { backgroundColor: theme.primary }]}
              onPress={handleSubmit}
            >
              <Text style={[styles.buttonText, { color: theme.background }]}>
                {editingPlantation ? 'Atualizar' : 'Cadastrar'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.cancelButton, { borderColor: theme.error }]}
              onPress={handleCancel}
            >
              <Text style={[styles.cancelButtonText, { color: theme.error }]}>Cancelar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 50, 
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 12,
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButton: {},
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});