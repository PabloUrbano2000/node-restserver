const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT, validarCampos, isAdminRole } = require("../middlewares/");
const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos.controller");
const {
  isProductExistsById,
  isCategoryExistsById,
} = require("../helpers/db-validators");

const router = Router();

// Obtener toxas las categorías - público
router.get("/", [], obtenerProductos);

// Obtener una categoría por id - público
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(isProductExistsById),
    validarCampos,
  ],
  obtenerProducto
);

// Crear categoria - privado -cualquier persona con un token válido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id de Mongo").isMongoId(),
    check("categoria").custom(isCategoryExistsById),
    validarCampos,
  ],
  crearProducto
);

// Actualizar - privado - cualquiera con token válido
router.put(
  "/:id",
  [
    validarJWT,
    // check("categoria", "No es un id de Mongo").isMongoId(),
    check("id").custom(isProductExistsById),
    validarCampos,
  ],
  actualizarProducto
);

router.delete(
  "/:id",
  [
    validarJWT,
    isAdminRole,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(isProductExistsById),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
