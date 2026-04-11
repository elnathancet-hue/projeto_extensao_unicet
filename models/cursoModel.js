const pool = require('../db');

async function getAllCursos() {
  try {
    const [cursos] = await pool.query(`
      SELECT id_curso, nome_curso, coordenador_id
      FROM Curso
      ORDER BY nome_curso
    `);
    return cursos;
  } catch (error) {
    throw error;
  }
}

async function getCursoByNome(nome) {
  try {
    const [cursos] = await pool.query(
      'SELECT * FROM Curso WHERE nome_curso LIKE ? ORDER BY id_curso DESC',
      [`%${nome}%`]
    );
    return cursos;
  } catch (error) {
    throw error;
  }
}

async function getCursoByNomeDelete(nome) {
  try {
    const [cursos] = await pool.query(
      'SELECT * FROM Curso WHERE nome_curso = ? ORDER BY id_curso DESC',
      [nome]
    );
    return cursos[0];
  } catch (error) {
    throw error;
  }
}

async function insertCurso(nome_curso, coordenador_id = null) {
  try {
    const [result] = await pool.query(
      'INSERT INTO Curso (nome_curso, coordenador_id) VALUES (?, ?)',
      [nome_curso, coordenador_id]
    );

    return result.insertId;
  } catch (error) {
    throw error;
  }
}

async function getCursoById(id) {
  try {
    const [curso] = await pool.query(
      'SELECT * FROM Curso WHERE id_curso = ?',
      [id]
    );
    return curso[0];
  } catch (error) {
    throw error;
  }
}

async function deleteCurso(id) {
  try {
    await pool.query('DELETE FROM Curso WHERE id_curso = ?', [id]);
  } catch (error) {
    throw error;
  }
}

async function updateCurso(id, nome_curso, coordenador_id = null) {
  try {
    await pool.query(
      'UPDATE Curso SET nome_curso = ?, coordenador_id = ? WHERE id_curso = ?',
      [nome_curso, coordenador_id, id]
    );
  } catch (error) {
    throw error;
  }
}

/* ===== NOVAS FUNÇÕES ===== */

async function getProfessoresByCurso(id_curso) {
  try {
    const [rows] = await pool.query(`
      SELECT p.id_pessoa, p.nome
      FROM Curso_Pessoa cp
      INNER JOIN Pessoa p ON p.id_pessoa = cp.id_pessoa
      WHERE cp.id_curso = ?
      ORDER BY p.nome
    `, [id_curso]);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getCursoComEquipeById(id_curso) {
  try {
    const [rows] = await pool.query(`
      SELECT
        c.id_curso,
        c.nome_curso,
        c.coordenador_id,
        coord.nome AS coordenador_nome
      FROM Curso c
      LEFT JOIN Pessoa coord ON coord.id_pessoa = c.coordenador_id
      WHERE c.id_curso = ?
    `, [id_curso]);

    const curso = rows[0];
    if (!curso) return null;

    const professores = await getProfessoresByCurso(id_curso);

    return {
      id: curso.id_curso,
      nome: curso.nome_curso,
      coordenador: curso.coordenador_id
        ? {
            id: curso.coordenador_id,
            nome: curso.coordenador_nome
          }
        : null,
      professores
    };
  } catch (error) {
    throw error;
  }
}

async function getAllCursosComEquipe() {
  try {
    const [rows] = await pool.query(`
      SELECT
        c.id_curso,
        c.nome_curso,
        c.coordenador_id,
        coord.nome AS coordenador_nome
      FROM Curso c
      LEFT JOIN Pessoa coord ON coord.id_pessoa = c.coordenador_id
      ORDER BY c.nome_curso
    `);

    const cursos = [];

    for (const curso of rows) {
      const professores = await getProfessoresByCurso(curso.id_curso);

      cursos.push({
        id: curso.id_curso,
        nome: curso.nome_curso,
        coordenador: curso.coordenador_id
          ? {
              id: curso.coordenador_id,
              nome: curso.coordenador_nome
            }
          : null,
        professores
      });
    }

    return cursos;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllCursos,
  getCursoByNome,
  getCursoByNomeDelete,
  insertCurso,
  getCursoById,
  deleteCurso,
  updateCurso,
  getProfessoresByCurso,
  getCursoComEquipeById,
  getAllCursosComEquipe
};