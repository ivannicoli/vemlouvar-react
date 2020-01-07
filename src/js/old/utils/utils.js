module.exports.processarEAlertarEmCasoDeErro = (funcaoDeProcessamento) => {
  try {
    funcaoDeProcessamento()
  }
  catch (err) {
    alert("Houve erro durante o processamento de save " + err.message);
  }
}