const pool = require('./db');
const controller = require('./controllers/projeto_extensaoController');

async function test() {
  try {
    const req = {
      params: { id: 10 },
      body: {
        titulo: 'Título Atualizado Teste',
        id_tipo_plano: '1',
        periodo_inicio: '2024-01-01',
        periodo_fim: '2024-12-31',
        carga_horaria_total: '100',
        id_publico_alvo: '1',
        objetivo: 'Objetivo teste',
        metodologia: 'Metodologia teste',
        dadosCursos: '[]'
      }
    };
    
    let rendered = null;
    const res = {
      redirect: (url) => { console.log('Simulated redirect to', url); },
      render: (view, cfg) => { rendered = { view, cfg }; console.log('Simulated render:', view, cfg.message); },
      status: (c) => ({ send: (msg) => console.log('Status', c, msg) })
    };
    
    await controller.editprojeto_extensao(req, res);
    
    console.log('Update finished.');
  } catch (err) {
    console.error('Fatal Test Error:', err);
  }
  process.exit();
}
test();
