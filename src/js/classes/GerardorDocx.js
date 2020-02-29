export default class GeradorDocx {

  constructor(musicas) {
    this.musicas = musicas;
  }

  gerarDocX = () => {
    window.generate(this.musicas);
  } 
}