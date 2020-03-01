import { musicasRef, stateRef } from '../utils/FirebaseUtils'

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

}