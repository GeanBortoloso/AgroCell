// Constantes do aplicativo de gestão agrícola

export const CROP_TYPES = [
  { label: 'Selecione o plantio', value: '' },
  { label: 'Milho', value: 'milho' },
  { label: 'Soja', value: 'soja' },
  { label: 'Trigo', value: 'trigo' },
  { label: 'Café', value: 'cafe' },
  { label: 'Cana-de-açúcar', value: 'cana' },
  { label: 'Arroz', value: 'arroz' },
  { label: 'Feijão', value: 'feijao' },
  { label: 'Algodão', value: 'algodao' },
  { label: 'Mandioca', value: 'mandioca' },
  { label: 'Tomate', value: 'tomate' },
];

export const STORAGE_KEY = '@agro_cell:plantations'; // Alterado

export const COLORS = {
  light: {
    primary: '#000000',       // Preto (cor principal)
    secondary: '#333333',     // Cinza escuro (botões secundários)
    background: '#FFFFFF',   // Fundo branco
    card: '#FFFFFF',           // Card branco
    text: '#000000',           // Texto preto
    textSecondary: '#666666', // Texto cinza
    border: '#E0E0E0',       // Borda cinza clara
    error: '#D32F2F',          // Vermelho mantido para erros
    success: '#388E3C',        // Verde mantido para sucesso
    warning: '#F57C00',        // Laranja mantido para avisos
  },
  dark: {
    primary: '#FFFFFF',       // Branco (cor principal)
    secondary: '#CCCCCC',     // Cinza claro (botões secundários)
    background: '#000000',   // Fundo preto
    card: '#1A1A1A',           // Card cinza bem escuro
    text: '#FFFFFF',           // Texto branco
    textSecondary: '#B0B0B0', // Texto cinza claro
    border: '#404040',       // Borda cinza escura
    error: '#EF5350',          // Vermelho mantido para erros
    success: '#66BB6A',        // Verde mantido para sucesso
    warning: '#FFB74D',        // Laranja mantido para avisos
  },
};

export const PRODUCTION_ESTIMATE = {
  milho: 5000,
  soja: 3000,
  trigo: 2500,
  cafe: 2000,
  cana: 7000,
  arroz: 4000,
  feijao: 1500,
  algodao: 2200,
  mandioca: 3500,
  tomate: 6000,
};