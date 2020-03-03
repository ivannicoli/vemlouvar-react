import { musicasRef, momentosRef, stateRef } from '../utils/FirebaseUtils'
import algoliasearch from 'algoliasearch';

const client = algoliasearch('EZQCIMR39C', '335d5086d62e00ab7fda52e8df0cae83');
const algoliaMusicasIndex = client.initIndex('musicas');

export default class FirebaseService {

  static getMusicaById = async id => {
    return (await musicasRef.doc(id).get()).data()
  }

  static getState = async () => {
    return (await stateRef.doc("0").get()).data()
  }

  static saveState = (state) => {
    stateRef.doc("0").set(state);
  }

  static asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }  

  static listMomentos = async () => {
    var momentos = (await momentosRef.get());    
    var momentosArr = [];
    await FirebaseService.asyncForEach(momentos.docs, async (m) => {
        momentosArr.push(m.data().nome);
    });
    return momentosArr;
  }

  static saveMusica = (m) => {
    if(m !== ""){
      musicasRef.doc(m.id).set(m)
    
      m.objectID = m.id;
      algoliaMusicasIndex.saveObject(m);
      alert("Música Salva")
    } else {
      // musicasRef.push(m)
      alert("Not Implemented")
    }
  }

}