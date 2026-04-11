// models/instituicaoModel.js
const pool = require('../db');

async function getAllInstituicao() {
  try {
    const [registros] = await pool.query(
      // Corrigido: i.id_tipo_instituicao
      'SELECT i.id_instituicao, i.nome, i.sigla, ti.descricao as tipo FROM instituicao i LEFT JOIN tipo_instituicao ti ON i.id_tipo_instituicao = ti.id_tipo_instituicao ORDER BY i.id_instituicao DESC'
    );
    return registros;
  } catch (error) {
    throw error;
  }
}

async function getInstituicaoByNome(nome) {
  try {
    const [registros] = await pool.query(
      // Corrigido: i.id_tipo_instituicao
      'SELECT i.id_instituicao, i.nome, i.sigla, ti.descricao as tipo FROM instituicao i LEFT JOIN tipo_instituicao ti ON i.id_tipo_instituicao = ti.id_tipo_instituicao WHERE i.nome LIKE ? ORDER BY i.id_instituicao DESC',
      [`%${nome}%`]
    );
    return registros;
  } catch (error) {
    throw error;
  }
}

async function getInstituicaoById(id) {
  try {
    const [registros] = await pool.query('SELECT * FROM instituicao WHERE id_instituicao = ?', [id]);
    return registros[0];
  } catch (error) {
    throw error;
  }
}

async function insertInstituicao(nome, sigla, id_tipo_instituicao) {
  try {
    // Corrigido: nome da coluna id_tipo_instituicao no INSERT
    await pool.query('INSERT INTO instituicao (nome, sigla, id_tipo_instituicao) VALUES (?, ?, ?)', [nome, sigla, id_tipo_instituicao]);
    
    const [registros] = await pool.query(
      'SELECT i.id_instituicao, i.nome, i.sigla, ti.descricao as tipo FROM instituicao i LEFT JOIN tipo_instituicao ti ON i.id_tipo_instituicao = ti.id_tipo_instituicao WHERE i.nome LIKE ? ORDER BY i.id_instituicao DESC',
      [`%${nome}%`]
    );
    return registros;
  } catch (error) {
    throw error;
  }
}

async function updateInstituicao(id, nome, sigla, id_tipo_instituicao) {
  try {
    // Corrigido: nome da coluna id_tipo_instituicao no SET
    await pool.query('UPDATE instituicao SET nome = ?, sigla = ?, id_tipo_instituicao = ? WHERE id_instituicao = ?', [nome, sigla, id_tipo_instituicao, id]);
  } catch (error) {
    throw error;
  }
}

async function deleteInstituicao(id) {
  try {
    await pool.query('DELETE FROM instituicao WHERE id_instituicao = ?', [id]);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllInstituicao,
  getInstituicaoByNome,
  getInstituicaoById,
  insertInstituicao,
  updateInstituicao,
  deleteInstituicao
};