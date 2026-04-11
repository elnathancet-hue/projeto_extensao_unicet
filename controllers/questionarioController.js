const questionarioModel = require('../models/questionarioModel');

function mapBodyToData(body) {
    return {
        nome_acao: body.nome_acao || null,
        instituicao: body.instituicao || null,
        data_realizacao: body.data_realizacao || null,
        tipo_acao: body.tipo_acao || null,
        local_realizacao: body.local_realizacao || null,
        faixa_etaria: body.faixa_etaria || null,
        escolaridade: body.escolaridade || null,
        reside_local: body.reside_local || null,
        aval_conteudo: body.aval_conteudo || null,
        expectativas: body.expectativas || null,
        impacto_desc: body.impacto_desc || null,
        aplicacao_conhecimento: body.aplicacao_conhecimento || null,
        gostou: body.gostou || null,
        melhorias: body.melhorias || null,
        consentimento: body.consentimento || null
    };
}

async function renderForm(req, res) {
    res.render('forms/questionario', { questionario: null, isEditMode: false });
}

async function add(req, res) {
    try {
        await questionarioModel.insert(mapBodyToData(req.body));
        res.redirect('/questionario/listar');
    } catch (error) {
        console.error(error);
        res.render('error', { message: 'Erro ao salvar questionário' });
    }
}

async function showEdit(req, res) {
    try {
        const quest = await questionarioModel.getById(req.params.id);
        res.render('forms/questionario', { questionario: quest, isEditMode: true });
    } catch (error) {
        res.render('error', { message: 'Questionário não encontrado' });
    }
}

async function edit(req, res) {
    try {
        await questionarioModel.update(req.params.id, mapBodyToData(req.body));
        res.redirect('/questionario/listar');
    } catch (error) {
        res.render('error', { message: 'Erro ao editar' });
    }
}

async function list(req, res) {
    const dados = await questionarioModel.getAll();
    res.render('consultas/questionario', { dados });
}

module.exports = { renderForm, add, showEdit, edit, list };