import he from "he";

const cleanTextHtml = (text) => {
  const decodedText = he.decode(text); // Decodificar caracteres de entidad
  const cleanText = decodedText.replace(/(<([^>]+)>)/gi, ""); // Eliminar etiquetas HTML
  return cleanText;
};

export default cleanTextHtml;
