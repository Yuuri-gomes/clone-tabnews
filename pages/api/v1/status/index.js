function status(request, response) {
  response.status(200).json({ chave: "SALVE O CORINTHIANS" });
}

export default status;
