// pessoaModel.js
const pool = require('../db');

// Lista todos os projetos de extensao com os principais campos da tabela
async function getAllpessoas() {
  try {
  const [pessoas] = await pool.query(
    'SELECT p.id_pessoa, p.nome, p.cpf, p.email, p.telefone, p.id_tipo_pessoa, COALESCE(tp.descricao, "-") AS tipo_nome FROM pessoa p LEFT JOIN tipo_pessoa tp ON p.id_tipo_pessoa = tp.id_tipo_pessoa'
  );
  return pessoas;
  }
  catch(error){
    throw error;
  }
}

async function getpessoasByNome(nome)  {
  try {
  const [pessoas] = await pool.query(
    'SELECT * FROM pessoa WHERE nome LIKE ? ORDER BY id_pessoa DESC',
    [`%${nome}%`]
  );
  return pessoas;
  } catch (error) {
 throw error;
 }
}

async function getpessoasByNomedelete(nome)  {
  try {
  const [pessoas] = await pool.query(
    'SELECT * FROM pessoa WHERE nome = ? ORDER BY id_pessoa DESC',
    [nome]
  );
 return pessoas;
  } catch (error) {
 throw error;
 }
}

async function insertpessoas(registro) {
  try {
  await pool.query(
    'INSERT INTO pessoa (nome, cpf, email, telefone, id_tipo_pessoa) VALUES (?, ?, ?, ?, ?)',
    [
      registro.nome ?? null,
      registro.cpf ?? null,
      registro.email ?? null,
      registro.telefone ?? null,
      registro.id_tipo_pessoa ?? null,
    ]
  );

  const termoBusca = registro.nome ?? '';
  const [pessoas] = await pool.query(
    'SELECT * FROM pessoa WHERE nome LIKE ? ORDER BY id_pessoa DESC',
    [`%${termoBusca}%`]
  );
  return pessoas;
 } catch (error) {
 throw error;
 }
}

async function getpessoasById(id)  {
 try {
 const [pessoas] = await pool.query(
    'SELECT * FROM pessoa WHERE id_pessoa = ?',
    [id]
  );
  return pessoas[0];
 } catch (error) {
 throw error;
 }
} 

async function deletepessoas(id) {
  try {
  await pool.query(
    'DELETE FROM pessoa WHERE id_pessoa = ?',
    [id]
  );
} catch (error) {
 throw error;
}
}

async function updatepessoas(id, registro) {
  try {
  await pool.query(
    'UPDATE pessoa SET nome = ?, cpf = ?, email = ?, telefone = ?, id_tipo_pessoa = ? WHERE id_pessoa = ?',
    [
      registro.nome ?? null,
      registro.cpf ?? null,
      registro.email ?? null,
      registro.telefone ?? null,
      registro.id_tipo_pessoa ?? null,
      id
    ]
  );

  return await getpessoasById(id);    
} catch (error) {
 throw error;
}
}

async function filterpessoa(filters) {
  let sql = 'SELECT id_pessoa, nome, cpf, email, telefone, id_tipo_pessoa FROM pessoa';
  const conditions = [];
  const params = [];
  if (filters.nome) { conditions.push('nome LIKE ?'); params.push('%' + filters.nome + '%'); }
  if (filters.cpf) { conditions.push('cpf LIKE ?'); params.push('%' + filters.cpf + '%'); }
  if (filters.email) { conditions.push('email LIKE ?'); params.push('%' + filters.email + '%'); }
  if (filters.id_tipo_pessoa) { conditions.push('id_tipo_pessoa = ?'); params.push(filters.id_tipo_pessoa); }
  if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
  sql += ' ORDER BY id_pessoa DESC';
  const [rows] = await pool.query(sql, params);
  return rows;
}

module.exports = {
  getAllpessoas,
  getpessoasByNome,
  getpessoasByNomedelete,
  insertpessoas,
  getpessoasById,
  deletepessoas,
  updatepessoas,
  filterpessoa
};
