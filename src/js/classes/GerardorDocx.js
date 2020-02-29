export default class GeradorDocx {

  constructor(musicas) {
    this.musicas = musicas;
  }

  gerarDocX = () => {
    alert("vai fela")
    window.generate(this.musicas);
  } 
}