const express = require("express");
const router = express.Router();
const cronogramaController = require("../controllers/cronogramaController");

// LISTAR
router.get("/", cronogramaController.listCronograma);

// FORMULÁRIO (NOVO)
router.get("/forms/cronograma", (req, res) => {
  res.render("forms/cronograma", { isEdit: false });
});

// CADASTRAR
router.post("/cadastrar", cronogramaController.addCronograma);

// 🔥 EDITAR (FORM)
router.get("/:id/edit", cronogramaController.showEditForm);

// 🔥 ATUALIZAR
router.post("/:id/edit", cronogramaController.editCronograma);

// 🔥 VISUALIZAR (opcional)
router.get("/:id", cronogramaController.showCronograma);

// 🔥 DELETAR (opcional)
router.get("/:id/delete", cronogramaController.deleteCronograma);

module.exports = router;
