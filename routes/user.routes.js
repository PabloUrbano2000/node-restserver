const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/user.controller");
const {
  isRoleValid,
  isEmailExists,
  isUserExistsById,
} = require("../helpers/db-validators");
const { validarJWT, validarCampos, hasRole } = require("../middlewares");

const router = Router();

router.get("/", usuariosGet);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser más de 6 letras").isLength({
      min: 6,
    }),

    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(isEmailExists),
    // check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(isRoleValid),
    validarCampos,
  ],
  usuariosPost
);
router.put(
  "/:id",
  [
    validarJWT,
    // isAdminRole,
    hasRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(isUserExistsById),
    check("rol").custom(isRoleValid),
    validarCampos,
  ],
  usuariosPut
);
router.patch("/:id", usuariosPatch);
router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(isUserExistsById),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
