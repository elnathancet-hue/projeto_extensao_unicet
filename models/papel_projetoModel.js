// models/papel_projetoModel.js
const pool = require('../db');

async function getAllpapel_projeto() {
  try {
    const [registros] = await pool.query('SELECT id_papel, descricao FROM papel_projeto ORDER BY id_papel DESC');
    return registros;
  } catch (error) {
    throw error;
  }
}

async function getpapel_projetoByNome(nome) {
  try {
    const [registros] = await pool.query(
      'SELECT * FROM papel_projeto WHERE descricao LIKE ? ORDER BY id_papel DESC',
      [`%${nome}%`]
    );
    return registros;
  } catch (error) {
    throw error;
  }
}

async function getpapel_projetoById(id) {
  try {
    const [registros] = await pool.query('SELECT * FROM papel_projeto WHERE id_papel = ?', [id]);
    return registros[0];
  } catch (error) {
    throw error;
  }
}

async function insertpapel_projeto(descricao) {
  try {
    await pool.query('INSERT INTO papel_projeto (descricao) VALUES (?)', [descricao]);
    const [registros] = await pool.query('SELECT * FROM papel_projeto WHERE descricao LIKE ? ORDER BY id_papel DESC', [`%${descricao}%`]);
    return registros;
  } catch (error) {
    throw error;
  }
}

async function updatepapel_projeto(id, descricao) {
  try {
    await pool.query('UPDATE papel_projeto SET descricao = ? WHERE id_papel = ?', [descricao, id]);
  } catch (error) {
    throw error;
  }
}

async function deletepapel_projeto(id) {
  try {
    await pool.query('DELETE FROM papel_projeto WHERE id_papel = ?', [id]);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllpapel_projeto,
  getpapel_projetoByNome,
  getpapel_projetoById,
  insertpapel_projeto,
  updatepapel_projeto,
  deletepapel_projeto
};
