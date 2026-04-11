// tipo_pessoa.js
const express = require('express');
const router = express.Router();
const tipo_pessoaController = require('../controllers/tipo_pessoaController');
const tipo_pessoaModel = require('../models/tipo_pessoaModel');

router.get('/', tipo_pessoaController.listtipo_pessoa);
router.get('/filtro', (req, res) => res.render('filtro'));
router.get('/cadastrar', (req, res) => {res.render('forms/tipo_pessoa', { isEdit: false });});
router.get('/consultas/tipo_pessoa', async (req, res) => {
  try {
    const dados = await tipo_pessoaModel.getAlltipo_pessoa();
    res.render('consultas/tipo_pessoa', { dados });
  } catch (error) {
    res.render('error', { message: 'Erro ao carregar consulta', rturnLink: '/welcome' });
  }
});

router.post('/filtro', tipo_pessoaController.filtertipo_pessoa);
router.post('/cadastrar', tipo_pessoaController.addtipo_pessoa);

// ✅ Rotas com :id por último
router.get('/:id/edit', tipo_pessoaController.showEditFormtipo_pessoa); // descomentado
router.post('/:id/edit', tipo_pessoaController.edittipo_pessoa);
router.post('/:id/delete', tipo_pessoaController.deletetipo_pessoa);
router.get('/:id', tipo_pessoaController.showtipo_pessoa);

module.exports = router;