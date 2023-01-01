const { request, response } = require("express");

const usuariosGet = (req = request, res = response) => {
  const { q = "", nombre = "", limit = 10, page = 1 } = req.query;
  res.json({
    msg: "get API - controlador",
  });
};

const usuariosPost = (req, res) => {
  const { nombre, apellido } = req.body || {};

  res.json({
    msg: "post API",
    body: {
      nombre,
      apellido,
    },
  });
};

const usuariosPut = (req, res) => {
  const { id } = req.params;

  res.json({
    id,
    msg: "put API",
  });
};

const usuariosPatch = (req, res) => {
  res.json({
    msg: "patch API",
  });
};

const usuariosDelete = (req, res) => {
  res.json({
    msg: "delete API",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
