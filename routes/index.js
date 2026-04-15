// routes/index.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const projeto_extensaoController = require('../controllers/projeto_extensaoController');
const { authMiddleware, authorize } = require('../middleware/authMiddleware');

const cursoRouter = require('./curso');
const faixa_etariaRouter = require('./faixa_etaria');
const escolaridadeRouter = require('./escolaridade');
const tipo_pessoaRouter = require('./tipo_pessoa');
const avaliacao_institucionalRouter = require('./avaliacao_institucional');
const projeto_extensaoRouter = require('./projeto_extensao');
const pessoaRouter = require('./pessoa');
const tipo_instituicaoRouter = require('./tipo_instituicao');
const instituicaoRouter = require('./instituicao');
const tipo_planoRouter = require('./tipo_plano');
const publico_alvoRouter = require('./publico_alvo');
const tipo_acaoRouter = require('./tipo_acao');
const linha_programaticaRouter = require('./linha_programatica');
const papel_projetoRouter = require('./papel_projeto');
const local_execucaoRouter = require('./local_execucao');
const cronogramaRouter = require('./cronograma');
const projeto_assinaturaRouter = require('./projeto_assinatura');
const projeto_custoRouter = require('./projeto_custo');

// ===== ROTAS PÚBLICAS (sem auth) =====
router.get('/login', (req, res) => {
  if (req.session && req.session.usuario) return res.redirect('/logo');
  res.render('login');
});
router.post('/login', usuarioController.login);
router.get('/logout', usuarioController.logout);

// ===== TODAS AS ROTAS ABAIXO REQUEREM AUTENTICAÇÃO =====
router.use(authMiddleware);

// Dashboard com KPIs
router.get('/logo', projeto_extensaoController.showDashboard);

// Rota raiz
router.get('/', (req, res) => res.redirect('/logo'));

// Configurações (somente admin/coordenador)
router.get('/configuracoes', authorize('admin', 'coordenador'), async (req, res) => {
  try {
    const tipo_pessoaModel = require('../models/tipo_pessoaModel');
    const tipo_planoModel = require('../models/tipo_planoModel');
    const tipo_instituicaoModel = require('../models/tipo_instituicaoModel');
    const tipo_acaoModel = require('../models/tipo_acaoModel');
    const publico_alvoModel = require('../models/publico_alvoModel');
    const papel_projetoModel = require('../models/papel_projetoModel');
    const faixa_etariaModel = require('../models/faixa_etariaModel');
    const escolaridadeModel = require('../models/escolaridadeModel');
    const linha_programaticaModel = require('../models/linha_programaticaModel');
    const pessoaModel = require('../models/pessoaModel');
    const cursoModel = require('../models/cursoModel');
    const instituicaoModel = require('../models/instituicaoModel');
    const local_execucaoModel = require('../models/local_execucaoModel');

    const [tipoPessoa, tipoPlano, tipoInstituicao, tipoAcao, publicoAlvo, papelProjeto, faixaEtaria, escolaridade, linhaProgramatica, pessoas, cursos, instituicoes, locais] = await Promise.all([
      tipo_pessoaModel.getAlltipo_pessoa(),
      tipo_planoModel.getAlltipo_plano(),
      tipo_instituicaoModel.getAlltipo_instituicao(),
      tipo_acaoModel.getAlltipo_acao(),
      publico_alvoModel.getAllpublico_alvo(),
      papel_projetoModel.getAllpapel_projeto(),
      faixa_etariaModel.getAllfaixa_etaria(),
      escolaridadeModel.getAllescolaridade(),
      linha_programaticaModel.getAllinha_programatica(),
      pessoaModel.getAllpessoas(),
      cursoModel.getAllCursos(),
      instituicaoModel.getAllInstituicao(),
      local_execucaoModel.getAlllocal_execucao()
    ]);

    res.render('configuracoes', {
      usuario: req.session.usuario,
      tipo: req.session.tipo,
      tipoPessoa, tipoPlano, tipoInstituicao, tipoAcao,
      publicoAlvo, papelProjeto, faixaEtaria, escolaridade, linhaProgramatica,
      pessoas, cursos, instituicoes, locais
    });
  } catch (error) {
    console.error('Erro ao carregar configurações:', error);
    res.render('error', { message: 'Erro ao carregar configurações', returnLink: '/logo' });
  }
});

// ===== CRUD DE USUÁRIOS (somente admin) =====
router.get('/usuarios', authorize('admin'), usuarioController.listUsuarios);
router.get('/usuarios/forms/usuario', authorize('admin'), usuarioController.showCreateForm);
router.post('/usuarios/cadastrar', authorize('admin'), usuarioController.addUsuario);
router.get('/usuarios/:id/edit', authorize('admin'), usuarioController.showEditForm);
router.post('/usuarios/:id/edit', authorize('admin'), usuarioController.editUsuario);
router.get('/usuarios/:id/delete', authorize('admin'), usuarioController.deleteUsuario);

// Rotas de recursos (protegidas pelo authMiddleware acima)
router.use('/curso', cursoRouter);
router.use('/faixa_etaria', faixa_etariaRouter);
router.use('/escolaridade', escolaridadeRouter);
router.use('/tipo_pessoa', tipo_pessoaRouter);
router.use('/avaliacao_institucional', avaliacao_institucionalRouter);
router.use('/projeto_extensao', projeto_extensaoRouter);
router.use('/pessoa', pessoaRouter);
router.use('/tipo_instituicao', tipo_instituicaoRouter);
router.use('/instituicao', instituicaoRouter);
router.use('/tipo_plano', tipo_planoRouter);
router.use('/publico_alvo', publico_alvoRouter);
router.use('/tipo_acao', tipo_acaoRouter);
router.use('/linha_programatica', linha_programaticaRouter);
router.use('/papel_projeto', papel_projetoRouter);
router.use('/local_execucao', local_execucaoRouter);
router.use('/cronograma', cronogramaRouter);
router.use('/projeto_assinatura', projeto_assinaturaRouter);
router.use('/projeto_custo', projeto_custoRouter);

module.exports = router;
