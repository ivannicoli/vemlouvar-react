import { musicasRef } from '../utils/FirebaseUtils'

export default class FirebaseService {

  static getMusicaById = async id => {
    return (await musicasRef.doc(id).get()).data()
  }

}