const pool = require('./db');

async function test() {
  const [rows] = await pool.query('SELECT periodo_inicio FROM Projeto_Extensao LIMIT 1');
  if (rows.length) {
    const d = rows[0].periodo_inicio;
    console.log('Type of periodo_inicio:', typeof d);
    console.log('Is Date?', d instanceof Date);
    console.log('Value:', d);
    if (d) {
       console.log('Date toString:', typeof d === 'string' ? d : d.toString());
       console.log('Date toISOString:', typeof d === 'string' ? d : d.toISOString());
    }
  } else {
    console.log('No rows');
  }
  process.exit();
}

test();
