const projeto_extensaoModel = require('../models/projeto_extensaoModel');
const tipo_acaoModel = require('../models/tipo_acaoModel');
const linha_programaticaModel = require('../models/linha_programaticaModel');
const tipo_planoModel = require('../models/tipo_planoModel');
const publico_alvoModel = require('../models/publico_alvoModel');
const cursoModel = require('../models/cursoModel');

// ajuste esse valor conforme o id real em Papel_Projeto
const ID_PAPEL_PROFESSOR = 1;

// Normaliza o corpo da request para o formato esperado pelo model
function mapRequestToRegistro(body) {
  const {
    id_projeto,
    titulo,
    id_tipo_plano,
    periodo_inicio,
    periodo_fim,
    carga_horaria_total,
    id_publico_alvo,
    objetivo,
    metodologia,
    tipo_acao_ids,
    linha_programatica_ids,
    dadosCursos
  } = body;

  const mapRel = (ids, idKey) => {
    if (!ids) return [];
    const idArray = Array.isArray(ids) ? ids : [ids];
    return idArray.map(id => ({ [idKey]: id }));
  };

  let cursos = [];
  if (dadosCursos) {
    try {
      cursos = JSON.parse(dadosCursos);
    } catch (error) {
      console.error('Erro ao converter dadosCursos:', error);
      cursos = [];
    }
  }

  return {
    id_projeto,
    titulo,
    id_tipo_plano: id_tipo_plano || null,
    coordenador_id: null,
    periodo_inicio: periodo_inicio || null,
    periodo_fim: periodo_fim || null,
    carga_horaria_total: carga_horaria_total || null,
    id_publico_alvo: id_publico_alvo || null,
    objetivo,
    metodologia,
    tiposAcao: mapRel(tipo_acao_ids, 'id_acao'),
    linhasProgramaticas: mapRel(linha_programatica_ids, 'id_linha'),
    cursos
  };
}

async function listprojeto_extensaos(req, res) {
  try {
    const filters = {
      titulo: req.query.titulo || '',
      id_tipo_plano: req.query.id_tipo_plano || '',
      periodo_inicio_de: req.query.periodo_inicio_de || '',
      periodo_inicio_ate: req.query.periodo_inicio_ate || ''
    };
    const hasFilter = Object.values(filters).some(v => v);
    const projeto_extensaos = hasFilter ? await projeto_extensaoModel.filterprojeto_extensao(filters) : await projeto_extensaoModel.getAllprojeto_extensaos();
    const tipoPlanos = await tipo_planoModel.getAlltipo_plano();
    res.render('consultas/projeto_extensao', { dados: projeto_extensaos, filters, tipoPlanos });
  } catch (error) {
    console.error('Erro ao buscar projeto_extensaos:', error);
    res.render('error', {
      message: 'Erro ao buscar projeto_extensaos',
      returnLink: '/logo'
    });
  }
}

async function filterprojeto_extensao(req, res) {
  const { nome } = req.body;
  try {
    const projeto_extensaos = await projeto_extensaoModel.getprojeto_extensaosByNome(nome || '');
    res.render('consultas/projeto_extensao', { dados: projeto_extensaos || [] });
  } catch (error) {
    console.error('Erro ao filtrar projeto_extensao:', error);
    res.render('error', {
      message: 'Erro ao filtrar projeto_extensao',
      returnLink: '/logo'
    });
  }
}

async function showCreateForm(req, res) {
  try {
    const tipoPlanos = await tipo_planoModel.getAlltipo_plano();
    const publicosAlvo = await publico_alvoModel.getAllpublico_alvo();
    const todosTiposAcao = await tipo_acaoModel.getAlltipo_acao();
    const todasLinhas = await linha_programaticaModel.getAllinha_programatica();
    const cursos = await cursoModel.getAllCursosComEquipe();

    res.render('forms/projeto_extensao', {
      projeto_extensao: {},
      isEdit: false,
      tipoPlanos,
      publicosAlvo,
      cursos,
      todosTiposAcao,
      todasLinhas,
      relTiposAcao: [],
      relLinhas: []
    });
  } catch (error) {
    console.error('Erro ao carregar formulário de cadastro:', error);
    res.render('error', {
      message: 'Erro ao carregar formulário de cadastro',
      returnLink: '/projeto_extensao'
    });
  }
}

async function addprojeto_extensao(req, res) {
  try {
    const registro = mapRequestToRegistro(req.body);

    const projetoId = await projeto_extensaoModel.insertprojeto_extensaos(registro);

    await projeto_extensaoModel.updateTipoAcaoProjeto(projetoId, registro.tiposAcao);
    await projeto_extensaoModel.updateLinhaProgramaticaProjeto(projetoId, registro.linhasProgramaticas);
    await projeto_extensaoModel.updateCursosProjeto(projetoId, registro.cursos);
    await projeto_extensaoModel.updatePessoasProjeto(
      projetoId,
      registro.cursos,
      ID_PAPEL_PROFESSOR
    );

    res.redirect('/projeto_extensao');
  } catch (error) {
    console.error('Erro ao inserir projeto_extensao:', error);
    res.render('error', {
      message: 'Erro ao inserir projeto_extensao',
      returnLink: '/logo'
    });
  }
}

async function showprojeto_extensao(req, res) {
  const id = req.params.id;
  try {
    const projeto_extensao = await projeto_extensaoModel.getprojeto_extensaosById(id);
    if (!projeto_extensao) {
      return res.status(404).send('projeto_extensao nao encontrado');
    }

    res.render('consultas/projeto_extensao', { dados: [projeto_extensao] });
  } catch (error) {
    console.error('Erro ao buscar projeto_extensao:', error);
    res.render('error', {
      message: 'Erro ao buscar projeto_extensao',
      returnLink: '/logo'
    });
  }
}

async function showEditForm(req, res) {
  const id = req.params.id;
  try {
    const projeto_extensao = await projeto_extensaoModel.getprojeto_extensaosById(id);
    if (!projeto_extensao) {
      return res.status(404).send('projeto_extensao nao encontrado');
    }

    const tipoPlanos = await tipo_planoModel.getAlltipo_plano();
    const publicosAlvo = await publico_alvoModel.getAllpublico_alvo();
    const todosTiposAcao = await tipo_acaoModel.getAlltipo_acao();
    const todasLinhas = await linha_programaticaModel.getAllinha_programatica();
    const relTiposAcao = await projeto_extensaoModel.getTipoAcaoByProjeto(id);
    const relLinhas = await projeto_extensaoModel.getLinhaProgramaticaByProjeto(id);
    const cursos = await cursoModel.getAllCursosComEquipe();

    const relCursos = await projeto_extensaoModel.getCursosByProjeto(id);
    const relPessoas = await projeto_extensaoModel.getPessoasByProjeto(id);
    const ID_PAPEL_PROFESSOR = 1;
    const relProfs = relPessoas.filter(p => p.id_papel == ID_PAPEL_PROFESSOR).map(p => String(p.id_pessoa));
    
    const cursosPreSelecionados = relCursos.map((c) => {
      return {
        cursoId: String(c.id_curso),
        professores: relProfs
      };
    });

    res.render('forms/projeto_extensao', {
      projeto_extensao,
      isEdit: true,
      tipoPlanos,
      publicosAlvo,
      cursos,
      todosTiposAcao,
      todasLinhas,
      relTiposAcao,
      relLinhas,
      cursosPreSelecionados
    });
    
  } catch (error) {
    console.error('Erro ao carregar projeto_extensao para edicao:', error);
    res.render('error', {
      message: 'Erro ao carregar projeto_extensao para edicao',
      returnLink: '/projeto_extensao'
    });
  }
}

async function editprojeto_extensao(req, res) {
  const id = req.params.id;
  try {
    const registro = mapRequestToRegistro(req.body);

    await projeto_extensaoModel.updateprojeto_extensaos(id, registro);
    await projeto_extensaoModel.updateTipoAcaoProjeto(id, registro.tiposAcao);
    await projeto_extensaoModel.updateLinhaProgramaticaProjeto(id, registro.linhasProgramaticas);
    await projeto_extensaoModel.updateCursosProjeto(id, registro.cursos);
    await projeto_extensaoModel.updatePessoasProjeto(
      id,
      registro.cursos,
      ID_PAPEL_PROFESSOR
    );

    res.redirect('/projeto_extensao');
  } catch (error) {
    console.error('Erro ao editar projeto_extensao:', error);
    res.render('error', {
      message: 'Erro ao editar projeto_extensao',
      returnLink: '/projeto_extensao'
    });
  }
}

async function showConfirmDeleteForm(req, res) {
  const id = req.params.id;
  try {
    const projeto_extensao = await projeto_extensaoModel.getprojeto_extensaosById(id);
    if (!projeto_extensao) {
      return res.status(404).send('projeto_extensao nao encontrado');
    }

    res.render('confirmDelete', { projeto_extensao });
  } catch (error) {
    console.error('Erro ao carregar confirmacao de exclusao:', error);
    res.render('error', {
      message: 'Erro ao carregar confirmacao de exclusao',
      returnLink: '/projeto_extensao'
    });
  }
}

async function deleteprojeto_extensao(req, res) {
  const id = req.params.id;
  try {
    await projeto_extensaoModel.deleteprojeto_extensaos(id);
    res.redirect('/projeto_extensao');
  } catch (error) {
    console.error('Erro ao excluir projeto_extensao:', error);
    res.render('error', {
      message: 'Erro ao excluir projeto_extensao',
      returnLink: '/projeto_extensao'
    });
  }
}

async function showPlano(req, res) {
  try {
    const projeto = await projeto_extensaoModel.getProjetoCompletoById(req.params.id);
    if (!projeto) return res.render('error', { message: 'Projeto não encontrado', returnLink: '/projeto_extensao' });
    res.render('forms/plano_extensao', { projeto });
  } catch (error) {
    console.error('Erro ao carregar plano:', error);
    res.render('error', { message: 'Erro ao carregar plano', returnLink: '/projeto_extensao' });
  }
}

async function savePlano(req, res) {
  try {
    await projeto_extensaoModel.updatePlano(req.params.id, req.body);
    res.redirect('/projeto_extensao/' + req.params.id + '/plano');
  } catch (error) {
    console.error('Erro ao salvar plano:', error);
    res.render('error', { message: 'Erro ao salvar plano', returnLink: '/projeto_extensao' });
  }
}

async function showRelatorio(req, res) {
  try {
    const projeto = await projeto_extensaoModel.getProjetoCompletoById(req.params.id);
    if (!projeto) return res.render('error', { message: 'Projeto não encontrado', returnLink: '/projeto_extensao' });
    res.render('forms/relatorio_extensao', { projeto });
  } catch (error) {
    console.error('Erro ao carregar relatório:', error);
    res.render('error', { message: 'Erro ao carregar relatório', returnLink: '/projeto_extensao' });
  }
}

async function saveRelatorio(req, res) {
  try {
    await projeto_extensaoModel.updateRelatorio(req.params.id, req.body);
    res.redirect('/projeto_extensao/' + req.params.id + '/relatorio');
  } catch (error) {
    console.error('Erro ao salvar relatório:', error);
    res.render('error', { message: 'Erro ao salvar relatório', returnLink: '/projeto_extensao' });
  }
}

async function gerarPdfPlano(req, res) {
  try {
    const projeto = await projeto_extensaoModel.getProjetoCompletoById(req.params.id);
    if (!projeto) return res.status(404).send('Projeto não encontrado');
    const fs = require('fs');
    const path = require('path');
    const logoPath = path.join(__dirname, '..', 'views', 'imagens', 'logo-unicet.png');
    const logoBase64 = fs.readFileSync(logoPath).toString('base64');
    const logoSrc = 'data:image/png;base64,' + logoBase64;
    res.render('pdf/plano_pdf', { projeto, logoSrc });
  } catch (error) {
    console.error('Erro ao gerar PDF do plano:', error);
    res.render('error', { message: 'Erro ao gerar PDF', returnLink: '/projeto_extensao/' + req.params.id + '/plano' });
  }
}

async function gerarPdfRelatorio(req, res) {
  try {
    const projeto = await projeto_extensaoModel.getProjetoCompletoById(req.params.id);
    if (!projeto) return res.status(404).send('Projeto não encontrado');
    const fs = require('fs');
    const path = require('path');
    const logoPath = path.join(__dirname, '..', 'views', 'imagens', 'logo-unicet.png');
    const logoBase64 = fs.readFileSync(logoPath).toString('base64');
    const logoSrc = 'data:image/png;base64,' + logoBase64;
    res.render('pdf/relatorio_pdf', { projeto, logoSrc });
  } catch (error) {
    console.error('Erro ao gerar PDF do relatório:', error);
    res.render('error', { message: 'Erro ao gerar PDF', returnLink: '/projeto_extensao/' + req.params.id + '/relatorio' });
  }
}

module.exports = {
  listprojeto_extensaos,
  filterprojeto_extensao,
  showCreateForm,
  addprojeto_extensao,
  showprojeto_extensao,
  showEditForm,
  editprojeto_extensao,
  showConfirmDeleteForm,
  deleteprojeto_extensao,
  showPlano,
  savePlano,
  showRelatorio,
  saveRelatorio,
  gerarPdfPlano,
  gerarPdfRelatorio
};