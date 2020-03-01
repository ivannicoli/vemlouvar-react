function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function generate(musicas) {
  loadFile("./template.docx", function (error, content) {
    if (error) { throw error };
    var zip = new PizZip(content);
    var doc = new window.docxtemplater().loadZip(zip)
    musicas.forEach(m => {
      m.cifra = m.cifra.split("\n")
    });
    doc.setData({
      musicas: musicas
    });
    try {
      // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
      doc.render()
    }
    catch (error) {
      // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
      function replaceErrors(key, value) {
        if (value instanceof Error) {
          return Object.getOwnPropertyNames(value).reduce(function (error, key) {
            error[key] = value[key];
            return error;
          }, {});
        }
        return value;
      }
      console.log(JSON.stringify({ error: error }, replaceErrors));

      if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors.map(function (error) {
          return error.properties.explanation;
        }).join("\n");
        console.log('errorMessages', errorMessages);
        // errorMessages is a humanly readable message looking like this :
        // 'The tag beginning with "foobar" is unopened'
      }
      throw error;
    }
    var out = doc.getZip().generate({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }) //Output the document using Data-URI
    saveAs(out, "output.docx")
  })
}