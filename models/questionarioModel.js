const pool = require('../db');

async function getAll() {
    const [rows] = await pool.query('SELECT * FROM questionario_impacto ORDER BY id DESC');
    return rows;
}

async function getById(id) {
    const [rows] = await pool.query('SELECT * FROM questionario_impacto WHERE id = ?', [id]);
    return rows[0];
}

async function insert(dados) {
    const sql = `INSERT INTO questionario_impacto 
        (nome_acao, instituicao, data_realizacao, tipo_acao, local_realizacao, 
        faixa_etaria, escolaridade, reside_local, aval_conteudo, expectativas, 
        impacto_desc, aplicacao_conhecimento, gostou, melhorias, consentimento) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const params = [
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

module.exports = { getAll, getById, insert, update, deleteById };