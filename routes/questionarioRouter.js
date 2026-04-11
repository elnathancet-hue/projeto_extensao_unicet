// routes/questionario.js
const express = require('express');
const router = express.Router();
const questionarioController = require('../controllers/questionarioController');
const questionarioModel = require('../models/questionarioModel');
const pool = require('../db');

// Função para carregar opções caso venham do banco futuramente (seguindo seu padrão)
async function carregarOpcoesQuestionario() {
    // Caso precise buscar algo no banco para os selects do formulário, adicione aqui
    // Exemplo: const [tipos] = await pool.query('SELECT * FROM tipo_acao');
    return {}; 
}

// Rota para listar todos (Consulta Geral)
router.get('/', questionarioController.list);

// Rota para renderizar o formulário de cadastro (vazio)
router.get('/forms/questionario', async (req, res) => {
    try {
        const opcoes = await carregarOpcoesQuestionario();
        res.render('forms/questionario', { 
            questionario: {
                id: '', nome_acao: '', instituicao: '', data_realizacao: '',
                tipo_acao: '', local_realizacao: '', faixa_etaria: '',
                escolaridade: '', reside_local: '', aval_conteudo: '',
                expectativas: '', impacto_desc: '', aplicacao_conhecimento: '',
                gostou: '', melhorias: '', consentimento: ''
            }, 
            isEditMode: false, 
            ...opcoes 
        });
    } catch (error) {
        console.error('Erro ao carregar formulario de questionario:', error);
        res.render('error', { message: 'Erro ao carregar formulario', returnLink: '/questionario' });
    }
});

// Rota para a consulta (seguindo seu padrão /consultas/...)
router.get('/consultas/questionario', async (req, res) => {
    try {
        const dados = await questionarioModel.getAll();
        res.render('consultas/questionario', { dados });
    } catch (error) {
        console.error('Erro ao carregar consulta de questionario:', error);
        res.render('error', { message: 'Erro ao carregar consulta', returnLink: '/logo' });
    }
});

// Rota para processar o cadastro
router.post('/cadastrar', questionarioController.add);

// Rota para exibir um registro específico
router.get('/:id', questionarioController.showEdit); // Reaproveita lógica de busca por ID

// Rota para exibir página de edição
router.get('/:id/edit', questionarioController.showEdit); 

// Rota para lidar com a ação de edição
router.post('/:id/edit', questionarioController.edit);

// Rota para exclusão (seguindo seu padrão)
router.post('/:id/delete', async (req, res) => {
    try {
        await questionarioModel.deleteById(req.params.id);
        res.redirect('/questionario/consultas/questionario');
    } catch (error) {
        res.render('error', { message: 'Erro ao excluir', returnLink: '/questionario' });
    }
});

module.exports = router;