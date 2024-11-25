const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = 6000;

// Configuração do Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Função para remover pontuação de um código
const normalizeCode = (code) => code.replace(/[^\w]/g, '');

// Endpoint para buscar dados por 'codigo'
app.get('/api/dados/:codigo', async (req, res) => {
    const { codigo } = req.params;

    // Remover pontuações do código recebido
    const normalizedCodigo = normalizeCode(codigo);
    console.log(`Requisição recebida para o código: ${codigo} (normalizado: ${normalizedCodigo})`);

    try {
      const { data, error } = await supabase
        .from('dicionario')
        .select('reducao, descricao, anexo, reforma_tributaria, descricao_concatenada')
        .ilike('codigo', `%${normalizedCodigo}%`); // Usando ilike para busca aproximada

      if (error) {
        console.error('Erro no Supabase:', error);
        return res.status(400).json({ error: error.message });
      }

      if (data.length === 0) {
        console.log(`Nenhum dado encontrado para o código: ${codigo}`);
        return res.status(404).json({ message: 'Nenhum dado encontrado para o código fornecido.' });
      }

      console.log('Dados encontrados:', data);
      res.status(200).json(data);
    } catch (error) {
      console.error('Erro no servidor:', error);
      res.status(500).json({ error: 'Erro no servidor.' });
    }
});

// Inicializar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
