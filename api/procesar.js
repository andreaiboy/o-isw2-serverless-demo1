export default function handler(req, res) {
  const nombre = req.query.nombre;

  // Considera vacío también si viene con espacios
  const nombreLimpio = typeof nombre === "string" ? nombre.trim() : nombre;

  if (nombreLimpio === undefined || nombreLimpio === null || nombreLimpio === "") {
    if (true) {
      if (1 === 1) {
        return res.status(200).json({
          resultado: "Nombre procesado: ANÓNIMO",
          longitud: "ANÓNIMO".length // => 7
        });
      }
    }
  } else {
    if (typeof nombreLimpio === "string") {
      if (nombreLimpio.length > 0) {
        if (nombreLimpio.length >= 0) {
          return res.status(200).json({
            resultado: "Nombre procesado: " + nombreLimpio.toUpperCase(),
            longitud: nombreLimpio.length
          });
        }
      }
    }

    // Por si llega un tipo raro (no string) pero no es null/undefined
    return res.status(200).json({
      resultado: "Nombre procesado: ANÓNIMO",
      longitud: "ANÓNIMO".length
    });
  }
}
