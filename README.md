# 🌱 AgroCell - Sistema de Gestão Agrícola

Sistema completo de gestão agrícola desenvolvido em **React Native com Expo Web** para cadastro de plantações, monitoramento de colheitas e controle de insumos, agora com navegação por telas e um layout inspirado em aplicativos modernos.

## 📋 Descrição do Projeto

O AgroCell é um aplicativo acadêmico que simula um sistema real de gestão agrícola, permitindo aos usuários:
- Cadastrar e gerenciar plantações através de um fluxo de navegação dedicado.
- Monitorar dados climáticos em tempo real através de um widget no cabeçalho.
- Visualizar estatísticas e produção estimada em uma tela separada.
- Alternar entre temas claro (minimalista) e escuro.

## ✨ Funcionalidades Implementadas

### Requisitos Obrigatórios ✅

1.  **Captura de Dados (em Tela Dedicada)**
    -   `TextInput` para nome da plantação e área.
    -   `Picker` para seleção do tipo de cultura.
    -   `Switch` para sistema de irrigação.
    -   Campo de data com máscara `DD/MM/AAAA`.
2.  **Validação Completa**
    -   Validação de campos obrigatórios e formatos (incluindo datas `DD/MM/AAAA`).
    -   Feedback visual de erros.
3.  **Exibição Dinâmica (Tela Principal)**
    -   `FlatList` para listar plantações.
    -   Cartões clicáveis que levam à tela de "Detalhes da Plantação".
    -   Botão de exclusão rápido no card.
    -   Estado vazio com instrução para usar o botão `+`.
4.  **Persistência de Dados**
    -   `AsyncStorage` para armazenamento local.
    -   CRUD completo (Create, Read, Update, Delete) distribuído entre as telas.
    -   Serviço organizado em `storageService.js` com conversão de datas.
5.  **Feedback Visual**
    -   `ActivityIndicator` durante carregamento.
    -   `Alert` para confirmações e mensagens.
6.  **Integração com API**
    -   OpenWeatherMap API para clima, exibido no cabeçalho principal.
    -   Modo demonstração com dados simulados.
7.  **Código Organizado**
    -   Componentes separados e reutilizáveis (Form, List, WeatherWidget).
    -   Serviços para lógica de negócio (storage, api).
    -   Utilitários para validação e constantes.
    -   Navegação gerenciada por `react-navigation`.

### Funcionalidades Extras ⭐

1.  **Gráficos de Produção (Tela Dedicada)**
    -   `react-native-chart-kit` para visualização.
    -   Gráfico de barras e linhas em tela separada.
2.  **Tema Claro/Escuro**
    -   Alternância entre temas via botão no cabeçalho.
    -   Cores minimalistas (Preto, Branco, Cinza) aplicadas a todos os componentes.
3.  **Navegação por Telas (Stack Navigation)**
    -   Fluxo de usuário intuitivo: Tela Principal (Lista) -> Tela de Detalhes -> Tela de Edição.
    -   Botão Flutuante (FAB) para navegar à tela "Adicionar Plantação".
    
## 📦 Dependências Principais

-   **expo**: Framework React Native
-   **react-native**: Framework mobile
-   **@react-navigation/native**: Base da navegação
-   **@react-navigation/native-stack**: Navegação por pilha (telas)
-   **@react-native-async-storage/async-storage**: Persistência local
-   **@react-native-picker/picker**: Seletor de opções
-   **react-native-chart-kit**: Gráficos
-   **axios**: Cliente HTTP

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 20 ou superior)
- npm ou yarn

### Passo a Passo

1.  **Navegue até a pasta do projeto**
    ```bash
    cd agro-cell
    ```

2.  **Instale as dependências** (se necessário)
    ```bash
    npm install
    ```

3.  **Execute o projeto no navegador**
    ```bash
    npx expo start --web
    ```

4.  **Acesse o aplicativo**
    -   O navegador abrirá automaticamente
    -   Ou acesse `http://localhost:8081`

## 💾 Uso do AsyncStorage

O aplicativo utiliza `AsyncStorage` para persistência local de dados:

-   **Chave de armazenamento**: `@agro_cell:plantations`
-   **Formato**: JSON array de objetos
-   **Formato da Data:** As datas são salvas no formato `AAAA-MM-DD` (ISO) para consistência, e convertidas para `DD/MM/AAAA` na exibição.

### Estrutura dos Dados Salvos

```javascript
{
  id: "1699123456789",           // Timestamp único
  name: "Fazenda Santa Maria",   // Nome da plantação
  cropType: "milho",             // Tipo de cultura
  area: 150.5,                   // Área em hectares
  hasIrrigation: true,           // Sistema de irrigação
  plantingDate: "2024-11-07",    // Data de plantio (salva em AAAA-MM-DD)
  createdAt: "2024-11-07T...",   // Data de criação
  updatedAt: "2024-11-07T..."    // Data de atualização
}