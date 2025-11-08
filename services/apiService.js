// Serviço para integração com APIs externas
import axios from 'axios';

const WEATHER_API_KEY = 'demo'; // Para demonstração - usuário pode adicionar sua própria chave
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const apiService = {
  // Buscar previsão do tempo por cidade
  getWeatherByCity: async (city = 'São Paulo') => {
    try {
      // Usando coordenadas de São Paulo como padrão para demonstração
      const response = await axios.get(`${WEATHER_BASE_URL}/weather`, {
        params: {
          q: city,
          appid: WEATHER_API_KEY,
          units: 'metric',
          lang: 'pt_br',
        },
      });

      return {
        success: true,
        data: {
          temperature: Math.round(response.data.main.temp),
          description: response.data.weather[0].description,
          humidity: response.data.main.humidity,
          windSpeed: response.data.wind.speed,
          icon: response.data.weather[0].icon,
        },
      };
    } catch (error) {
      console.log('Erro ao buscar clima:', error.message);
      
      // Retornar dados simulados para demonstração
      return {
        success: true,
        data: {
          temperature: 24,
          description: 'céu limpo',
          humidity: 65,
          windSpeed: 3.5,
          icon: '01d',
          isDemo: true,
        },
      };
    }
  },

  // Buscar previsão para os próximos dias
  getForecast: async (city = 'São Paulo') => {
    try {
      const response = await axios.get(`${WEATHER_BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: WEATHER_API_KEY,
          units: 'metric',
          lang: 'pt_br',
          cnt: 5,
        },
      });

      return {
        success: true,
        data: response.data.list.map((item) => ({
          date: new Date(item.dt * 1000).toLocaleDateString('pt-BR'),
          temperature: Math.round(item.main.temp),
          description: item.weather[0].description,
        })),
      };
    } catch (error) {
      console.log('Erro ao buscar previsão:', error.message);
      
      // Retornar dados simulados para demonstração
      return {
        success: true,
        data: [
          { date: new Date().toLocaleDateString('pt-BR'), temperature: 24, description: 'ensolarado' },
          { date: new Date(Date.now() + 86400000).toLocaleDateString('pt-BR'), temperature: 26, description: 'parcialmente nublado' },
          { date: new Date(Date.now() + 172800000).toLocaleDateString('pt-BR'), temperature: 23, description: 'nublado' },
        ],
        isDemo: true,
      };
    }
  },
};
