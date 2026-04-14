const pool = require('../db');

async function getAlltipo_acao() {
  try {
    const [registros] = await pool.query(
      'SELECT id_acao, nome FROM tipo_acao ORDER BY id_acao DESC'
    );
    return registros;
  } catch (error) {
    throw error;
  }
}

async function gettipo_acaoByNome(nome) {
  try {
    const [registros] = await pool.query(
      'SELECT * FROM tipo_acao WHERE nome LIKE ? ORDER BY id_acao DESC',
      [`%${nome}%`]
    );
    return registros;
  } catch (error) {
    throw error;
  }
}

async function gettipo_acaoById(id) {
  try {
    const [registros] = await pool.query(
      'SELECT * FROM tipo_acao WHERE id_acao = ?',
      [id]
    );
    return registros[0];
  } catch (error) {
    throw error;
  }
}

async function inserttipo_acao(nome) {
  try {
    await pool.query(
      'INSERT INTO tipo_acao (nome) VALUES (?)',
      [nome]
    );

    const [registros] = await pool.query(
      'SELECT * FROM tipo_acao WHERE nome LIKE ? ORDER BY id_acao DESC',
      [`%${nome}%`]
    );

    return registros;
  } catch (error) {
    throw error;
  }
}

async function updatetipo_acao(id, nome) {
  try {
    await pool.query(
      'UPDATE tipo_acao SET nome = ? WHERE id_acao = ?',
      [nome, id]
    );
  } catch (error) {
    throw error;
  }
}

async function deletetipo_acao(id) {
  try {
    await pool.query(
      'DELETE FROM tipo_acao WHERE id_acao = ?',
      [id]
    );
  } catch (error) {
    throw error;
  }
}
async function getAlltipo_acao() {
  const [registros] = await pool.query(
    'SELECT id_acao AS id_tipo_acao, nome FROM tipo_acao ORDER BY id_acao DESC'
  );
  return registros;
}

async function gettipo_acaoByNome(nome) {
  const [registros] = await pool.query(
    'SELECT id_acao AS id_tipo_acao, nome FROM tipo_acao WHERE nome LIKE ? ORDER BY id_acao DESC',
    [`%${nome}%`]
  );
  return registros;
}

async function gettipo_acaoById(id) {
  const [registros] = await pool.query(
    'SELECT id_acao AS id_tipo_acao, nome FROM tipo_acao WHERE id_acao = ?',
    [id]
  );
  return registros[0];
}
module.exports = {
  getAlltipo_acao,
  gettipo_acaoByNome,
  gettipo_acaoById,
  inserttipo_acao,
  updatetipo_acao,
  deletetipo_acao
};