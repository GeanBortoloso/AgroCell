import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { formatArea, formatDate } from '../utils/validation';
import { CROP_TYPES } from '../utils/constants';

export default function List({ plantations, onDelete, theme }) { 
  const navigation = useNavigation(); 

  const handleDelete = (e, id) => {
    e.stopPropagation();
    onDelete(id);
  };

  const getCropLabel = (value) => {
    const crop = CROP_TYPES.find((c) => c.value === value);
    return crop ? crop.label : value;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.card, 
        { 
            backgroundColor: theme.card, 
            borderColor: theme.border, 
            borderLeftColor: theme.primary 
        }
      ]}
      onPress={() => navigation.navigate('PlantationDetails', { plantationId: item.id })}
    >
      <View style={styles.cardInfo}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: theme.primary }]}>{item.name}</Text>
          <View style={[styles.badge, { backgroundColor: theme.background, borderColor: theme.border, borderWidth: 1 }]}>
            <Text style={[styles.badgeText, { color: theme.primary }]}>
              {getCropLabel(item.cropType)}
            </Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Área:</Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>{formatArea(item.area)} ha</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Irrigação:</Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>
              {item.hasIrrigation ? '✓ Ativa' : '✗ Inativa'}
            </Text>
          </View>
          {item.plantingDate && (
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Plantio:</Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>
                {formatDate(item.plantingDate)}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton, { backgroundColor: theme.error }]}
          onPress={(e) => handleDelete(e, item.id)} // CORREÇÃO: Passa o ID
        >
          <Text style={[styles.actionButtonText, { color: '#FFFFFF' }]}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyIcon, { color: theme.textSecondary }]}>...</Text>
      <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
        Nenhuma plantação cadastrada
      </Text>
      <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>
        Adicione sua primeira plantação usando o botão '+'
      </Text>
    </View>
  );

  return (
    <FlatList
      data={plantations}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={renderEmpty}
      contentContainerStyle={plantations.length === 0 ? styles.emptyList : { paddingBottom: 80 }} // Padding para o FAB
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderLeftWidth: 4, 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardInfo: {
    flex: 1, 
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10, 
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    marginBottom: 0, 
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardActions: {
    flexDirection: 'column', 
    justifyContent: 'center',
    gap: 10,
    paddingLeft: 15, 
  },
  actionButton: {
    padding: 10, 
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButton: {},
  actionButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 15,
    fontWeight: '200',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
});