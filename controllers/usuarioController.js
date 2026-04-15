// controllers/usuarioController.js
const usuarioModel = require('../models/usuarioModel');

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await usuarioModel.getUserByUsernameAndPassword(username, password);

    if (user) {
      req.session.usuario = user.usuario;
      req.session.tipo = user.tipo;
      req.session.id_usuario = user.id_usuario;
      res.redirect('/logo');
    } else {
      res.redirect('/login?erro=Credenciais inválidas');
    }
  } catch (error) {
    console.error('Erro durante a autenticação:', error);
    res.status(500).send('Erro durante a autenticação');
  }
}

async function welcome(req, res) {
  const { username, tipo } = req.query;
  res.render('welcome', { usuario: username, tipo: tipo });
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erro ao fazer logout:', err);
      return res.status(500).send('Erro ao fazer logout');
    }
    res.redirect('/login');
  });
}

// ===== CRUD DE USUARIOS (admin only) =====

async function listUsuarios(req, res) {
  try {
    const usuarios = await usuarioModel.getAllUsuarios();
    res.render('consultas/usuarios', { dados: usuarios });
  } catch (error) {
    console.error('Erro ao listar usuarios:', error);
    res.render('error', { message: 'Erro ao listar usuários', returnLink: '/logo' });
  }
}

async function showCreateForm(req, res) {
  try {
    const pessoaModel = require('../models/pessoaModel');
    const pessoas = await pessoaModel.getAllpessoas();
    res.render('forms/usuario', { usuario_edit: {}, isEdit: false, pessoas });
  } catch (error) {
    console.error('Erro ao carregar form usuario:', error);
    res.render('error', { message: 'Erro ao carregar formulário', returnLink: '/usuarios' });
  }
}

async function addUsuario(req, res) {
  try {
    const { usuario, senha, tipo, id_pessoa } = req.body;

    // Verificar duplicidade
    const duplicado = await usuarioModel.checkDuplicate(usuario);
    if (duplicado) {
      return res.render('error', {
        message: 'Já existe um usuário com este login. Escolha outro.',
        returnLink: '/usuarios/forms/usuario'
      });
    }

    await usuarioModel.insertUsuario({ usuario, senha, tipo, id_pessoa: id_pessoa || null });
    res.redirect('/usuarios');
  } catch (error) {
    console.error('Erro ao criar usuario:', error);
    res.render('error', { message: 'Erro ao criar usuário', returnLink: '/usuarios' });
  }
}

async function showEditForm(req, res) {
  try {
    const usuario_edit = await usuarioModel.getUsuarioById(req.params.id);
    if (!usuario_edit) return res.status(404).render('error', { message: 'Usuário não encontrado', returnLink: '/usuarios' });

    const pessoaModel = require('../models/pessoaModel');
    const pessoas = await pessoaModel.getAllpessoas();
    res.render('forms/usuario', { usuario_edit, isEdit: true, pessoas });
  } catch (error) {
    console.error('Erro ao carregar form edição usuario:', error);
    res.render('error', { message: 'Erro ao carregar formulário', returnLink: '/usuarios' });
  }
}

async function editUsuario(req, res) {
  try {
    const { usuario, senha, tipo, id_pessoa } = req.body;
    const id = req.params.id;

    const duplicado = await usuarioModel.checkDuplicate(usuario, id);
    if (duplicado) {
      return res.render('error', {
        message: 'Já existe outro usuário com este login.',
        returnLink: '/usuarios/' + id + '/edit'
      });
    }

    await usuarioModel.updateUsuario(id, { usuario, senha, tipo, id_pessoa: id_pessoa || null });
    res.redirect('/usuarios');
  } catch (error) {
    console.error('Erro ao editar usuario:', error);
    res.render('error', { message: 'Erro ao editar usuário', returnLink: '/usuarios' });
  }
}

async function deleteUsuario(req, res) {
  try {
    await usuarioModel.deleteUsuario(req.params.id);
    res.redirect('/usuarios');
  } catch (error) {
    console.error('Erro ao excluir usuario:', error);
    res.render('error', { message: 'Erro ao excluir usuário', returnLink: '/usuarios' });
  }
}

module.exports = { login, welcome, logout, listUsuarios, showCreateForm, addUsuario, showEditForm, editUsuario, deleteUsuario };
