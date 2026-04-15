//  server.js

const express = require('express')
const path = require('path')
const session = require('express-session')
const app = express()
const port = process.env.PORT || 3000

// Middleware para analisar o corpo das solicitações
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Configurar sessão
app.use(
  session({
    secret: 'seu-secret-key-mude-em-producao',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24
    }
  })
)

// Middleware para injetar dados da sessão em todas as views
app.use((req, res, next) => {
  res.locals.sessionUsuario = req.session ? req.session.usuario : null;
  res.locals.sessionTipo = req.session ? req.session.tipo : null;
  res.locals.currentPath = req.path;
  next();
});

// Configurando o Express para usar EJS como mecanismo de modelo
app.set('view engine', 'ejs')

// Middleware para servir arquivos estáticos
app.use(express.static('public'))
app.use('/css', express.static(path.join(__dirname, 'views', 'css')))
app.use('/imagens', express.static(path.join(__dirname, 'views', 'imagens')))

// Middleware para registrar as rotas
const indexRouter = require('./routes/index')
app.use('/', indexRouter)

const questionarioRouter = require('./routes/questionarioRouter'); 
app.use('/questionario', questionarioRouter);

// Middleware para lidar com erros
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Algo deu errado!')
})

// Executar migrations e seed na inicialização
const runMigration = require('./run_migration_status');
const seedAdmin = require('./seed_admin');
const pool = require('./db');

(async () => {
  try {
    const conn = await pool.getConnection();
    await runMigration(conn);
    conn.release();
    await seedAdmin(pool);
  } catch (err) {
    console.warn('[startup] Não foi possível executar migration/seed:', err.message);
  }
})();

// Iniciando o servidor
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port http://localhost:${port}/logo`)
})
