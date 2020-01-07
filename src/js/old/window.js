const OfficeGenUtils = require('./js/utils/officegenUtils.js.js')
const {gerarListenerUpdateDeleteAlgoliaIndexObjects} = require("./js/utils/algoliaupdatedelete.js.js")

var arrMomentos = [];
var lastMissa;


async function carregarMomentos() {

  var snapMomentos = await firebase.firestore().collection('momentos').get();
  snapMomentos.forEach((doc) => {
    const data = doc.data();
    arrMomentos.push(data.nome)
  });
}

async function getLastMissa() {
  missaSnap = (await firebase.firestore().collection("missas").get());
  lastMissa = missaSnap.docs[missaSnap.docs.length - 1].data();
}

$(() => {
  enableFirestoreOffline();
  createRefVars()
  carregarMomentos()
  getLastMissa()
  gerarEventoBotoes()
  gerarListenerUpdateDeleteAlgoliaIndexObjects();
})

function createRefVars() {
  var musicasRef = firebase.firestore().collection("musicas");
  var momentosRef = firebase.firestore().collection("momentos");
  var missasRef = firebase.firestore().collection("missas");
}

function gerarEventoBotoes() {
  $('.btn-pptx').click(() => {
    gerarPptxPorMusicasGrid()
  })

  $('.btn-docx').click(() => {
    gerarDocxPorMusicasGrid()
  })
}


function gerarPptxPorMusicasGrid() {

  // const remote = require('electron').remote;
  // const dialog = remote.require('dialog');

  const { dialog } = require('electron').remote
  
  let fileName = dialog.showSaveDialog({
    filters: [{
      name: 'Presentation PPTX',
      extensions: ['pptx']
    }]
  })

  OfficeGenUtils.getpptx(async (pptx) => {
    musicasGrid.forEach(m => {
      m.tituloSlide = m.momento;
      OfficeGenUtils.gerarSlideMusicaPptx(pptx, m)
    });
  }, fileName)
  
}

function gerarDocxPorMusicasGrid() {

  // const remote = require('electron').remote;
  // const dialog = remote.require('dialog');

  const { dialog } = require('electron').remote
  
  let fileName = dialog.showSaveDialog({
    filters: [{
      name: 'Presentation DOCX',
      extensions: ['docx']
    }]
  })

  OfficeGenUtils.getdocx(async (docx) => {
    musicasGrid.forEach(m => {
      m.tituloSlide = m.momento;
      OfficeGenUtils.gerarPaginasMusicaDocx(docx, m.momento, m.cifra)
    });
  }, fileName)
  
}

function enableFirestoreOffline() {
  // The default cache size threshold is 40 MB. Configure "cacheSizeBytes"
  // for a different threshold (minimum 1 MB) or set to "CACHE_SIZE_UNLIMITED"
  // to disable clean-up.

  firebase.firestore().settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
  });
  firebase.firestore().enablePersistence()
    .catch(function (err) {
      if (err.code == 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
        //alert('offline failed-precondition');
        console.log('offline failed-precondition');
      }
      else if (err.code == 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
        // alert('offline unimplemented');
        console.log('offline unimplemented');
      }
    });
}

