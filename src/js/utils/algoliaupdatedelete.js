const algoliasearch = require('algoliasearch');

const client = algoliasearch('EZQCIMR39C', '335d5086d62e00ab7fda52e8df0cae83');
const algoliaMusicasIndex = client.initIndex('musicas');


async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

async function salvarDocIndexObject(doc) {
    let documentObject = doc.data();
    let objetoLimpo;
    var momentosArr = [];
    await asyncForEach(documentObject.momentos, async (m) => {
        momentosArr.push((await m.get()).data().nome);
    });
    objetoLimpo = {};
    objetoLimpo.apresentacao = documentObject.apresentacao
    objetoLimpo.nome = documentObject.nome
    objetoLimpo.cifra = documentObject.cifra
    objetoLimpo.url = documentObject.url
    objetoLimpo.id = documentObject.id
    // Foi removido porque estava dando esse erro:
    // Uncaught (in promise) TypeError: Converting circular structure to JSON
    //objetoLimpo.momentos = documentObject.momentos
    objetoLimpo.momentosArr = momentosArr
    objetoLimpo.objectID = documentObject.id;
    algoliaMusicasIndex.saveObject(objetoLimpo);
}

module.exports.gerarListenerUpdateDeleteAlgoliaIndexObjects = async () => {

    firebase.firestore().collection('musicas').onSnapshot(async (snapshot) => {
        snapshot.docChanges().forEach(function (change) {
            if (change.type === "added") {
                // Não vai fazer nada porque se não 
                // Sempre que o programa iniciar ele
                // vai re-inserir os dados
                // salvarDocIndexObject(change.doc);
            }
            if (change.type === "modified") {
                console.log("Firestore modificado, atualizando algolia: " + change.doc.data().nome)
                salvarDocIndexObject(change.doc);
            }

            if (change.type === "removed") {
                console.log("Documento Firestore excluído, atualizando algolia: " + change.doc.data().id)
                algoliaMusicasIndex.deleteObject(change.doc.data().id, (err, content) => {
                    if (err) throw err;
    
                    console.log(content);
                })
            }
        });
    });

}
