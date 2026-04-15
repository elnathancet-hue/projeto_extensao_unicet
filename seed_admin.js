// Seed: Criar usuário admin padrão se não existir
// Roda automaticamente no boot do servidor
require('dotenv').config();

async function seedAdmin(pool) {
  try {
    // Verificar se já existe algum admin
    const [admins] = await pool.query("SELECT id_usuario FROM usuario WHERE tipo = 'admin' LIMIT 1");
    if (admins.length > 0) {
      return; // Já existe admin, não precisa criar
    }

    // Criar admin padrão
    await pool.query(
      "INSERT INTO usuario (usuario, senha, tipo) VALUES (?, ?, ?)",
      ['admin', 'admin123', 'admin']
    );
    console.log('[seed] Usuário admin criado (login: admin / senha: admin123)');

    // Criar coordenador de exemplo se não existir
    const [coords] = await pool.query("SELECT id_usuario FROM usuario WHERE tipo = 'coordenador' LIMIT 1");
    if (coords.length === 0) {
      await pool.query(
        "INSERT INTO usuario (usuario, senha, tipo) VALUES (?, ?, ?)",
        ['coordenador', 'coord123', 'coordenador']
      );
      console.log('[seed] Usuário coordenador criado (login: coordenador / senha: coord123)');
    }

    // Garantir que usuários existentes tenham tipo 'professor' se estiver null
    await pool.query("UPDATE usuario SET tipo = 'professor' WHERE tipo IS NULL OR tipo = ''");

  } catch (err) {
    // Silenciar erro se tabela não existe ainda
    if (err.code !== 'ER_NO_SUCH_TABLE') {
      console.warn('[seed] Aviso:', err.message);
    }
  }
}

// Se executado diretamente
if (require.main === module) {
  const mysql = require('mysql2/promise');
  (async () => {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });
    await seedAdmin(conn);
    await conn.end();
    console.log('[seed] Concluído.');
  })().catch(console.error);
}

module.exports = seedAdmin;
