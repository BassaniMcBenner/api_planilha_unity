const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = 6000;

// Configuração do Supabase
const supabaseUrl = process.env.SUPABASE_URL// Substitua pelo seu URL do Supabase
const supabaseKey = process.env.SUPABASE_KEY; // Substitua pela sua chave de API
const supabase = createClient(supabaseUrl, supabaseKey);

// Endpoint para buscar dados por 'codigo'
app.get('/api/dados/:codigo', async (req, res) => {
    const { codigo } = req.params;
    console.log(`Requisição recebida para o código: ${codigo}`); // Log adicional
  
    try {
      const { data, error } = await supabase
        .from('dicionario') 
        .select('reducao, descricao, anexo, reforma_tributaria, descricao_concatenada')
        .eq('codigo', codigo);
  
      if (error) {
        console.error('Erro no Supabase:', error); // Log adicional
        return res.status(400).json({ error: error.message });
      }
  
      if (data.length === 0) {
        console.log(`Nenhum dado encontrado para o código: ${codigo}`); // Log adicional
        return res.status(404).json({ message: 'Nenhum dado encontrado para o código fornecido.' });
      }
  
      console.log('Dados encontrados:', data); // Log adicional
      res.status(200).json(data);
    } catch (error) {
      console.error('Erro no servidor:', error); // Log adicional
      res.status(500).json({ error: 'Erro no servidor.' });
    }
  });
  

// Inicializar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
