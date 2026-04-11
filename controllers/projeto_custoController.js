// projeto_custoController.js
const projeto_custoModel = require('../models/projeto_custoModel');
const projeto_extensaoModel = require('../models/projeto_extensaoModel');

const parseNumber = (value, allowFloat = false) => {
 const isEmpty = value === undefined || value === null || value === '';
 if (isEmpty) return null;
 const normalized = String(value).replace(',', '.');
 const num = allowFloat ? parseFloat(normalized) : parseInt(normalized, 10);
 return Number.isFinite(num) ? num : null;
};

async function listprojeto_custo(req, res) {
 try {
 const projetos = await projeto_extensaoModel.getAllprojeto_extensaos();
 const id_projeto = parseInt(req.query.id_projeto, 10);
 
 let projeto_custo = [];
 if (id_projeto && !isNaN(id_projeto)) {
   projeto_custo = await projeto_custoModel.getprojeto_custoByProjetoId(id_projeto);
 }
 
 res.render('consultas/projeto_custo', { 
   dados: projeto_custo, 
   projetos,
   idProjetoSelecionado: id_projeto || ''
 });
 } catch (error) {
 console.error('Erro ao buscar projeto_custo:', error);
 res.render('error', { message: 'Erro ao buscar projeto_custo', returnLink: '/welcome' });
 }
}

async function filterprojeto_custo(req, res) {
 const { nome } = req.body;
 try {
 const projeto_custo = await projeto_custoModel.getprojeto_custoByNome(nome || '');
 if (!projeto_custo || projeto_custo.length === 0) {
 res.render('consultas/projeto_custo', { dados: [] });
 return;
 }
 res.render('consultas/projeto_custo', { dados: projeto_custo });
 } catch (error) {
 console.error('Erro ao filtrar projeto_custo:', error);
 res.render('error', { message: 'Erro ao filtrar projeto_custo', returnLink: '/welcome' });
 }
}

async function addprojeto_custo(req, res) {
 const registro = {
 id_projeto: parseNumber(req.body.id_projeto, false),
 descricao: req.body.descricao,
 quantitativo: parseNumber(req.body.quantitativo, true),
 valor_unitario: parseNumber(req.body.valor_unitario, true),
 justificativa: req.body.justificativa,
 realizado: null,
 tipo: null,
 fonte_recurso: req.body.fonte_recurso
 };
 try {
 await projeto_custoModel.insertprojeto_custo(registro);
 res.redirect('/projeto_custo/consultas/projeto_custo');
 } catch (error) {
 console.error('Erro ao inserir projeto_custo:', error);
 res.render('error', { message: 'Erro ao inserir projeto_custo', returnLink: '/projeto_custo' });
 }
}

async function showprojeto_custo(req, res) {
 const id = req.params.id;
 try {
 const projeto_custo = await projeto_custoModel.getprojeto_custoById(id);
 if (!projeto_custo) {
 res.status(404).send('projeto_custo nao encontrado');
 return;
 }
 res.render('consultas/projeto_custo', { dados: [projeto_custo] });
 } catch (error) {
 console.error('Erro ao buscar projeto_custo:', error);
 res.render('error', { message: 'Erro ao buscar projeto_custo', returnLink: '/welcome' });
 }
}

async function showCreateForm(req, res) {
  try {
    const projetos = await projeto_extensaoModel.getAllprojeto_extensaos();
    res.render('forms/projeto_custo', { 
      projeto_custo: { Id: '', id_projeto: '', descricao: '', quantitativo: '', valor_unitario: '', justificativa: '', fonte_recurso: '' }, 
      isEdit: false,
      projetos
    });
  } catch (error) {
    console.error('Erro ao carregar formulario de cadastro:', error);
    res.render('error', { message: 'Erro ao carregar cadastro', returnLink: '/projeto_custo' });
  }
}

async function showEditForm(req, res) {
 const id = req.params.id;
 try {
 const projeto_custo = await projeto_custoModel.getprojeto_custoById(id);
 if (!projeto_custo) {
 res.status(404).send('projeto_custo nao encontrado');
 return;
 }
 const projetos = await projeto_extensaoModel.getAllprojeto_extensaos();
 res.render('forms/projeto_custo', { projeto_custo, isEdit: true, projetos });
 } catch (error) {
 console.error('Erro ao carregar projeto_custo para edicao:', error);
 res.render('error', { message: 'Erro ao carregar projeto_custo para edicao', returnLink: '/projeto_custo' });
 }
}

async function editprojeto_custo(req, res) {
 const id = req.params.id;
 const registro = {
 id_projeto: parseNumber(req.body.id_projeto, false),
 descricao: req.body.descricao,
 quantitativo: parseNumber(req.body.quantitativo, true),
 valor_unitario: parseNumber(req.body.valor_unitario, true),
 justificativa: req.body.justificativa,
 realizado: null,
 tipo: null,
 fonte_recurso: req.body.fonte_recurso
 };
 try {
 await projeto_custoModel.updateprojeto_custo(id, registro);
 res.redirect('/projeto_custo/consultas/projeto_custo');
 } catch (error) {
 console.error('Erro ao editar projeto_custo:', error);
 res.render('error', { message: 'Erro ao editar projeto_custo', returnLink: '/projeto_custo' });
 }
}

async function showConfirmDeleteForm(req, res) {
 const id = req.params.id;
 try {
 const projeto_custo = await projeto_custoModel.getprojeto_custoById(id);
 if (!projeto_custo) {
 res.status(404).send('projeto_custo nao encontrado');
 return;
 }
 res.render('confirmDelete', { projeto_custo });
 } catch (error) {
 console.error('Erro ao carregar confirmacao de exclusao:', error);
 res.render('error', { message: 'Erro ao carregar confirmacao de exclusao', returnLink: '/projeto_custo' });
 }
}

async function deleteprojeto_custo(req, res) {
 const id = req.params.id;
 try {
 await projeto_custoModel.deleteprojeto_custo(id);
 res.redirect('/projeto_custo');
 } catch (error) {
 console.error('Erro ao excluir projeto_custo:', error);
 res.render('error', { message: 'Erro ao excluir projeto_custo', returnLink: '/projeto_custo' });
 }
}

module.exports = {
  listprojeto_custo,
  filterprojeto_custo,
  addprojeto_custo,
  showprojeto_custo,
  showCreateForm,
  showEditForm,
  editprojeto_custo,
  showConfirmDeleteForm,
  deleteprojeto_custo
};