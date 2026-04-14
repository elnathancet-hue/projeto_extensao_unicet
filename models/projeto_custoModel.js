// projeto_custoModel.js gerado automaticamente para a tabela projeto_custo.

const pool = require('../db');

const baseSelect = "SELECT c.Id, c.id_projeto, c.descricao, c.quantitativo, c.valor_unitario, c.justificativa, c.realizado, c.tipo, c.fonte_recurso, p.titulo AS projeto_titulo FROM projeto_custo c LEFT JOIN projeto_extensao p ON c.id_projeto = p.id_projeto";

async function runQuery(sql, params = []) {
  const [rows] = await pool.query(sql, params);
  return rows;
}

async function getAllprojeto_custo() {
  try {
    return await runQuery(baseSelect);
  } catch (error) {
    throw error;
  }
}

async function getprojeto_custoByNome(nome) {
  try {
    return await runQuery(
      `${baseSelect} WHERE c.descricao LIKE ? ORDER BY c.Id DESC`,
      [`%${nome}%`]
    );
  } catch (error) {
    throw error;
  }
}

async function getprojeto_custoByProjetoId(id_projeto) {
  try {
    return await runQuery(
      `${baseSelect} WHERE c.id_projeto = ? ORDER BY c.Id DESC`,
      [id_projeto]
    );
  } catch (error) {
    throw error;
  }
}

async function getprojeto_custoByNomedelete(nome) {
  try {
    const registros = await runQuery(
      `${baseSelect} WHERE c.descricao = ? ORDER BY c.Id DESC`,
      [nome]
    );
    return registros[0];
  } catch (error) {
    throw error;
  }
}

async function insertprojeto_custo(registro) {
  try {
    await runQuery(
      'INSERT INTO projeto_custo (id_projeto, descricao, quantitativo, valor_unitario, justificativa, realizado, tipo, fonte_recurso) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        registro['id_projeto'] ?? null,
        registro['descricao'] ?? null,
        registro['quantitativo'] ?? null,
        registro['valor_unitario'] ?? null,
        registro['justificativa'] ?? null,
        registro['realizado'] ?? null,
        registro['tipo'] ?? null,
        registro['fonte_recurso'] ?? null
      ]
    );
    const termoBusca = registro['descricao'] ?? '';
    return await getprojeto_custoByNome(termoBusca);
  } catch (error) {
    throw error;
  }
}

async function getprojeto_custoById(id) {
  try {
    const registros = await runQuery(`${baseSelect} WHERE c.Id = ?`, [id]);
    return registros[0];
  } catch (error) {
    throw error;
  }
}

async function deleteprojeto_custo(id) {
  try {
    await runQuery('DELETE FROM projeto_custo WHERE Id = ?', [id]);
  } catch (error) {
    throw error;
  }
}

async function updateprojeto_custo(id, registro) {
  try {
    await runQuery(
      'UPDATE projeto_custo SET id_projeto = ?, descricao = ?, quantitativo = ?, valor_unitario = ?, justificativa = ?, realizado = ?, tipo = ?, fonte_recurso = ? WHERE Id = ?',
      [
        registro['id_projeto'] ?? null,
        registro['descricao'] ?? null,
        registro['quantitativo'] ?? null,
        registro['valor_unitario'] ?? null,
        registro['justificativa'] ?? null,
        registro['realizado'] ?? null,
        registro['tipo'] ?? null,
        registro['fonte_recurso'] ?? null,
        id
      ]
    );
    return await getprojeto_custoById(id);
  } catch (error) {
    throw error;
  }
}

async function filterprojeto_custo(filters) {
  let sql = baseSelect;
  const conditions = [];
  const params = [];
  if (filters.id_projeto) { conditions.push('c.id_projeto = ?'); params.push(filters.id_projeto); }
  if (filters.descricao) { conditions.push('c.descricao LIKE ?'); params.push('%' + filters.descricao + '%'); }
  if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
  sql += ' ORDER BY c.Id DESC';
  return await runQuery(sql, params);
}

module.exports = {
  getAllprojeto_custo,
  getprojeto_custoByNome,
  getprojeto_custoByNomedelete,
  insertprojeto_custo,
  getprojeto_custoById,
  getprojeto_custoByProjetoId,
  deleteprojeto_custo,
  updateprojeto_custo,
  filterprojeto_custo
};