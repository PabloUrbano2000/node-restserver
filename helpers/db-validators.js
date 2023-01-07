const { Categoria, Producto } = require("../models");
const Role = require("../models/role");
const User = require("../models/usuario");

const isRoleValid = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

const isEmailExists = async (correo = "") => {
  const existeEmail = await User.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo: ${correo}, ya está registrado`);
  }
};

const isUserExistsById = async (id = "") => {
  const existeUsuario = await User.findById(id);
  if (existeUsuario) {
    throw new Error(`El id noe xiste ${id}`);
  }
};

const isCategoryExistsById = async (id = "") => {
  const existeCategoria = await Categoria.findById(id);
  if (existeCategoria) {
    throw new Error(`El id no existe ${id}`);
  }
};

const isProductExistsById = async (id = "") => {
  const existeProducto = await Producto.findById(id);
  if (existeProducto) {
    throw new Error(`El id no existe ${id}`);
  }
};

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
    throw new Error(
      `La colección ${coleccion} no es permitida - ${colecciones}`
    );
  }
  return true;
};

module.exports = {
  isRoleValid,
  isEmailExists,
  isUserExistsById,
  isCategoryExistsById,
  isProductExistsById,
  coleccionesPermitidas,
};
