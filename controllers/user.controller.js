const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  const query = { estado: true };

  const resp = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  const total = resp[0];
  const usuarios = resp[1];

  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req, res) => {
  const { nombre, correo, password, rol } = req.body || {};

  const usuario = await new Usuario({
    nombre,
    correo,
    password,
    rol,
  });

  // Encriptar la contraseña
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  // Guardar en BD
  await usuario.save();

  res.json(usuario);
};

const usuariosPut = async (req, res) => {
  const { id } = req.params;

  const { _id, password, google, correo, ...rest } = req.body;

  if (password) {
    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, {
    rest,
  });

  res.json(usuario);
};

const usuariosPatch = (req, res) => {
  res.json({
    msg: "patch API",
  });
};

const usuariosDelete = async (req, res) => {
  const { id } = req.params;

  // Fisicamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete(id);

  const usuario = await Usuario.findByIdAndUpdate(id, {
    estado: false,
  });

  const usuarioAutenticado = req.usuario;

  res.json(usuario);
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
