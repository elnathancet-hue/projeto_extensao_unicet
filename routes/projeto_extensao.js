const express = require('express');
const router = express.Router();
const projeto_extensaoController = require('../controllers/projeto_extensaoController');
const questionarioController = require('../controllers/questionarioController');

// Listagem
router.get('/', projeto_extensaoController.listprojeto_extensaos);

// Filtro
router.get('/filtro', (req, res) => {
  res.render('filtro');
});

router.post('/filtro', projeto_extensaoController.filterprojeto_extensao);

// Formulário de cadastro
router.get('/forms/projeto_extensao', projeto_extensaoController.showCreateForm);

// Cadastro
router.post('/cadastrar', projeto_extensaoController.addprojeto_extensao);

// Consulta
router.get('/consultas/projeto_extensao', projeto_extensaoController.listprojeto_extensaos);

// CRUD inline: Cronograma vinculado ao projeto
router.post('/:id/cronograma', projeto_extensaoController.addCronogramaProjeto);
router.post('/:id/cronograma/:cronId/delete', projeto_extensaoController.deleteCronogramaProjeto);
router.post('/:id/cronograma/:cronId/edit', projeto_extensaoController.editCronogramaProjeto);

// CRUD inline: Custos vinculados ao projeto
router.post('/:id/custo', projeto_extensaoController.addCustoProjeto);
router.post('/:id/custo/:custoId/delete', projeto_extensaoController.deleteCustoProjeto);
router.post('/:id/custo/:custoId/edit', projeto_extensaoController.editCustoProjeto);

// Vincular/Desvincular: Locais
router.post('/:id/local', projeto_extensaoController.addLocalProjeto);
router.post('/:id/local/:localId/delete', projeto_extensaoController.deleteLocalProjeto);

// Vincular/Desvincular: Instituicoes
router.post('/:id/instituicao', projeto_extensaoController.addInstituicaoProjeto);
router.post('/:id/instituicao/:instId/delete', projeto_extensaoController.deleteInstituicaoProjeto);

// Mudança de status (workflow)
router.post('/:id/status', projeto_extensaoController.changeStatus);

// Plano de Extensão
router.get('/:id/plano', projeto_extensaoController.showPlano);
router.post('/:id/plano', projeto_extensaoController.savePlano);
router.get('/:id/plano/pdf', projeto_extensaoController.gerarPdfPlano);

// Relatório de Extensão
router.get('/:id/relatorio', projeto_extensaoController.showRelatorio);
router.post('/:id/relatorio', projeto_extensaoController.saveRelatorio);
router.get('/:id/relatorio/pdf', projeto_extensaoController.gerarPdfRelatorio);

// Questionários de impacto vinculados ao projeto
router.get('/:id/questionarios', questionarioController.list);
router.get('/:id/questionarios/novo', questionarioController.renderForm);

// PDF questionário em branco
router.get('/:id/questionarios/pdf', async (req, res) => {
  try {
    const projeto_extensaoModel = require('../models/projeto_extensaoModel');
    const projeto = await projeto_extensaoModel.getprojeto_extensaosById(req.params.id);
    if (!projeto) return res.status(404).send('Projeto não encontrado');
    res.render('pdf/questionario_pdf', { projeto });
  } catch (error) {
    res.render('error', { message: 'Erro ao gerar PDF', returnLink: '/projeto_extensao' });
  }
});

router.post('/:id/questionarios/cadastrar', questionarioController.add);
router.get('/:id/questionarios/:questId/edit', questionarioController.showEdit);
router.post('/:id/questionarios/:questId/edit', questionarioController.edit);
router.post('/:id/questionarios/:questId/delete', questionarioController.remove);

// Exibir um projeto
router.get('/:id', projeto_extensaoController.showprojeto_extensao);

// Editar
router.get('/:id/edit', projeto_extensaoController.showEditForm);
router.post('/:id/edit', projeto_extensaoController.editprojeto_extensao);

// Excluir
router.get('/:id/confirm-delete', projeto_extensaoController.showConfirmDeleteForm);
router.get('/:id/delete', projeto_extensaoController.deleteprojeto_extensao);

module.exports = router;