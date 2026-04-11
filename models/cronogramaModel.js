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
      (numero, etapa, data, hora, local) 
      VALUES (?, ?, ?, ?, ?)`,
      [
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

// 🔥 DELETAR
async function deleteCronograma(id) {
  try {
    await pool.query("DELETE FROM cronograma_atividades WHERE id = ?", [id]);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllCronograma,
  getCronogramaById,
  insertCronograma,
  updateCronograma,
  deleteCronograma,
};
