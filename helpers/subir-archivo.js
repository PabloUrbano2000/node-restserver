const path = require("path");
const { v4: uuid4 } = require("uuid");

const subirArchivo = (
  files,
  extensionesValidas = ["png", "jpg", "jpeg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;

    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    // Validar la extensión
    if (!extensionesValidas.includes(extension)) {
      reject(
        `La extensión ${extension} no es permitida - ${extensionesValidas}`
      );
    } else {
      const nombreTemp = uuid4() + "." + extension;

      const uploadPath = path.join(
        __dirname,
        "../uploads/",
        carpeta,
        nombreTemp
      );

      // sube en raiz el archivo
      archivo.mv(uploadPath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(nombreTemp);
        }
      });
    }
  });
};

module.exports = {
  subirArchivo,
};
