// pessoa.js  
const express = require('express');
const router = express.Router();
const pessoaController = require('../controllers/pessoaController');
const pessoaModel = require('../models/pessoaModel');
const pool = require('../db');

async function carregarOpcoespessoa() {
  const [tiposPessoa] = await pool.query('SELECT id_tipo_pessoa, descricao FROM tipo_pessoa');
  return { tiposPessoa };
}

router.get('/', pessoaController.listpessoas);
router.get('/filtro', (req, res) => res.render('filtro'));

// ✅ Rotas estáticas antes de /:id
router.get('/forms/pessoa', async (req, res) => {
  try {
    const opcoes = await carregarOpcoespessoa();
    res.render('forms/pessoa', {
      pessoa: { id_pessoa: '', nome: '', cpf: '', email: '', telefone: '', id_tipo_pessoa: '' },
      isEdit: false,
      ...opcoes
    });
  } catch (error) {
    console.error('Erro ao carregar formulario de pessoa:', error);
    res.render('error', { message: 'Erro ao carregar formulario de pessoa', returnLink: '/pessoa' });
  }
});

router.get('/cadastrar', async (req, res) => {
  try {
    const opcoes = await carregarOpcoespessoa();
    res.render('forms/pessoa', {
      pessoa: { id_pessoa: '', nome: '', cpf: '', email: '', telefone: '', id_tipo_pessoa: '' },
      isEdit: false,
      ...opcoes
    });
  } catch (error) {
    res.render('error', { message: 'Erro ao carregar formulario de pessoa', returnLink: '/pessoa' });
  }
});

router.post('/filtro', pessoaController.filterpessoas);
router.post('/cadastrar', pessoaController.addpessoas);

// ⚠️ Rotas com :id sempre por último
router.get('/:id/edit', pessoaController.showEditForm);
router.post('/:id/edit', pessoaController.editpessoas);
router.post('/:id/delete', pessoaController.deletepessoas);
router.get('/:id/confirm-delete', pessoaController.showConfirmDeleteForm);
router.get('/:id', pessoaController.showpessoas);

module.exports = router;