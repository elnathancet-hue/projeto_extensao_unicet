// models/local_execucaoModel.js
const pool = require('../db');

async function getAlllocal_execucao() {
  try {
    const [registros] = await pool.query('SELECT id_local, endereco, cep, bairro, cidade FROM local_execucao ORDER BY id_local DESC');
    return registros;
  } catch (error) {
    throw error;
  }
}

async function getlocal_execucaoByNome(nome) {
  try {
    const [registros] = await pool.query(
      'SELECT * FROM local_execucao WHERE endereco LIKE ? OR cidade LIKE ? ORDER BY id_local DESC',
      [`%${nome}%`, `%${nome}%`]
    );
    return registros;
  } catch (error) {
    throw error;
  }
}

async function getlocal_execucaoById(id) {
  try {
    const [registros] = await pool.query('SELECT * FROM local_execucao WHERE id_local = ?', [id]);
    return registros[0];
  } catch (error) {
    throw error;
  }
}

async function insertlocal_execucao(endereco, cep, bairro, cidade) {
  try {
    await pool.query('INSERT INTO local_execucao (endereco, cep, bairro, cidade) VALUES (?, ?, ?, ?)', [endereco, cep, bairro, cidade]);
    const [registros] = await pool.query('SELECT * FROM local_execucao WHERE endereco LIKE ? ORDER BY id_local DESC', [`%${endereco}%`]);
    return registros;
  } catch (error) {
    throw error;
  }
}

async function updatelocal_execucao(id, endereco, cep, bairro, cidade) {
  try {
    await pool.query('UPDATE local_execucao SET endereco = ?, cep = ?, bairro = ?, cidade = ? WHERE id_local = ?', [endereco, cep, bairro, cidade, id]);
  } catch (error) {
    throw error;
  }
}

async function deletelocal_execucao(id) {
  try {
    await pool.query('DELETE FROM local_execucao WHERE id_local = ?', [id]);
  } catch (error) {
    throw error;
  }
}

async function filterlocal_execucao(filters) {
  let sql = 'SELECT id_local, endereco, cep, bairro, cidade FROM local_execucao';
  const conditions = [];
  const params = [];
  if (filters.cidade) { conditions.push('cidade LIKE ?'); params.push('%' + filters.cidade + '%'); }
  if (filters.bairro) { conditions.push('bairro LIKE ?'); params.push('%' + filters.bairro + '%'); }
  if (filters.endereco) { conditions.push('endereco LIKE ?'); params.push('%' + filters.endereco + '%'); }
  if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
  sql += ' ORDER BY id_local DESC';
  const [rows] = await pool.query(sql, params);
  return rows;
}

module.exports = {
  getAlllocal_execucao,
  getlocal_execucaoByNome,
  getlocal_execucaoById,
  insertlocal_execucao,
  updatelocal_execucao,
  deletelocal_execucao,
  filterlocal_execucao
};
