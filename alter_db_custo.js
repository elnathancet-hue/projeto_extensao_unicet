const pool = require('./db');
async function run() {
  try {
    await pool.query('ALTER TABLE projeto_custo ADD COLUMN fonte_recurso VARCHAR(255) DEFAULT NULL');
    console.log('Coluna fonte_recurso adicionada com sucesso!');
  } catch (e) {
    if (e.code === 'ER_DUP_FIELDNAME') {
      console.log('A coluna fonte_recurso já existe.');
    } else {
      console.error(e);
    }
  }
  process.exit();
}
run();
