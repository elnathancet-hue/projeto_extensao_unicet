const pool = require('../db');

async function getAllinha_programatica() {
  try {
    const [registros] = await pool.query(
      'SELECT id_linha, nome FROM linha_programatica ORDER BY id_linha DESC'
    );
    return registros;
  } catch (error) {
    throw error;
  }
}

async function getlinha_programaticaByNome(nome) {
  try {
    const [registros] = await pool.query(
      'SELECT * FROM linha_programatica WHERE nome LIKE ? ORDER BY id_linha DESC',
      [`%${nome}%`]
    );
    return registros;
  } catch (error) {
    throw error;
  }
}

async function getlinha_programaticaById(id) {
  try {
    const [registros] = await pool.query(
      'SELECT * FROM linha_programatica WHERE id_linha = ?',
      [id]
    );
    return registros[0];
  } catch (error) {
    throw error;
  }
}

async function insertlinha_programatica(nome) {
  try {
    await pool.query(
      'INSERT INTO linha_programatica (nome) VALUES (?)',
      [nome]
    );

    const [registros] = await pool.query(
      'SELECT * FROM linha_programatica WHERE nome LIKE ? ORDER BY id_linha DESC',
      [`%${nome}%`]
    );

    return registros;
  } catch (error) {
    throw error;
  }
}

async function updatelinha_programatica(id, nome) {
  try {
    await pool.query(
      'UPDATE linha_programatica SET nome = ? WHERE id_linha = ?',
      [nome, id]
    );
  } catch (error) {
    throw error;
  }
}

async function deletelinha_programatica(id) {
  try {
    await pool.query(
      'DELETE FROM linha_programatica WHERE id_linha = ?',
      [id]
    );
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllinha_programatica,
  getlinha_programaticaByNome,
  getlinha_programaticaById,
  insertlinha_programatica,
  updatelinha_programatica,
  deletelinha_programatica
};