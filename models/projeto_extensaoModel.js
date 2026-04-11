const pool = require('../db');

async function getAllprojeto_extensaos() {
  const [rows] = await pool.query(`
    SELECT 
      id_projeto,
      titulo,
      id_tipo_plano,
      coordenador_id,
      periodo_inicio,
      periodo_fim,
      carga_horaria_total,
      id_publico_alvo,
      objetivo,
      metodologia
    FROM Projeto_Extensao
    ORDER BY id_projeto DESC
  `);
  return rows;
}

async function getprojeto_extensaosByNome(nome) {
  const [rows] = await pool.query(
    'SELECT * FROM Projeto_Extensao WHERE titulo LIKE ? ORDER BY id_projeto DESC',
    [`%${nome}%`]
  );
  return rows;
}

async function getprojeto_extensaosById(id) {
  const [rows] = await pool.query(
    'SELECT * FROM Projeto_Extensao WHERE id_projeto = ?',
    [id]
  );
  return rows[0];
}

async function insertprojeto_extensaos(registro) {
  const [result] = await pool.query(
    `INSERT INTO Projeto_Extensao
      (titulo, id_tipo_plano, coordenador_id, periodo_inicio, periodo_fim, carga_horaria_total, id_publico_alvo, objetivo, metodologia)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      registro.titulo ?? null,
      registro.id_tipo_plano ?? null,
      registro.coordenador_id ?? null, // pode ficar null
      registro.periodo_inicio ?? null,
      registro.periodo_fim ?? null,
      registro.carga_horaria_total ?? null,
      registro.id_publico_alvo ?? null,
      registro.objetivo ?? null,
      registro.metodologia ?? null
    ]
  );

  return result.insertId;
}

async function updateprojeto_extensaos(id, registro) {
  await pool.query(
    `UPDATE Projeto_Extensao
     SET
       titulo = ?,
       id_tipo_plano = ?,
       coordenador_id = ?,
       periodo_inicio = ?,
       periodo_fim = ?,
       carga_horaria_total = ?,
       id_publico_alvo = ?,
       objetivo = ?,
       metodologia = ?
     WHERE id_projeto = ?`,
    [
      registro.titulo ?? null,
      registro.id_tipo_plano ?? null,
      registro.coordenador_id ?? null, // pode ficar null
      registro.periodo_inicio ?? null,
      registro.periodo_fim ?? null,
      registro.carga_horaria_total ?? null,
      registro.id_publico_alvo ?? null,
      registro.objetivo ?? null,
      registro.metodologia ?? null,
      id
    ]
  );

  return getprojeto_extensaosById(id);
}

async function deleteprojeto_extensaos(id) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query('DELETE FROM avaliacao_institucional WHERE id_projeto = ?', [id]);
    await connection.query('DELETE FROM avaliacao_participante WHERE id_projeto = ?', [id]);
    await connection.query('DELETE FROM projeto_curso WHERE id_projeto = ?', [id]);
    await connection.query('DELETE FROM projeto_custo WHERE id_projeto = ?', [id]);
    await connection.query('DELETE FROM projeto_instituicao WHERE id_projeto = ?', [id]);
    await connection.query('DELETE FROM projeto_linhaprogramatica WHERE id_projeto = ?', [id]);
    await connection.query('DELETE FROM projeto_local WHERE id_projeto = ?', [id]);
    await connection.query('DELETE FROM projeto_pessoa WHERE id_projeto = ?', [id]);
    await connection.query('DELETE FROM projeto_tipoacao WHERE id_projeto = ?', [id]);

    await connection.query('DELETE FROM Projeto_Extensao WHERE id_projeto = ?', [id]);

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

/* ===== Relacionamentos de Tipo de Ação ===== */

async function getTipoAcaoByProjeto(id_projeto) {
  const [rows] = await pool.query(
    'SELECT * FROM Projeto_TipoAcao WHERE id_projeto = ?',
    [id_projeto]
  );
  return rows;
}

async function updateTipoAcaoProjeto(id_projeto, itens) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query(
      'DELETE FROM Projeto_TipoAcao WHERE id_projeto = ?',
      [id_projeto]
    );

    if (itens?.length) {
      for (const item of itens) {
        await connection.query(
          'INSERT INTO Projeto_TipoAcao (id_projeto, id_acao) VALUES (?, ?)',
          [id_projeto, item.id_acao]
        );
      }
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

/* ===== Relacionamentos de Linha Programática ===== */

async function getLinhaProgramaticaByProjeto(id_projeto) {
  const [rows] = await pool.query(
    'SELECT * FROM Projeto_LinhaProgramatica WHERE id_projeto = ?',
    [id_projeto]
  );
  return rows;
}

async function updateLinhaProgramaticaProjeto(id_projeto, itens) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query(
      'DELETE FROM Projeto_LinhaProgramatica WHERE id_projeto = ?',
      [id_projeto]
    );

    if (itens?.length) {
      for (const item of itens) {
        await connection.query(
          'INSERT INTO Projeto_LinhaProgramatica (id_projeto, id_linha) VALUES (?, ?)',
          [id_projeto, item.id_linha]
        );
      }
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

/* ===== Cursos do projeto ===== */

async function getCursosByProjeto(id_projeto) {
  const [rows] = await pool.query(
    'SELECT * FROM Projeto_Curso WHERE id_projeto = ?',
    [id_projeto]
  );
  return rows;
}

async function updateCursosProjeto(id_projeto, cursos) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query(
      'DELETE FROM Projeto_Curso WHERE id_projeto = ?',
      [id_projeto]
    );

    if (cursos?.length) {
      for (const item of cursos) {
        await connection.query(
          'INSERT INTO Projeto_Curso (id_projeto, id_curso) VALUES (?, ?)',
          [id_projeto, item.cursoId]
        );
      }
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function getPessoasByProjeto(id_projeto) {
  const [rows] = await pool.query(
      'SELECT * FROM Projeto_Pessoa WHERE id_projeto = ?',
      [id_projeto]
    );
    return rows;
  }
  
  async function updatePessoasProjeto(id_projeto, cursos, idPapelProfessor) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
  
      await connection.query(
        'DELETE FROM Projeto_Pessoa WHERE id_projeto = ? AND id_papel = ?',
        [id_projeto, idPapelProfessor]
      );
  
      if (cursos?.length) {
        const pessoasJaInseridas = new Set();
  
        for (const item of cursos) {
          if (item.professores?.length) {
            for (const id_pessoa of item.professores) {
              const chave = `${id_projeto}-${id_pessoa}-${idPapelProfessor}`;
  
              if (!pessoasJaInseridas.has(chave)) {
                await connection.query(
                  'INSERT INTO Projeto_Pessoa (id_projeto, id_pessoa, id_papel) VALUES (?, ?, ?)',
                  [id_projeto, id_pessoa, idPapelProfessor]
                );
                pessoasJaInseridas.add(chave);
              }
            }
          }
        }
      }
  
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

module.exports = {
  getAllprojeto_extensaos,
  getprojeto_extensaosByNome,
  getprojeto_extensaosById,
  insertprojeto_extensaos,
  updateprojeto_extensaos,
  deleteprojeto_extensaos,
  getTipoAcaoByProjeto,
  updateTipoAcaoProjeto,
  getLinhaProgramaticaByProjeto,
  updateLinhaProgramaticaProjeto,
  getCursosByProjeto,
  updateCursosProjeto,
  getPessoasByProjeto,
  updatePessoasProjeto
};