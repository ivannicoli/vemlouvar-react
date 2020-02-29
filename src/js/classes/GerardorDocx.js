const DEFAULT_TITLE_COLOR = "3F8A70";
const DEFAULT_REFRAO_COLOR = "DB4B5E";
const DEFAULT_NORMAL_COLOR = "000000";
const DEFAULT_BACKGROUND_COLOR = "ffffff";

export default class GeradorDocx {

  constructor(musicas, titleColor = DEFAULT_TITLE_COLOR, refraoColor = DEFAULT_REFRAO_COLOR, normalColor = DEFAULT_NORMAL_COLOR, backgroundColor = DEFAULT_BACKGROUND_COLOR) {
    this.musicas = musicas;
    this.titleColor = titleColor;
    this.refraoColor = refraoColor;
    this.normalColor = normalColor;
    this.backgroundColor = backgroundColor;
  }

  gerarDocX = () => {
    window.generate();
  }


  
}