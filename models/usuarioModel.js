// models/usuarioModel.js
const pool = require('../db');

async function getUserByUsernameAndPassword(username, password) {
  const [rows] = await pool.execute(
    'SELECT * FROM usuario WHERE usuario = ? AND senha = ?',
    [username, password]
  );
  return rows[0];
}

async function getAllUsuarios() {
  const [rows] = await pool.query(`
    SELECT u.*, p.nome AS nome_pessoa
    FROM usuario u
    LEFT JOIN pessoa p ON u.id_pessoa = p.id_pessoa
    ORDER BY u.id_usuario DESC
  `);
  return rows;
}

async function getUsuarioById(id) {
  const [rows] = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [id]);
  return rows[0];
}

async function insertUsuario(data) {
  const [result] = await pool.query(
    'INSERT INTO usuario (usuario, senha, tipo, id_pessoa) VALUES (?, ?, ?, ?)',
    [data.usuario, data.senha, data.tipo || 'professor', data.id_pessoa || null]
  );
  return result.insertId;
}

async function updateUsuario(id, data) {
  // Se senha vazia, não atualizar a senha
  if (data.senha) {
    await pool.query(
      'UPDATE usuario SET usuario = ?, senha = ?, tipo = ?, id_pessoa = ? WHERE id_usuario = ?',
      [data.usuario, data.senha, data.tipo, data.id_pessoa || null, id]
    );
  } else {
    await pool.query(
      'UPDATE usuario SET usuario = ?, tipo = ?, id_pessoa = ? WHERE id_usuario = ?',
      [data.usuario, data.tipo, data.id_pessoa || null, id]
    );
  }
}

async function deleteUsuario(id) {
  await pool.query('DELETE FROM usuario WHERE id_usuario = ?', [id]);
}

async function checkDuplicate(username, excludeId) {
  const [rows] = await pool.query(
    'SELECT id_usuario FROM usuario WHERE usuario = ? AND id_usuario != ?',
    [username, excludeId || 0]
  );
  return rows.length > 0;
}

module.exports = {
  getUserByUsernameAndPassword,
  getAllUsuarios,
  getUsuarioById,
  insertUsuario,
  updateUsuario,
  deleteUsuario,
  checkDuplicate
};
