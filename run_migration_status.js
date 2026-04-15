// Migration: status + RBAC
// Pode ser executado manualmente: node run_migration_status.js
// Ou chamado pelo server.js na inicialização
require('dotenv').config();
const mysql = require('mysql2/promise');

async function runMigration(poolOrConfig) {
  let conn;
  if (poolOrConfig && poolOrConfig.execute) {
    conn = poolOrConfig;
  } else {
    conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });
  }

  const queries = [
    `ALTER TABLE projeto_extensao ADD COLUMN status ENUM('rascunho','em_avaliacao','aprovado','rejeitado','em_execucao','concluido') NOT NULL DEFAULT 'rascunho' AFTER metodologia`,
    `ALTER TABLE projeto_extensao ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER status`,
    `ALTER TABLE projeto_extensao ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at`,
    `ALTER TABLE usuario ADD COLUMN id_pessoa INT NULL AFTER tipo`,
  ];

  for (const q of queries) {
    try {
      await conn.execute(q);
      console.log('[migration] OK:', q.substring(0, 70) + '...');
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME' || err.message.includes('Duplicate column')) {
        // Coluna já existe, ok
      } else {
        console.warn('[migration] skip:', err.message.substring(0, 80));
      }
    }
  }

  // FK pode falhar por nome duplicada
  try {
    await conn.execute(`ALTER TABLE usuario ADD CONSTRAINT fk_usuario_pessoa FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa) ON DELETE SET NULL`);
  } catch (e) { /* já existe */ }

  console.log('[migration] Status + RBAC migration complete.');

  if (!poolOrConfig || !poolOrConfig.execute) {
    await conn.end();
  }
}

// Se executado diretamente
if (require.main === module) {
  runMigration().catch(console.error);
}

module.exports = runMigration;
