//model do cronograma
const pool = require("../db");

// LISTAR
async function getAllCronograma() {
  try {
    const [dados] = await pool.query(
      "SELECT * FROM cronograma_atividades ORDER BY id DESC",
    );
    return dados;
  } catch (error) {
    throw error;
  }
}

// 🔥 BUSCAR POR ID
async function getCronogramaById(id) {
  try {
    const [dados] = await pool.query(
      "SELECT * FROM cronograma_atividades WHERE id = ?",
      [id],
    );
    return dados[0];
  } catch (error) {
    throw error;
  }
}

// INSERIR
async function insertCronograma(registro) {
  try {
    await pool.query(
      `INSERT INTO cronograma_atividades
      (id_projeto, numero, etapa, data, hora, local)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        registro.id_projeto ?? null,
        registro.numero ?? null,
        registro.etapa ?? null,
        registro.data ?? null,
        registro.hora ?? null,
        registro.local ?? null,
      ],
    );

    return await getAllCronograma();
  } catch (error) {
    throw error;
  }
}

// 🔥 ATUALIZAR
async function updateCronograma(id, registro) {
  try {
    await pool.query(
      `UPDATE cronograma_atividades
       SET numero = ?, etapa = ?, data = ?, hora = ?, local = ?
       WHERE id = ?`,
      [
        registro.numero ?? null,
        registro.etapa ?? null,
        registro.data ?? null,
        registro.hora ?? null,
        registro.local ?? null,
        id,
      ],
    );

    return await getCronogramaById(id);
  } catch (error) {
    throw error;
  }
}

// BUSCAR POR PROJETO
async function getCronogramaByProjetoId(id_projeto) {
  try {
    const [dados] = await pool.query(
      "SELECT * FROM cronograma_atividades WHERE id_projeto = ? ORDER BY numero",
      [id_projeto],
    );
    return dados;
  } catch (error) {
    throw error;
  }
}

// 🔥 DELETAR
async function deleteCronograma(id) {
  try {
    await pool.query("DELETE FROM cronograma_atividades WHERE id = ?", [id]);
  } catch (error) {
    throw error;
  }
}

async function filterCronograma(filters) {
  let sql = 'SELECT * FROM cronograma_atividades';
  const conditions = [];
  const params = [];
  if (filters.etapa) { conditions.push('etapa LIKE ?'); params.push('%' + filters.etapa + '%'); }
  if (filters.local) { conditions.push('local LIKE ?'); params.push('%' + filters.local + '%'); }
  if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
  sql += ' ORDER BY id DESC';
  const [rows] = await pool.query(sql, params);
  return rows;
}

module.exports = {
  getAllCronograma,
  getCronogramaById,
  getCronogramaByProjetoId,
  insertCronograma,
  updateCronograma,
  deleteCronograma,
  filterCronograma,
};
