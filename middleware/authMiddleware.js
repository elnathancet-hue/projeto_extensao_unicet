// middleware/authMiddleware.js

// Verifica se o usuario está autenticado
const authMiddleware = (req, res, next) => {
  if (!req.session || !req.session.usuario) {
    return res.redirect('/login');
  }
  next();
};

// Verifica se o usuario tem um dos perfis permitidos
// Uso: authorize('admin', 'coordenador')
function authorize(...perfisPermitidos) {
  return (req, res, next) => {
    if (!req.session || !req.session.usuario) {
      return res.redirect('/login');
    }
    const tipoPerfil = (req.session.tipo || '').toLowerCase();
    if (perfisPermitidos.length > 0 && !perfisPermitidos.includes(tipoPerfil)) {
      return res.status(403).render('error', {
        message: 'Acesso negado. Você não tem permissão para acessar esta funcionalidade.',
        returnLink: '/logo'
      });
    }
    next();
  };
}

module.exports = { authMiddleware, authorize };
