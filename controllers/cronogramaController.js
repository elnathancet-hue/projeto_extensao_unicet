//controller do cronograma
const cronogramaModel = require("../models/cronogramaModel");

function mapRequestToRegistro(body) {
  const { numero, etapa, data, hora, local } = body;

  return {
    numero,
    etapa,
    data,
    hora,
    local,
  };
}

// LISTAR
async function listCronograma(req, res) {
  try {
    const filters = {
      etapa: req.query.etapa || '',
      local: req.query.local || ''
    };
    const hasFilter = Object.values(filters).some(v => v);
    const dados = hasFilter ? await cronogramaModel.filterCronograma(filters) : await cronogramaModel.getAllCronograma();
    res.render("consultas/cronograma", { dados, filters });
  } catch (error) {
    console.error("Erro ao buscar cronograma:", error);
    res.render("error", {
      message: "Erro ao buscar cronograma",
      returnLink: "/logo",
    });
  }
}

// CADASTRAR
async function addCronograma(req, res) {
  try {
    await cronogramaModel.insertCronograma(mapRequestToRegistro(req.body));
    res.redirect("/cronograma");
  } catch (error) {
    console.error("Erro ao inserir cronograma:", error);
    res.render("error", {
      message: "Erro ao inserir cronograma",
      returnLink: "/cronograma",
    });
  }
}

// 🔥 MOSTRAR 1
async function showCronograma(req, res) {
  const id = req.params.id;
  try {
    const dado = await cronogramaModel.getCronogramaById(id);
    if (!dado) {
      return res.status(404).send("Cronograma não encontrado");
    }
    res.render("consultas/cronograma", { dados: [dado] });
  } catch (error) {
    console.error("Erro ao buscar cronograma:", error);
    res.render("error", {
      message: "Erro ao buscar cronograma",
      returnLink: "/cronograma",
    });
  }
}

// 🔥 FORM EDITAR
async function showEditForm(req, res) {
  const id = req.params.id;
  try {
    const cronograma = await cronogramaModel.getCronogramaById(id);

    if (!cronograma) {
      return res.status(404).send("Cronograma não encontrado");
    }

    res.render("forms/cronograma", {
      cronograma,
      isEdit: true,
    });
  } catch (error) {
    console.error("Erro ao carregar edição:", error);
    res.render("error", {
      message: "Erro ao carregar edição",
      returnLink: "/cronograma",
    });
  }
}

// 🔥 EDITAR
async function editCronograma(req, res) {
  const id = req.params.id;
  try {
    await cronogramaModel.updateCronograma(id, mapRequestToRegistro(req.body));

    res.redirect("/cronograma");
  } catch (error) {
    console.error("Erro ao editar cronograma:", error);
    res.render("error", {
      message: "Erro ao editar cronograma",
      returnLink: "/cronograma",
    });
  }
}

// 🔥 DELETAR
async function deleteCronograma(req, res) {
  const id = req.params.id;
  try {
    await cronogramaModel.deleteCronograma(id);
    res.redirect("/cronograma");
  } catch (error) {
    console.error("Erro ao deletar cronograma:", error);
    res.render("error", {
      message: "Erro ao deletar cronograma",
      returnLink: "/cronograma",
    });
  }
}

module.exports = {
  listCronograma,
  addCronograma,
  showCronograma,
  showEditForm,
  editCronograma,
  deleteCronograma,
};
