// routes/curso.js
const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');

// 1. Rota principal: Lista todos os cursos
router.get('/', cursoController.listcursos);

// 2. Rota para exibir o formulário de NOVO curso
// Note que passamos um objeto vazio para não dar erro no EJS
router.get('/forms/curso', (req, res) => {
    res.render('forms/curso', { 
        curso: { id_curso: '', nome_curso: '' }, 
        isEdit: false 
    });
});

// 3. Rota para processar o cadastro de um novo curso
router.post('/cadastrar', cursoController.addcurso);

// 4. Rota para filtrar cursos por nome (Busca)
router.post('/filtro', cursoController.filtercurso);

// 5. Rota para exibir a página de EDIÇÃO (carrega os dados atuais)
router.get('/:id/edit', cursoController.showEditForm);

// 6. Rota para processar a atualização (POST enviado pelo formulário de edição)
router.post('/:id/edit', cursoController.editcurso);

// 7. Rota para processar a EXCLUSÃO
// Esta é a rota que resolve o erro "Cannot GET /delete"
router.post('/:id/delete', cursoController.deletecurso);

// 8. Rota opcional: Exibe detalhes de um curso específico
router.get('/:id', cursoController.showcurso);

module.exports = router;