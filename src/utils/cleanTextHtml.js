import he from "he";

const cleanTextHtml = (text) => {
  const decodedText = he.decode(text); // Decodificar caracteres de entidad
  const cleanText = decodedText.replace(/(<([^>]+)>)/gi, ""); // Eliminar etiquetas HTML
  const finalText = cleanText.replace(/[<>]/g, ""); // Eliminar cualquier carácter '<' o '>'
  return finalText;
};

export default cleanTextHtml;
