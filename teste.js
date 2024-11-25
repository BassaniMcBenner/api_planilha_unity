const axios = require('axios');

// Função para testar a API com método GET
async function testarApi(codigo) {
  const apiUrl = `http://localhost:6000/api/dados/${codigo}`; // Endpoint da API

  try {
    // Fazendo a requisição GET para a API
    const response = await axios.get(apiUrl);
    
    if (response.status === 200) {
      console.log("Dados recebidos da API:");
      console.log(response.data); // Exibe os dados retornados pela API
    } else {
      console.error(`Erro: Código de resposta ${response.status}`);
    }
  } catch (error) {
    if (error.response) {
      // Erros retornados pela API
      console.error(`Erro na API: ${error.response.status} - ${error.response.data.message}`);
    } else {
      // Outros erros (como problemas de conexão)
      console.error(`Erro ao conectar à API: ${error.message}`);
    }
  }
}

// Código de teste
const codigoTeste = "0302.92.00"; // Substitua por outro código para testar
testarApi(codigoTeste);
