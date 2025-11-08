// Funções de validação para o formulário de plantações
export const validatePlantation = (plantation) => {
  const errors = {};

  if (!plantation.name || plantation.name.trim() === '') {
    errors.name = 'O nome da plantação é obrigatório';
  } else if (plantation.name.trim().length < 3) {
    errors.name = 'O nome deve ter pelo menos 3 caracteres';
  }

  if (!plantation.cropType || plantation.cropType === '') {
    errors.cropType = 'Selecione o tipo de cultura';
  }

  if (!plantation.area || plantation.area === '') {
    errors.area = 'A área é obrigatória';
  } else if (isNaN(plantation.area)) {
    errors.area = 'A área deve ser um número';
  } else if (parseFloat(plantation.area) <= 0) {
    errors.area = 'A área deve ser maior que zero';
  } else if (parseFloat(plantation.area) > 100000) {
    errors.area = 'A área não pode exceder 100.000 hectares';
  }


  if (plantation.plantingDate && !isValidDisplayDate(plantation.plantingDate)) {
    errors.plantingDate = 'Data inválida. Use o formato DD/MM/AAAA';
  }


  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};


const isValidDisplayDate = (dateString) => {

  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(dateString) || dateString.length !== 10) return false;

  const parts = dateString.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);


  if(year < 1900 || year > 2100 || month === 0 || month > 12) return false;

  const monthLength = [ 31, (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

  return day > 0 && day <= monthLength[month - 1];
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  if (dateString.includes('/')) {
    return dateString;
  }

  const date = new Date(dateString);
  if (date instanceof Date && !isNaN(date)) {

    const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    return utcDate.toLocaleDateString('pt-BR');
  }

  return '';
};

export const formatArea = (area) => {
  return parseFloat(area).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};