import { musicasRef, momentosRef, stateRef } from '../utils/FirebaseUtils'

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

}