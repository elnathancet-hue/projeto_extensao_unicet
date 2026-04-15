const questionarioModel = require('../models/questionarioModel');
const projeto_extensaoModel = require('../models/projeto_extensaoModel');

async function list(req, res) {
  try {
    const idProjeto = req.params.id;
    const projeto = await projeto_extensaoModel.getprojeto_extensaosById(idProjeto);
    if (!projeto) return res.render('error', { message: 'Projeto não encontrado', returnLink: '/projeto_extensao' });

    const questionarios = await questionarioModel.getAllByProjeto(idProjeto);
    const resumo = await questionarioModel.getResumoByProjeto(idProjeto);

    res.render('consultas/questionario', {
      dados: questionarios,
      projeto,
      resumo,
      idProjeto
    });
  } catch (error) {
    console.error('Erro ao listar questionários:', error);
    res.render('error', { message: 'Erro ao listar questionários', returnLink: '/projeto_extensao' });
  }
}

async function renderForm(req, res) {
  try {
    const idProjeto = req.params.id;
    const projeto = await projeto_extensaoModel.getprojeto_extensaosById(idProjeto);
    if (!projeto) return res.render('error', { message: 'Projeto não encontrado', returnLink: '/projeto_extensao' });

    res.render('forms/questionario', {
      questionario: {
        nome_acao: projeto.titulo,
        instituicao: '',
        local_realizacao: ''
      },
      isEditMode: false,
      projeto,
      idProjeto
    });
  } catch (error) {
    console.error('Erro ao carregar formulário:', error);
    res.render('error', { message: 'Erro ao carregar formulário', returnLink: '/projeto_extensao' });
  }
}

async function add(req, res) {
  try {
    const idProjeto = req.params.id;
    const dados = mapBodyToData(req.body);
    dados.id_projeto = idProjeto;
    await questionarioModel.insert(dados);
    req.session.flash = { type: 'success', message: 'Questionário registrado com sucesso!' };
    res.redirect('/projeto_extensao/' + idProjeto + '/questionarios');
  } catch (error) {
    console.error('Erro ao salvar questionário:', error);
    res.render('error', { message: 'Erro ao salvar questionário', returnLink: '/projeto_extensao/' + req.params.id + '/questionarios' });
  }
}

async function showEdit(req, res) {
  try {
    const idProjeto = req.params.id;
    const questId = req.params.questId;
    const projeto = await projeto_extensaoModel.getprojeto_extensaosById(idProjeto);
    const questionario = await questionarioModel.getById(questId);
    if (!questionario) return res.render('error', { message: 'Questionário não encontrado', returnLink: '/projeto_extensao/' + idProjeto + '/questionarios' });

    res.render('forms/questionario', {
      questionario,
      isEditMode: true,
      projeto,
      idProjeto
    });
  } catch (error) {
    console.error('Erro ao carregar questionário:', error);
    res.render('error', { message: 'Erro ao carregar questionário', returnLink: '/projeto_extensao/' + req.params.id + '/questionarios' });
  }
}

async function edit(req, res) {
  try {
    const idProjeto = req.params.id;
    const questId = req.params.questId;
    const dados = mapBodyToData(req.body);
    await questionarioModel.update(questId, dados);
    req.session.flash = { type: 'success', message: 'Questionário atualizado com sucesso!' };
    res.redirect('/projeto_extensao/' + idProjeto + '/questionarios');
  } catch (error) {
    console.error('Erro ao editar questionário:', error);
    res.render('error', { message: 'Erro ao editar questionário', returnLink: '/projeto_extensao/' + req.params.id + '/questionarios' });
  }
}

async function remove(req, res) {
  try {
    const idProjeto = req.params.id;
    const questId = req.params.questId;
    await questionarioModel.deleteById(questId);
    req.session.flash = { type: 'success', message: 'Questionário excluído com sucesso!' };
    res.redirect('/projeto_extensao/' + idProjeto + '/questionarios');
  } catch (error) {
    console.error('Erro ao excluir questionário:', error);
    res.render('error', { message: 'Erro ao excluir questionário', returnLink: '/projeto_extensao/' + req.params.id + '/questionarios' });
  }
}

function mapBodyToData(body) {
  return {
    nome_acao: body.nome_acao,
    instituicao: body.instituicao,
    data_realizacao: body.data_realizacao,
    tipo_acao: body.tipo_acao,
    local_realizacao: body.local_realizacao,
    faixa_etaria: body.faixa_etaria,
    escolaridade: body.escolaridade,
    reside_local: body.reside_local,
    aval_conteudo: body.aval_conteudo,
    expectativas: body.expectativas,
    impacto_desc: body.impacto_desc,
    aplicacao_conhecimento: body.aplicacao_conhecimento,
    gostou: body.gostou,
    melhorias: body.melhorias,
    consentimento: body.consentimento
  };
}

module.exports = { list, renderForm, add, showEdit, edit, remove };
