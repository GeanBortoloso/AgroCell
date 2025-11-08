import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import { LineChart, BarChart } from 'react-native-chart-kit';
import { PRODUCTION_ESTIMATE, CROP_TYPES } from '../utils/constants';

const screenWidth = Dimensions.get('window').width;
const isWideScreen = screenWidth > 768;
const chartWidth = isWideScreen ? (screenWidth / 2) - 50 : screenWidth - 40;

// Componente de ícone (simples)
const ArrowLeftIcon = ({ color }) => (
  <Text style={[styles.backButtonText, { color }]}>←</Text>
);

export default function StatsScreen({ plantations, theme }) {
  const navigation = useNavigation(); // Hook de navegação
  
  const getProductionData = () => {
    const productionByType = {};
    const areaByType = {};

    plantations.forEach((plantation) => {
      const type = plantation.cropType;
      if (!productionByType[type]) {
        productionByType[type] = 0;
        areaByType[type] = 0;
      }
      const estimate = PRODUCTION_ESTIMATE[type] || 1000;
      productionByType[type] += plantation.area * estimate;
      areaByType[type] += plantation.area;
    });

    return { productionByType, areaByType };
  };

  const { productionByType, areaByType } = getProductionData();

  const getCropLabel = (value) => {
    const crop = CROP_TYPES.find((c) => c.value === value);
    return crop ? crop.label : value;
  };

  const chartConfig = {
    backgroundColor: theme.card,
    backgroundGradientFrom: theme.card,
    backgroundGradientTo: theme.card,
    decimalPlaces: 0,
    color: (opacity = 1) => theme.primary, 
    labelColor: (opacity = 1) => theme.text,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: theme.primary,
    },
  };

  const totalArea = plantations.reduce((sum, p) => sum + p.area, 0);
  const totalProduction = Object.values(productionByType).reduce((sum, p) => sum + p, 0);

  const areaLabels = Object.keys(areaByType).map(getCropLabel);
  const areaValues = Object.values(areaByType);

  const productionLabels = Object.keys(productionByType).map(getCropLabel);
  const productionValues = Object.values(productionByType).map((v) => v / 1000);

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho de Navegação */}
      <View style={[styles.header, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeftIcon color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>
          Estatísticas e Produção
        </Text>
      </View>

      <View style={[styles.summaryContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: theme.primary }]}>
            {plantations.length}
          </Text>
          <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
            Plantações
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: theme.primary }]}>
            {totalArea.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}
          </Text>
          <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
            Hectares
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: theme.primary }]}>
            {(totalProduction / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}
          </Text>
          <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
            Toneladas
          </Text>
        </View>
      </View>

      {plantations.length > 0 && areaLabels.length > 0 && (
        <View style={styles.gridContainer}>
          <View style={[styles.chartContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.chartTitle, { color: theme.text }]}>
              Distribuição de Área por Cultura
            </Text>
            <BarChart
              data={{
                labels: areaLabels,
                datasets: [{ data: areaValues }],
              }}
              width={chartWidth} 
              height={220}
              yAxisSuffix=" ha"
              chartConfig={chartConfig}
              style={styles.chart}
              showValuesOnTopOfBars
              fromZero
            />
          </View>
          <View style={[styles.chartContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.chartTitle, { color: theme.text }]}>
              Produção Estimada (Toneladas)
            </Text>
            <LineChart
              data={{
                labels: productionLabels,
                datasets: [{ data: productionValues.length > 0 ? productionValues : [0] }],
              }}
              width={chartWidth} 
              height={220}
              yAxisSuffix="t"
              chartConfig={chartConfig}
              style={styles.chart}
              bezier
              fromZero
            />
          </View>
        </View>
      )}

      {plantations.length === 0 && (
        <View style={[styles.emptyContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.emptyIcon, { color: theme.textSecondary }]}>---</Text>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            Adicione plantações para visualizar as estatísticas
          </Text>
        </View>
      )}
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
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  summaryLabel: {
    fontSize: 14,
    marginTop: 5,
  },
  gridContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-around', 
    paddingHorizontal: 10, 
  },
  chartContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    minWidth: 300, 
    flex: 1, 
    alignItems: 'center', 
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  chart: {
    borderRadius: 10,
  },
  emptyContainer: {
    padding: 40,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  emptyIcon: {
    fontSize: 60,
    fontWeight: '200',
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});