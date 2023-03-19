const shortenText = (text) => {
  // Dividir el texto en palabras
  const words = text.split(" ");

  // Tomar solo las primeras 30 palabras
  const shortenedWords = words.slice(0, 30);

  // Devolver las palabras unidas de nuevo en un texto
  return shortenedWords.join(" ");
};

export default shortenText;
