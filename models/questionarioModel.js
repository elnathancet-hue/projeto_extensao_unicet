const pool = require('../db');

async function getAll() {
    const [rows] = await pool.query('SELECT * FROM questionario_impacto ORDER BY id DESC');
    return rows;
}

async function getAllByProjeto(idProjeto) {
    const [rows] = await pool.query('SELECT * FROM questionario_impacto WHERE id_projeto = ? ORDER BY id DESC', [idProjeto]);
    return rows;
}

async function getById(id) {
    const [rows] = await pool.query('SELECT * FROM questionario_impacto WHERE id = ?', [id]);
    return rows[0];
}

async function insert(dados) {
    const sql = `INSERT INTO questionario_impacto
        (id_projeto, nome_acao, instituicao, data_realizacao, tipo_acao, local_realizacao,
        faixa_etaria, escolaridade, reside_local, aval_conteudo, expectativas,
        impacto_desc, aplicacao_conhecimento, gostou, melhorias, consentimento)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
        dados.id_projeto || null,
        dados.nome_acao, dados.instituicao, dados.data_realizacao, dados.tipo_acao, dados.local_realizacao,
        dados.faixa_etaria, dados.escolaridade, dados.reside_local, dados.aval_conteudo, dados.expectativas,
        dados.impacto_desc, dados.aplicacao_conhecimento, dados.gostou, dados.melhorias, dados.consentimento
    ];

    const [result] = await pool.query(sql, params);
    return result.insertId;
}

async function update(id, dados) {
    const sql = `UPDATE questionario_impacto SET
        nome_acao=?, instituicao=?, data_realizacao=?, tipo_acao=?, local_realizacao=?,
        faixa_etaria=?, escolaridade=?, reside_local=?, aval_conteudo=?, expectativas=?,
        impacto_desc=?, aplicacao_conhecimento=?, gostou=?, melhorias=?, consentimento=?
        WHERE id=?`;

    const params = [
        dados.nome_acao, dados.instituicao, dados.data_realizacao, dados.tipo_acao, dados.local_realizacao,
        dados.faixa_etaria, dados.escolaridade, dados.reside_local, dados.aval_conteudo, dados.expectativas,
        dados.impacto_desc, dados.aplicacao_conhecimento, dados.gostou, dados.melhorias, dados.consentimento,
        id
    ];

    await pool.query(sql, params);
}

async function deleteById(id) {
    await pool.query('DELETE FROM questionario_impacto WHERE id = ?', [id]);
}

async function countByProjeto(idProjeto) {
    const [rows] = await pool.query('SELECT COUNT(*) as total FROM questionario_impacto WHERE id_projeto = ?', [idProjeto]);
    return rows[0].total;
}

async function getResumoByProjeto(idProjeto) {
    const [rows] = await pool.query('SELECT * FROM questionario_impacto WHERE id_projeto = ?', [idProjeto]);
    if (rows.length === 0) return { total: 0 };

    const total = rows.length;
    // Count avaliações
    const avalCounts = {};
    rows.forEach(r => { avalCounts[r.aval_conteudo] = (avalCounts[r.aval_conteudo] || 0) + 1; });

    // Count expectativas
    const expCounts = {};
    rows.forEach(r => { expCounts[r.expectativas] = (expCounts[r.expectativas] || 0) + 1; });

    // Count faixa_etaria
    const faixaCounts = {};
    rows.forEach(r => { faixaCounts[r.faixa_etaria] = (faixaCounts[r.faixa_etaria] || 0) + 1; });

    return { total, avalCounts, expCounts, faixaCounts };
}

module.exports = { getAll, getAllByProjeto, getById, insert, update, deleteById, countByProjeto, getResumoByProjeto };
